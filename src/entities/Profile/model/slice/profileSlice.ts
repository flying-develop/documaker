/* eslint-disable import/no-cycle */
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_ACCESS_TOKEN, LOCAL_STORAGE_EXPIRES_AT } from '&/shared/config/constants';
import { setPending } from './reducers/setPending';
import { setRejected } from './reducers/setRejected';
import { fetchProfile } from '../services/fetchProfile';
import { ProfileSchema } from '../types/ProfileSchema';
import { fetchProfileFulfilled } from './reducers/fetchProfileFulfilled';
import { updateProfilePhoto } from '../services/updateProfilePhoto';
import { updateProfileInfo } from '../services/updateProfileInfo';
import { updateProfileInfoFulfilled } from './reducers/updateProfileInfoFulfilled';
import { updateProfilePassword } from '../services/updateProfilePassword';
import { updateProfilePhotoFulfilled } from './reducers/updateProfilePhotoFulfilled';
import { updateProfilePasswordFulfilled } from './reducers/updateProfilePasswordFulfilled';
import { refreshAccessTokenFulfilled } from './reducers/refreshAccessTokenFulfilled';
import { refreshAccessToken } from '../services/refreshAccessToken';
import { fetchManagers } from '../services/fetchManagers';
import { fetchCases } from '../services/fetchCases';
import { fetchCasesFulfilled } from './reducers/fetchCasesFulfilled';
import { fetchManagersFulfilled } from './reducers/fetchManagersFulfilled';

const initialState: ProfileSchema = {
    error: null,
    loading: false,
    profile: null,
    accessToken: '',
    expiresAt: 0,
    managers: [],
    cases: [],
    pagination: {
        current: 1,
        pageSize: 20,
        total: 0
    }
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setAccessToken: (state: ProfileSchema, { payload }) => {
            localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);

            if (payload.accessToken && payload.accessToken.length > 0) {
                state.accessToken = payload.accessToken;
                localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, state.accessToken);
            }
        },
        setExpiresAt: (state: ProfileSchema, { payload }) => {
            localStorage.removeItem(LOCAL_STORAGE_EXPIRES_AT);

            if (payload.expiresIn > 0) {
                state.expiresAt = Date.now() + payload.expiresIn * 1000;

                localStorage.setItem(LOCAL_STORAGE_EXPIRES_AT, state.expiresAt.toString());
            }
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<ProfileSchema>) => {
        builder
            .addCase(fetchProfile.pending, setPending)
            .addCase(fetchProfile.rejected, setRejected)
            .addCase(fetchProfile.fulfilled, fetchProfileFulfilled)

            .addCase(updateProfilePhoto.pending, setPending)
            .addCase(updateProfilePhoto.rejected, setRejected)
            .addCase(updateProfilePhoto.fulfilled, updateProfilePhotoFulfilled)

            .addCase(updateProfileInfo.pending, setPending)
            .addCase(updateProfileInfo.rejected, setRejected)
            .addCase(updateProfileInfo.fulfilled, updateProfileInfoFulfilled)

            .addCase(updateProfilePassword.pending, setPending)
            .addCase(updateProfilePassword.rejected, setRejected)
            .addCase(updateProfilePassword.fulfilled, updateProfilePasswordFulfilled)

            .addCase(refreshAccessToken.pending, setPending)
            .addCase(refreshAccessToken.rejected, setRejected)
            .addCase(refreshAccessToken.fulfilled, refreshAccessTokenFulfilled)

            .addCase(fetchManagers.pending, setPending)
            .addCase(fetchManagers.rejected, setRejected)
            .addCase(fetchManagers.fulfilled, fetchManagersFulfilled)

            .addCase(fetchCases.pending, setPending)
            .addCase(fetchCases.rejected, setRejected)
            .addCase(fetchCases.fulfilled, fetchCasesFulfilled);
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
