import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Authentication from './Pages/Auth/Authentication.tsx'
import Login from './Pages/Auth/Login.tsx'
import Register from './Pages/Auth/Register.tsx'

import Home from './Pages/Home/Home.tsx'
import ErrorPage from './components/Error.tsx'

import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "auth",
        element: <Authentication />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            }
        ]

    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
