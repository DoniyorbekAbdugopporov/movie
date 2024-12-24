import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Details from '../pages/details/Details'
import Layout from '@/pages/layout/Layout'
import Saved from '@/pages/saved/Saved'
import Search from '@/pages/search/Search'
import Movies from '@/pages/movies/Movies'

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
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/search",
          element: <Search />,
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