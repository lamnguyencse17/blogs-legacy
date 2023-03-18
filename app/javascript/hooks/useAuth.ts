import { useQuery } from '@tanstack/react-query';
import { checkAuthenticationQuery } from '../queries/auth';
import { CHECK_AUTHENTICATION_QUERY } from '../constants/query';
import { useEffect, useState } from 'react';
import { AUTH_TOKEN } from '../constants/localStorage';
import { addAuthorizationHeader } from '../utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserStore, { type UserData } from '../stores/user';
import { shallow } from 'zustand/shallow';

const THIRTY_SECONDS = 30 * 1000;

const useAuth = () => {
    const [token, setToken] = useState<null | string>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser, resetUser } = useUserStore(
        (state) => ({
            user: state.user,
            setUser: state.setUser,
            resetUser: state.resetUser,
        }),
        shallow
    );

    useEffect(() => {
        const newToken = localStorage.getItem(AUTH_TOKEN);
        if (newToken == null) {
            return;
        }
        addAuthorizationHeader(newToken);
        setToken(newToken);
    }, []);

    useQuery({
        queryKey: [CHECK_AUTHENTICATION_QUERY],
        queryFn: checkAuthenticationQuery,
        refetchOnWindowFocus: true,
        staleTime: THIRTY_SECONDS,
        onSuccess: ({ data }) => {
            localStorage.setItem(AUTH_TOKEN, data.token);
            setUser(data.user as unknown as UserData);
        },
        onError: () => {
            localStorage.removeItem(AUTH_TOKEN);
            resetUser();
        },
        enabled: token !== null,
    });

    useEffect(() => {
        if (location.pathname === '/login' && user !== undefined) {
            navigate('/');
        }
    }, [location.pathname, user]);
};

export default useAuth;
