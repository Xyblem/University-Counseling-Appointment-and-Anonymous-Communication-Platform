import {createBrowserRouter} from "react-router-dom";
import {Preview} from "../pages/Preview";
import {LoginForm} from "../pages/auth/LoginForm";
import {SignUpForm} from "../pages/auth/SignUpForm";
import {Homepage} from "../pages/home/Homepage";
import {Homepage_Main} from "../pages/home/HomePage_Main";


export const router=createBrowserRouter([
    {path:"/",element:<Preview/>},
    {path:"/auth/login",element:<LoginForm/>},
    {path:"/auth/signup",element:<SignUpForm/>},
    {path:"/home",element:<Homepage/>,
        children:[
            {path:"/home/main",element:<Homepage_Main/>}
        ]
    }
]);