import useIsAuthenticated from './useIsAuthenticated';
import { useLocation, useNavigate } from 'react-router-dom';

const useProtectRoute = () => {
    const { isAuthenticated, isAuthenticating } = useIsAuthenticated();
    const navigate = useNavigate();
    const location = useLocation();
    if (!isAuthenticated && !isAuthenticating) {
        navigate(`/login?return=${location.pathname}`);
    }

    const isInitialAuthentication = !isAuthenticated && isAuthenticating;
    return isInitialAuthentication;
};

export default useProtectRoute;
