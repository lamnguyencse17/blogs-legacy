import { useLoaderData } from 'react-router-dom';
import { CREATE_ARTICLE_MUTATION } from '../../constants/query';
import queryClient from '../../utils/query';

const ArticlePage = () => {
    const { article } = useLoaderData();
    console.log(article);
    return <>Article</>;
};

export default ArticlePage;
