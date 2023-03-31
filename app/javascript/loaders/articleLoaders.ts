import { AxiosError } from 'axios';
import { isNaN, isNil } from 'lodash-es';
import { LoaderFunction } from 'react-router-dom';
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '../constants/queryString';
import { getArticleListQuery, getArticleQuery } from '../queries/article';
import useArticleStore from '../stores/article';
import queryClient from '../utils/query';

export const getArticleLoader: LoaderFunction = async ({ params }) => {
    const articleId = parseInt(params.id as string);
    if (isNil(articleId) || isNaN(articleId)) {
        throw new Response('Article not found', { status: 404 });
    }
    const articles = useArticleStore.getState().articles;
    const article = articles[articleId];
    if (article) {
        return { article };
    }
    try {
        const getArticleAxiosResponse = await queryClient.fetchQuery({
            queryKey: ['article', articleId],
            queryFn: () => getArticleQuery(articleId),
        });
        const fetchedArticle = getArticleAxiosResponse.data;
        return { article: fetchedArticle };
    } catch (error) {
        console.log((error as AxiosError).response?.status);
        throw new Response('Article not found', { status: 404 });
    }
};

export const getArticleListLoader: LoaderFunction = async () => {
    const articleListResponse = await queryClient.fetchQuery({
        queryKey: ['articles', INITIAL_PAGE, INITIAL_PAGE_SIZE],
        queryFn: () => getArticleListQuery(INITIAL_PAGE, INITIAL_PAGE_SIZE),
    });

    const fetchedArticles = articleListResponse.data;
    return { articles: fetchedArticles };
};
