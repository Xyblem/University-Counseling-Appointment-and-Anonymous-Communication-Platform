import {ValidationRule} from "../../components/ui/widget/InputField";


//账号输入验证规则
export const usernameValidationRules: ValidationRule[] = [
    {required: true, message: '用户名不能为空'},
    {pattern: /^[A-Za-z0-9_]+$/, message: '用户名只能为字母、数字和下划线'},
    {minLength: 8, maxLength: 45, message: '用户名长度为8-45个字符'}
];

//密码输入验证规则
export const passwordValidationRules: ValidationRule[] = [
    {required: true, message: '密码不能为空'},
    {pattern: /^[A-Za-z0-9!?]+$/, message: '密码只能为字母、数字以及英文感叹号!和英文问号?'},
    {minLength: 8, maxLength: 45, message: '密码长度为8-45个字符'}
];

//邮箱验证规则
export const emailValidationRules: ValidationRule[] = [
    {required: true, message: '邮箱不能为空'},
    {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式错误'}
];


//手机号码输入验证规则
export const phoneNumberValidationRules: ValidationRule[] = [
    {required: true, message: '手机号码不能为空'},
    {pattern: /^[\+]?[0-9]{0,3}[\-]?(13|14|15|16|17|18|19)[0-9]{9}|0\d{2,3}-\d{7,8}|^0\d{2,3}-\d{7,8}-\d{1,4}$/, message: '手机号码格式错误'},
];


