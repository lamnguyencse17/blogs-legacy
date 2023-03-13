import React from 'react';
import { createRoot } from 'react-dom/client';
import router from './router'
import {RouterProvider} from "react-router-dom";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "../utils/query";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
</React.StrictMode>);