import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages";
import {lazy, Suspense} from "react";

const EditorPage = lazy(() => import("../pages/index"))

const router = createBrowserRouter([
    {path: '/', children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/editor',
                element: <Suspense fallback={"loading"}><EditorPage /></Suspense>
            }
        ]},
])

export default router