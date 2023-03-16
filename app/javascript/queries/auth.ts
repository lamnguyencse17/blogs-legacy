import axiosClient from '../utils/axios';
import { z } from 'zod';
import { type AxiosResponse } from 'axios';

export const checkAuthenticationQuery = async () =>
  axiosClient.get('/authenticate');

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export interface LoginSuccessData {
  user: {
    id: number;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
}

export const authenticateUserQuery = async (values: LoginFormData) =>
  axiosClient.post<LoginFormData, AxiosResponse<LoginSuccessData>>(
    'authenticate/login',
    values
  );
