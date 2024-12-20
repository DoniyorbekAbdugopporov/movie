import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Latest from '../pages/latest/Latest'
import Details from '../pages/details/Details'
import Layout from '@/pages/layout/Layout'

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/latest",
          element: <Latest />,
        },
        {
          path: "/movie/:id",
          element: <Details />,
        },
      ],
    },
  ]);
}

export default Router