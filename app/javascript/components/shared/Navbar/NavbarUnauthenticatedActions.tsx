import { Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavbarUnauthenticatedActions = () => {
    const { t } = useTranslation();
    return (
        <Text>
            <Link as={RouterLink} to="/login" textDecoration={'none'}>
                {t('navbar_items.login')}
            </Link>
        </Text>
    );
};

export default NavbarUnauthenticatedActions;
