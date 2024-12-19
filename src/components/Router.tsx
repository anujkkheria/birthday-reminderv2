import Auth from "./page/Auth/Auth";
import Login from "./page/Auth/Login";
import Dashboard from './page/DashBoard/Dashboard'
import { createBrowserRouter,RouterProvider,Navigate} from "react-router-dom";
const Router=()=>{
    const router = createBrowserRouter([
        {
            path:"/auth",
            element: <Auth />,
            children:[
                {
                    path:"login",
                    element: <Login />
                },
            ]
        },{
            path:"/dashboard",
            element:<Dashboard />
        },
        {
            path:"/",
            element: <Navigate to={"auth/login"}/>
        }
    ])
    
    return <RouterProvider router={router} />
}

export default Router