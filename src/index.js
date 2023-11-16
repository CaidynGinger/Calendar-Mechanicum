import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { App } from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './components/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/login",
        element: <Login/>,
    }
  ]);

root.render(
    <RouterProvider router={router}/>
);
