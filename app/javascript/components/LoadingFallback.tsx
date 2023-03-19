import { Flex, Spinner } from '@chakra-ui/react';

const LoadingFallback = () => {
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
};

export default LoadingFallback;
