import { API_URL } from '&/shared/config/constants';
import { Endpoints, Services } from './config';

interface Utils {
    service: Services;
    endpoint: string;
}

type Params = Record<string, string | number | boolean | undefined>;

interface CombineUrl {
    endpoint?: Endpoints | string;
    path?: (string | number)[];
    params?: Params;
}
export const getStringParams = (params: Params) => {
    return Object.entries(params)
        .filter((param) => param[1] !== undefined)
        .map((param) => `${param[0]}=${param[1]}`)
        .join('&');
};
export const getBaseUrl = () => {
    return API_URL;
};

export const getUrl = ({ service, endpoint }: Utils) => {
    return endpoint.length > 0
        ? `/${service}/${endpoint}`.replaceAll('//', '/')
        : `/${service}`.replaceAll('//', '/');
};

export const combineUrl = ({ endpoint, path = [], params = {} }: CombineUrl): string => {
    let url: string = endpoint || '';
    if (path.length) {
        url += `/${path.join('/')}`;
    }
    const query = getStringParams(params);
    if (query) {
        url += `?${query}`;
    }
    return url;
};
