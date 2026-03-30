/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import axios, {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';
import { store } from '&/app/providers/Store';
import { profileActions } from '&/entities/Profile/model/slice/profileSlice';
import { getBaseUrl, getUrl } from './utils';
import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_EXPIRES_AT } from '../config/constants';
import { Endpoints, Services } from './config';

declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

const api = axios.create({
    withCredentials: false,
    baseURL: getBaseUrl(),
});

api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig<any>> => {
        config.headers.Accept = 'application/json';

        let token =
            store.getState().profile.accessToken || localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
        const expiresAt = store.getState()?.profile?.expiresAt || localStorage.getItem(LOCAL_STORAGE_EXPIRES_AT);

        if (Number(expiresAt) > 0 && Date.now() >= Number(expiresAt) - 600000) {
            const url = getUrl({
                service: Services.PROFILE,
                endpoint: Endpoints.REFRESH,
            });

            const response = await axios.post(getBaseUrl() + url, {}, {headers: {
                Authorization: `Bearer ${token}`,
            }});
            const { access_token: newToken, expires_in: newExpiresIn } = response.data;

            store.dispatch(profileActions.setAccessToken({accessToken: newToken}));
            store.dispatch(profileActions.setExpiresAt({expiresIn: newExpiresIn}));

            token = newToken;
        }

        if (config.headers && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
);

api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError | Error): Promise<AxiosError> => {
        if (axios.isAxiosError(error)) {
            const { status } = (error.response as AxiosResponse) ?? {};
            const originalRequest = error.config as AxiosRequestConfig;
            const token =
                store.getState().profile.accessToken || localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

            if (status === 401 && !originalRequest._retry && token) {
                originalRequest._retry = true;

                try {
                    const url = getUrl({
                        service: Services.PROFILE,
                        endpoint: Endpoints.REFRESH,
                    });

                    const response = await axios.post(getBaseUrl() + url);
                    const { access_token: newToken, expires_in: newExpiresIn } = response.data;

                    store.dispatch(profileActions.setAccessToken({accessToken: newToken}));
                    store.dispatch(profileActions.setExpiresAt({expiresIn: newExpiresIn}));

                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }

                    return axios(originalRequest);
                } catch (error) {
                    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
                    localStorage.removeItem(LOCAL_STORAGE_EXPIRES_AT);
                }
            }
        }

        return Promise.reject(error);
    },
);

export default api;
