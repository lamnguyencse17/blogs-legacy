import axiosClient from "../utils/axios";

export const checkAuthenticationQuery = () => axiosClient.get('/authenticate')