import produce from 'immer';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ArticleData } from '../queries/article';

const SET_ARTICLE = 'SET_ARTICLE';
const RESET_ARTICLE = 'RESET_ARTICLE';

type ArticleState = {
    articles: {
        [articleId: string]: ArticleData;
    };
    setArticle: (newArticle: ArticleData) => void;
    resetArticle: () => void;
};

const useArticleStore = create<ArticleState>()(
    devtools((set) => ({
        articles: {},
        setArticle: (newArticle) => {
            set(
                produce((state) => {
                    state.articles[newArticle.id] = newArticle;
                }),
                false,
                SET_ARTICLE
            );
        },
        resetArticle: () => {
            set(
                produce((state) => {
                    state.articles = {};
                }),
                false,
                RESET_ARTICLE
            );
        },
    }))
);

export default useArticleStore;
