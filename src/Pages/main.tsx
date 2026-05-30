

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import Error from '@components/Error'

import Root from '@pages/Main/Root'
import LandingScreen from '@pages/Main/LandingScreen'

const router =  createBrowserRouter([
    {
        path: '/JPTrain',
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: 'home',
                element: <LandingScreen />
            }
        ]
    }
])