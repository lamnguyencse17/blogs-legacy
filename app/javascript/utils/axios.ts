import Axios, { type CreateAxiosDefaults } from 'axios';

const axiosClientConfig: CreateAxiosDefaults<any> = {
  ...Axios.defaults,
  baseURL: '/api/v1',
  headers: {
    ...Axios.defaults.headers,
    common: {
      ...Axios.defaults.headers.common,
      'Content-Type': 'application/json',
    },
  },
};

const axiosClient = Axios.create(axiosClientConfig);

export const addAuthorizationHeader = (value: string) => {
  axiosClient.defaults.headers.common.Authorization = 'Bearer ' + value;
};

export default axiosClient;
