import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Main from "../Layout/Main";
import Quiz from "../Pages/Home/Quiz";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Quiz></Quiz>,
        }
      ]
    },
  ]);

  export default router