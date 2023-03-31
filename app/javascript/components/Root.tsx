import { type FunctionComponent } from 'react';
import { ChakraProvider, Container, Flex } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';

const RootComponent: FunctionComponent = () => {
    useAuth();
    return (
        <ChakraProvider>
            <Flex
                width="100%"
                height="100%"
                flexDirection="column"
                alignItems="center"
                justifyItems="center"
            >
                <Navbar />
                <Container maxW="container.xl" flex={1}>
                    <Outlet />
                </Container>
            </Flex>
        </ChakraProvider>
    );
};

export default RootComponent;
