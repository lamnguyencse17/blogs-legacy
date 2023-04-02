import { Container, Flex } from '@chakra-ui/react';
import { useLoaderData } from 'react-router-dom';
import {
    ArticleDataWithCreator,
    getArticleListQuery,
} from '../queries/article';
import { useCallback, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useQuery } from '@tanstack/react-query';
import { INITIAL_PAGE, INITIAL_PAGE_SIZE } from '../constants/queryString';
import { concat, isEmpty } from 'lodash-es';
import LoadMore from '../components/home/LoadMore';
import ArticleCard from '../components/home/ArticleCard';

const FIVE_MINUTES = 5 * 60 * 1000;

const HomePage = () => {
    const { articles } = useLoaderData() as {
        articles: ArticleDataWithCreator[];
    };
    const [articleList, setArticleList] =
        useState<ArticleDataWithCreator[]>(articles);

    const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
    const [pageSize, _] = useState(INITIAL_PAGE_SIZE);
    const [endOfList, setEndOfList] = useState(false);

    const fetchArticleListQuery = useQuery({
        queryKey: ['articles', currentPage, pageSize],
        refetchOnWindowFocus: false,
        staleTime: FIVE_MINUTES,
        queryFn: () => getArticleListQuery(currentPage, pageSize),
        onSuccess: ({ data }) => {
            if (isEmpty(data)) {
                setEndOfList(true);
                setCurrentPage((prevPage) => prevPage - 1);
            }
            setArticleList((prevArticleList) => concat(prevArticleList, data));
        },
    });

    const fetchNextPage = useCallback(() => {
        setCurrentPage((prevPage) => prevPage + 1);
    }, []);

    return (
        <Container maxW={['100%', 'container.sm', 'container.md']}>
            <Flex
                flexDirection="column"
                width="full"
                height="full"
                gap={4}
                padding={8}
                alignItems="center"
            >
                <Virtuoso
                    context={{
                        loading: fetchArticleListQuery.isLoading,
                        loadMore: fetchNextPage,
                        endOfList,
                    }}
                    data={articleList}
                    style={{ height: 300, width: '100%' }}
                    overscan={200}
                    initialItemCount={10}
                    useWindowScroll
                    itemContent={ArticleCard}
                    components={{ Footer: LoadMore }}
                />
            </Flex>
        </Container>
    );
};

export default HomePage;
