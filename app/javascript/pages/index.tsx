import { useLoaderData } from 'react-router-dom';
import { ArticleData } from '../queries/article';

const HomePage = () => {
    const { articles } = useLoaderData() as { articles: ArticleData[] };
    console.log({ articles });
    return <div>Homepage goes here</div>;
};

export default HomePage;
