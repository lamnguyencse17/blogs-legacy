import { Flex, Heading, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { AUTH_TOKEN } from '../constants/localStorage';
import useUserStore from '../stores/user';
import { shallow } from 'zustand/shallow';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const THREE_SECONDS = 3000;

const LogoutPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const resetUser = useUserStore((state) => state.resetUser, shallow);
    useEffect(() => {
        localStorage.removeItem(AUTH_TOKEN);
        resetUser();
        const timeout = setTimeout(() => {
            navigate('/');
        }, THREE_SECONDS);
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="full"
            height="full"
        >
            <Heading>{t('messages.handling_request')}</Heading>
            <Spinner />
        </Flex>
    );
};

export default LogoutPage;
