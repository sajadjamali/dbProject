import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home.jsx';
import Book from './components/Book.jsx';
import Member from './components/Member.jsx';
import Staff from './components/Staff.jsx';
import Author from './components/Author.jsx';
import Loans from './components/Loans.jsx';
import SignUp from './components/SignUp.jsx';
import Error from './components/Error.jsx';
import { ToastContainer } from 'react-toastify';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: "/books",
    element: <Book />,
    errorElement: <Error />
  },
  {
    path: "/members",
    element: <Member />,
    errorElement: <Error />
  },
  {
    path: "/authors",
    element: <Author />,
    errorElement: <Error />
  },
  {
    path: "/staff",
    element: <Staff />,
    errorElement: <Error />
  },
  {
    path: "/listOfLoans",
    element: <Loans />,
    errorElement: <Error />
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </React.StrictMode>,
)
