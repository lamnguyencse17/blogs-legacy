import useUserStore, { type UserData } from '../stores/user';
import { shallow } from 'zustand/shallow';
import { useIsFetching } from '@tanstack/react-query';
import { CHECK_AUTHENTICATION_QUERY } from '../constants/query';

interface AuthenticatedType {
  isAuthenticated: true;
  user: UserData;
}

interface UnauthenticatedType {
  isAuthenticated: false;
  user: undefined;
}

type useIsAuthenticatedType = { isAuthenticating: boolean } & (
  | AuthenticatedType
  | UnauthenticatedType
);
const useIsAuthenticated = (): useIsAuthenticatedType => {
  const user = useUserStore((state) => state.user, shallow);
  const isAuthenticating =
    useIsFetching({
      queryKey: [CHECK_AUTHENTICATION_QUERY],
    }) === 1;
  if (user !== undefined) {
    return { isAuthenticating, isAuthenticated: true as const, user };
  }
  return { isAuthenticating, isAuthenticated: false as const, user: undefined };
};

export default useIsAuthenticated;
