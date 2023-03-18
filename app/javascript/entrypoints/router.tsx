import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages';
import { lazy, Suspense } from 'react';
import RootComponent from '../components/Root';
import LoginPage from '../pages/login';
import LogoutPage from '../pages/logout';

const EditorPage = lazy(async () => await import('../pages/index'));

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
                    <Suspense fallback={'loading'}>
                        <EditorPage />
                    </Suspense>
                ),
            },
            {
                path: '/login',
                element: (
                    <Suspense fallback={'loading'}>
                        <LoginPage />
                    </Suspense>
                ),
            },
            {
                path: '/logout',
                element: (
                    <Suspense fallback={'loading'}>
                        <LogoutPage />
                    </Suspense>
                ),
            },
        ],
        element: <RootComponent />,
    },
]);

export default router;
