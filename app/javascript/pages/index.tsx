import { Container, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { ArticleDataWithCreator } from '../queries/article';
import calculateReadingTime from '../utils/readingTime';
import { Link as RouterLink } from 'react-router-dom';
import useArticleStore from '../stores/article';
import { shallow } from 'zustand/shallow';
import { useCallback } from 'react';

const HomePage = () => {
    const { articles } = useLoaderData() as {
        articles: ArticleDataWithCreator[];
    };
    const { t } = useTranslation();
    const setArticle = useArticleStore((state) => state.setArticle, shallow);

    const setArticleOnHover = useCallback(
        (articleData: ArticleDataWithCreator) => {
            setArticle(articleData);
        },
        []
    );

    return (
        <Container>
            <Flex
                flexDirection="column"
                width="full"
                height="full"
                gap={4}
                padding={8}
                alignItems="center"
            >
                {articles.map((article) => (
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
                            onMouseEnter={() => setArticleOnHover(article)}
                        >
                            <Heading size="lg">{article.title}</Heading>
                        </Link>
                        <Text textAlign="right">
                            {t('pages.index.reading_time', {
                                count: calculateReadingTime(article.body),
                            })}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        </Container>
    );
};

export default HomePage;
