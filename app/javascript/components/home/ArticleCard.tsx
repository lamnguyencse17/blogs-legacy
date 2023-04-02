import { Flex, Heading, Link, Text } from '@chakra-ui/react';
import { FunctionComponent, useCallback } from 'react';
import { ArticleDataWithCreator } from '../../queries/article';
import { Link as RouterLink } from 'react-router-dom';
import useArticleStore from '../../stores/article';
import { shallow } from 'zustand/shallow';
import calculateReadingTime from '../../utils/readingTime';
import { useTranslation } from 'react-i18next';

type ArticleCardProps = {
    article: ArticleDataWithCreator;
};

const InnerArticleCard: FunctionComponent<ArticleCardProps> = ({ article }) => {
    const { t } = useTranslation();
    const setArticle = useArticleStore((state) => state.setArticle, shallow);
    const setArticleOnHover = useCallback(() => {
        setArticle(article);
    }, []);
    return (
        <Flex
            flexDirection="column"
            width="full"
            height="full"
            key={article.id}
            borderColor="blackAlpha.200"
            borderWidth="thin"
            padding={4}
        >
            <Text>{article.creator_username}</Text>
            <Link
                as={RouterLink}
                to={`/article/${article.id}`}
                onMouseEnter={setArticleOnHover}
            >
                <Heading size="lg">{article.title}</Heading>
            </Link>
            <Text textAlign="right">
                {t('pages.index.reading_time', {
                    count: calculateReadingTime(article.body),
                })}
            </Text>
        </Flex>
    );
};

const ArticleCard = (_: number, article: ArticleDataWithCreator) => {
    return <InnerArticleCard article={article} />;
};

export default ArticleCard;
