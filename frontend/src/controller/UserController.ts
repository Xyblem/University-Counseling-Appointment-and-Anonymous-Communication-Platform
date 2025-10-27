import {User} from "../entity/User";
import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";
import {Controller} from "./Controller";



//登录请求类型
export interface LoginRequest{
    username?: string;
    password?: string;
    role?: string;
    captcha?: string;
    captchaKey?:string;
}

//注册请求类型
export interface SignupRequest{
    name?: string;
    gender?: string;
    schoolProvince?: string;
    school?: string;
    secondaryUnit?: string;
    major?: string|null;
    role?: string;
    position?: string;
    email?: string;
    phoneNumber?: string;
    qq?: string|null;
    wechat?: string|null;
    username?: string;
    password?: string;
    confirmedPassword?:string;
    captcha?: string;
    captchaKey?:string;
}

//更新密码请求类型
export interface UpdatePasswordRequest{
    username?: string;
    oldPassword?: string;
    newPassword?: string;
    confirmedNewPassword?: string;
    captcha?: string;
    captchaKey?:string;
}

//注销账号请求类型
export interface CloseAccountRequest{
    username?: string;
    password?: string;
    captcha?: string;
    captchaKey?:string;
}


//更新用户信息
export interface UpdateUserRequest{
    username:string;
    nickname:string|null;
    description:string|null;
    name:string;
    gender:number,
    schoolProvince:number,
    school:string;
    secondaryUnit:string;
    major:string|null;
    position:string,
    email:string;
    phoneNumber:string;
    qq:string|null,
    wechat:string|null,
}

export class UserController extends Controller{

    //用户登录
    login=this._post<LoginRequest,any>("api/user/login");
    //用户注册
    signup=this._post<SignupRequest,any>("api/user/signup");
    //检查用户登录
    checkLogin=this._get<null,any>("api/user/check_login");
    //获取已经登录的用户信息
    loggedInUser=this._get<null,User>("api/user/logged-in_user");
    //执行登出操作
    logout=this._post<null,any>("api/user/logout");
    //更新密码
    updatePassword=this._post<UpdatePasswordRequest,any>("api/user/update_password");
    //注销账号
    closeAccount=this._post<CloseAccountRequest,any>("api/user/close_account");
    //更新用户信息
    updateUser=this._post<UpdateUserRequest,any>("api/user/update_user");
    //根据学校所在省份和学校获取教师
    getAllTeachers=this._get<{schoolProvince:number,school:string},User[]>("api/user/all_teachers");
    //管理员获取所有用户
    listAll=this._get<null,User[]>("api/user/list_all");
}