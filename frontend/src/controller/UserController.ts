import {User} from "../entity/User";
import {ReturnObject,ReturnCode} from "../utils/api/ReturnObject";
import api from "../utils/api/api_config";



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

export class UserController {

    /**
     * 用户登录
     * @param loginRequest 登录请求体
     * @return boolean 若登录成功则返回true，若登录失败(请求参数失败)则返回false
     */
    login=async (loginRequest:LoginRequest):Promise<{isLoggedIn:boolean,message:string}> =>{
        let result:{isLoggedIn:boolean,message:string}={isLoggedIn:false,message:''};
        await api.post<ReturnObject>("api/user/login",loginRequest).then(response=>{
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                //@ts-ignore
                result = {isLoggedIn:true,message:response.message};
                //@ts-ignore
            }else if(response.code === ReturnCode.BAD_REQUEST){
                //@ts-ignore
                result={isLoggedIn:false,message:response.message};
            }else{
                //@ts-ignore
                throw Error(response.message)
            }
        })
        return result;
    }

    /**
     * 用户注册
     * @param signupRequest 注册请求体
     * @return boolean 若注册成功则返回true，若注册失败(请求参数失败)则返回false
     */
    signup=async (signupRequest:SignupRequest):Promise<{isSignedUp:boolean,message:string}> =>{
        let result:{isSignedUp:boolean,message:string}={isSignedUp:false,message:''};
        await api.post<ReturnObject>("api/user/signup",signupRequest).then(response=>{
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                //@ts-ignore
                result = {isSignedUp:true,message:response.message};
                //@ts-ignore
            }else if(response.code === ReturnCode.BAD_REQUEST){
                //@ts-ignore
                result={isSignedUp:false,message:response.message};
            }else{
                //@ts-ignore
                throw Error(response.message)
            }
        });
        return result;
    }


    /**
     * 检查用户登录
     * @return boolean 若已登录则返回true，若未登录则返回false
     */
    checkLogin=async (): Promise<boolean> => {
        let result:boolean=false;
        await api.get<ReturnObject<{isLogin: 'true' | 'false';}>>("api/user/check_login").then(response => {
                //@ts-ignore
                if (response.code === ReturnCode.SUCCESS && response.data) {
                    //@ts-ignore
                    result = response.data.isLogin === 'true';
                }else{
                    //@ts-ignore
                    throw Error(response.message);
                }
            }
        );
        return result;
    }


    /**
     * 获取已经登录的用户信息
     * @return boolean 若已登录则返回用户信息，若未登录则返回null
     */
    loggedInUser=async (): Promise<User | null> => {
        let result: User|null=null;
        await api.get<ReturnObject<User>>("api/user/logged-in_user").then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                //@ts-ignore
                result=response.data;
                //@ts-ignore
            }else if(response.code === ReturnCode.UNAUTHORIZED) {
                result=null;
            }else{
                //@ts-ignore
                throw new Error(response.message);
            }
        });
        return result;
    }

    /**
     * 执行登出操作
     * @return boolean 若已登录则执行登出并返回true，若未登录则返回false
     */
    logout=async (): Promise<boolean> => {
        let result: boolean=false;
        await api.post<ReturnObject<User>>("api/user/logout").then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                result=true;
                //@ts-ignore
            }else if(response.code === ReturnCode.UNAUTHORIZED) {
                result=false;
            }else{
                //@ts-ignore
                throw new Error(response.message);
            }
        });
        return result;
    }


    /**
     * 更新密码
     * @param updatePasswordRequest 更新密码请求体
     * @return boolean 若更新成功则返回true，更新失败则返回false
     */
    updatePassword=async (updatePasswordRequest:UpdatePasswordRequest): Promise<{success:boolean,message:string}> => {
        let result:{success:boolean,message:string}={success:false,message:''};
        await api.post<ReturnObject>("api/user/update_password",updatePasswordRequest).then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                result={success:true,message:''};
                //@ts-ignore
            }else if(response.code === ReturnCode.UNAUTHORIZED||response.code===ReturnCode.BAD_REQUEST) {
                //@ts-ignore
                result={success:false,message:response.message};
            }else{
                //@ts-ignore
                result={success:false,message:response.message};
                //@ts-ignore
                throw new Error(response.message);
            }
        })
        return result;
    }

    /**
     * 注销账号
     * @param closeAccountRequest 注销账号请求体
     * @return boolean 若注销成功则返回true，注销失败则返回false
     */
    closeAccount=async (closeAccountRequest:CloseAccountRequest):Promise<{success:boolean,message:string}> => {
        let result:{success:boolean,message:string}={success:false,message:''};
        await api.post<ReturnObject>("api/user/close_account",closeAccountRequest).then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                result={success:true,message:''};
                //@ts-ignore
            }else if(response.code === ReturnCode.UNAUTHORIZED||response.code===ReturnCode.BAD_REQUEST) {
                //@ts-ignore
                result={success:false,message:response.message};
            }else{
                //@ts-ignore
                result={success:false,message:response.message};
                //@ts-ignore
                throw new Error(response.message);
            }
        })
        return result;
    }

    /**
     * 更新用户信息
     * @param updateUserRequest 更新用户请求体
     * @return boolean 若更新成功则返回true，更新失败则返回false
     */
    updateUser=async (updateUserRequest:UpdateUserRequest):Promise<{success:boolean,message:string}> => {
        let result:{success:boolean,message:string}={success:false,message:''};
        await api.post<ReturnObject>("api/user/update_user",updateUserRequest).then(response => {
            //@ts-ignore
            if (response.code === ReturnCode.SUCCESS) {
                result={success:true,message:''};
                //@ts-ignore
            }else if(response.code === ReturnCode.UNAUTHORIZED||response.code===ReturnCode.BAD_REQUEST) {
                //@ts-ignore
                result={success:false,message:response.message};
            }else{
                //@ts-ignore
                result={success:false,message:response.message};
                //@ts-ignore
                throw new Error(response.message);
            }
        })
        return result;
    }
}