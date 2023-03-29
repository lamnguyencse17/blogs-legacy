import { useLoaderData } from 'react-router-dom';
import MarkdownPresenter from '../../components/shared/MarkdownPresenter';
import { ArticleData } from '../../queries/article';

const ArticlePage = () => {
    const { article } = useLoaderData() as { article: ArticleData };
    return <MarkdownPresenter markdown={article.body} />;
};

export default ArticlePage;
