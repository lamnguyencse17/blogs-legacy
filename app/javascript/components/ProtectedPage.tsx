import useProtectRoute from '../hooks/useProtectRoute';
import { FunctionComponent } from 'react';
import LoadingFallback from './LoadingFallback';

type ProtectedPageProps = {
    children: JSX.Element;
};
const ProtectedPage: FunctionComponent<ProtectedPageProps> = ({ children }) => {
    const isInitialAuthentication = useProtectRoute();
    if (isInitialAuthentication) {
        return <LoadingFallback />;
    }
    return children;
};

export default ProtectedPage;
