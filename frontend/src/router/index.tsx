//React框架
import {createBrowserRouter} from "react-router-dom";
//页面
import {Preview} from "../pages/Preview";
import {LoginForm} from "../pages/auth/LoginForm";
import {SignUpForm} from "../pages/auth/SignUpForm";
import {Homepage, Homepage_Children} from "../pages/home/Homepage";
import {PsychTestEntranceForm} from "../pages/psych_test/PsychTestEntranceForm";
import {PsychTestForm} from "../pages/psych_test/PsychTestForm";
//主路由
export const router=createBrowserRouter([
    {path:"/",element:<Preview/>},
    {path:"/auth/login",element:<LoginForm/>},
    {path:"/auth/signup",element:<SignUpForm/>},
    {path:"/home",element:<Homepage/>, children:Homepage_Children},
    {path:"/psych_test_entrance",element:<PsychTestEntranceForm/>},
    {path:"/psych_test",element:<PsychTestForm/>}
]);