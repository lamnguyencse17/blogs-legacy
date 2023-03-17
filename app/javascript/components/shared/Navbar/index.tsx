import { Box, Flex, Link, Spinner, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useIsAuthenticated from '../../../hooks/useIsAuthenticated';
import NavbarUnauthenticatedActions from './NavbarUnauthenticatedActions';
import NavbarAuthenticatedActions from './NavbarAuthenticatedActions';

const Index = () => {
  const { isAuthenticating, isAuthenticated, user } = useIsAuthenticated();

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      padding={4}
      height={16}
    >
      <Text>
        <Link as={RouterLink} to="/" textDecoration={'none'}>
          Lam Nguyen&#39;s Blog
        </Link>
      </Text>
      <Box>
        {isAuthenticating ? (
          <Spinner />
        ) : isAuthenticated ? (
          <NavbarAuthenticatedActions user={user} />
        ) : (
          <NavbarUnauthenticatedActions />
        )}
      </Box>
    </Flex>
  );
};

export default Index;
