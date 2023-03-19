import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages';
import { lazy, Suspense } from 'react';
import RootComponent from '../components/Root';
import LoginPage from '../pages/login';
import LogoutPage from '../pages/logout';
import LoadingFallback from '../components/LoadingFallback';

const EditorPage = lazy(async () => await import('../pages/editor'));

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/editor',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <EditorPage />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: '/logout',
                element: (
                    <Suspense fallback={<LoadingFallback />}>
                        <LogoutPage />
                    </Suspense>
                ),
            },
        ],
        element: <RootComponent />,
    },
]);

export default router;
