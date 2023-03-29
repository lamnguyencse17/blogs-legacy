import { Flex, Spinner } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

type LoadingFallbackProps = {
    fullPage?: boolean;
};

const LoadingFallback: FunctionComponent<LoadingFallbackProps> = ({
    fullPage = true,
}) => {
    if (fullPage) {
        return (
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="full"
                height="full"
            >
                <Spinner />
            </Flex>
        );
    }
    return <Spinner />;
};

export default LoadingFallback;
