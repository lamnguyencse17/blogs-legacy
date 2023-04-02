import { Button, Center, Spinner } from '@chakra-ui/react';
import { FunctionComponent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const LoadMore: FunctionComponent<{
    context: {
        loadMore: () => void;
        loading: boolean;
        endOfList: boolean;
    };
}> = ({ context: { loadMore, endOfList, loading } }) => {
    const { t } = useTranslation();

    const renderInnerComponent = useCallback(() => {
        if (!endOfList && !loading) {
            return (
                <Button onClick={loadMore}>{t('pages.index.load_more')}</Button>
            );
        }
        if (loading) {
            return <Spinner />;
        }
        return <Center>{t('pages.index.no_more_articles')}</Center>;
    }, [endOfList, loading]);

    return <Center mt={4}>{renderInnerComponent()}</Center>;
};

export default LoadMore;
