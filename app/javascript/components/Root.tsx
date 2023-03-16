import React, { type FunctionComponent } from 'react';
import { Box, ChakraProvider, Container } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import Navbar from './shared/Navbar';

const RootComponent: FunctionComponent = () => {
  useAuth();
  return (
    <ChakraProvider>
      <Box width="100%" height="100%">
        <Navbar />
        <Container maxW="container.xl" height="full">
          <Outlet />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default RootComponent;
