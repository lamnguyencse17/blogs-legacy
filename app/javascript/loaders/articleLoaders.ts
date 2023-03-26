import { AxiosError } from 'axios';
import { isNaN, isNil } from 'lodash-es';
import { LoaderFunction } from 'react-router-dom';
import { getArticleQuery } from '../queries/article';
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
