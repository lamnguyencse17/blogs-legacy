import { Flex, Heading } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError() as { data: string };
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
        >
            <Heading>{error.data}</Heading>
        </Flex>
    );
};

export default ErrorBoundary;
