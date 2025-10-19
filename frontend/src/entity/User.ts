import {InputRef, ValidationRule} from "../components/ui/widget/InputField";
import {Gender, ProvinceCN, UserPosition, UserRole} from "./enums/enums";


export interface User {
    username:string;
    nickname:string|null;
    description:string|null;
    name:string;
    password:null,//密码保护
    gender:number,
    schoolProvince:number,
    school:string;
    secondaryUnit:string;
    major:string|null;
    role:number,
    position:string,
    email:string;
    phoneNumber:string;
    qq:string|null,
    wechat:string|null,
    registrationTime:Date,
}

//账号输入验证规则
export const usernameValidationRules: ValidationRule[] = [
    {required: true, message: '用户名不能为空'},
    {pattern: /^[A-Za-z0-9_]+$/, message: '用户名只能为字母、数字和下划线'},
    {minLength: 8, maxLength: 45, message: '用户名长度为8-45个字符'}
];

//用户昵称输入验证规则
export const nicknameValidationRules: ValidationRule[] = [
    {maxLength: 45, message: '用户昵称长度不能超过45个字符'}
]

//用户描述输入验证规则
export const descriptionValidationRules: ValidationRule[] = [
    {maxLength: 45, message: '用户描述不能超过255个字符'}
]

//用户姓名验证规则
export const nameValidationRules: ValidationRule[] = [
    {required: true, message: '姓名不能为空'},
    {pattern: /^[\u4E00-\u9FA5\u3400-\u4DBF]+$/, message: '姓名只能为《通用规范汉字表》中汉字，符合国家标准【姓名登记条例】'},
    {minLength: 2, maxLength: 6, message: '姓名长度为2-6个字符'}
]

//密码输入验证规则
export const passwordValidationRules: ValidationRule[] = [
    {required: true, message: '密码不能为空'},
    {pattern: /^[A-Za-z0-9!?]+$/, message: '密码只能为字母、数字以及英文感叹号!和英文问号?'},
    {minLength: 8, maxLength: 45, message: '密码长度为8-45个字符'}
];

//确认密码输入验证规则
export const confirmedPasswordValidationRules= (passwordInputRef: React.RefObject<InputRef|null>): ValidationRule[]=>{ return[
    {required: true, message: '密码不能为空'},
    {pattern: /^[A-Za-z0-9!?]+$/, message: '密码只能为字母、数字以及英文感叹号!和英文问号?'},
    {minLength: 8, maxLength: 45, message: '密码长度为8-45个字符'},
    {validator:(value: string | string[]):boolean =>{
        const value2=passwordInputRef.current?.getValue();
        return value===value2;
    },message:'两次密码输入不一致'}
];}

//性别输入验证规则

//学校所在省份输入验证规则

//学校名称输入验证规则
export const schoolValidationRules: ValidationRule[] = [
    {required: true, message: '学校名称不能为空'},
    {minLength: 4, maxLength: 60, message: '学校名称长度为4-60个字符'}
]

//二级单位名称输入验证规则
export const secondaryUnitValidationRules: ValidationRule[] = [
    {required: true, message: '二级单位名称不能为空'},
    {minLength: 2, maxLength: 100, message: '二级单位名称长度为2-100个字符'}
]

//专业输入验证规则
export const majorValidationRules:ValidationRule[]=[
    //{required: true, message: '专业名称不能为空'},
    {minLength: 2, maxLength: 45, message: '专业名称长度为2-45个字符'}
]

//用户类型输入验证规则

//用户职务输入验证规则


//邮箱验证规则
export const emailValidationRules: ValidationRule[] = [
    {required: true, message: '邮箱不能为空'},
    {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式错误'}
];


//电话号码输入验证规则
export const phoneNumberValidationRules: ValidationRule[] = [
    {required: true, message: '电话号码不能为空'},
    {pattern: /^[\+]?[0-9]{0,3}[\-]?(13|14|15|16|17|18|19)[0-9]{9}|0\d{2,3}-\d{7,8}|^0\d{2,3}-\d{7,8}-\d{1,4}$/, message: '电话号码格式错误'},
];

//QQ输入验证规则
export const qqValidationRules:ValidationRule[]=[
    //{required: true, message: 'QQ账号不能为空'},
    {minLength: 6, maxLength: 20, message: 'QQ账号长度为6-20个字符'}
]
//微信输入验证规则
export const wechatValidationRules:ValidationRule[]=[
    //{required: true, message: '微信账号不能为空'},
    {minLength: 6, maxLength: 20, message: '微信账号长度为6-20个字符'}
]

//注册时间输入验证规则


