import { AxiosResponse } from 'axios';
import { z } from 'zod';
import axiosClient from '../utils/axios';

export const createArticleSchema = z.object({
    title: z.string().min(6),
    body: z.string().min(6),
});

export type CreateArticleData = z.infer<typeof createArticleSchema>;
export type ArticleData = {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
};

export const createArticleMutation = async (values: CreateArticleData) =>
    axiosClient.post<CreateArticleData, AxiosResponse<ArticleData>>(
        'articles',
        values
    );

export const getArticleQuery = async (articleId: number) =>
    axiosClient.get<number, AxiosResponse<ArticleData>>(
        `articles/${articleId}`
    );
