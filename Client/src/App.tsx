import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },{
    path: "/login",
    element: <Login/>,
  },{
    path: "/signup",
    element: <Signup/>,
  },{
    path: "*",
    element: <h1>page Not Found!</h1>,
  },{
    path: "/dashboard",
    element: <Dashboard/>,
  }
]);


function App() {
 

  return (
    <RouterProvider router={router} />
  )
}

export default App
