import { Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavbarUnauthenticatedActions = () => {
  return (
    <Text>
      <Link as={RouterLink} to="/login" textDecoration={'none'}>
        Login
      </Link>
    </Text>
  );
};

export default NavbarUnauthenticatedActions;
