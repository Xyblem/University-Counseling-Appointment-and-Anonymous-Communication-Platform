import {ValidationRule} from "../../components/ui/widget/InputField";


//账号输入验证规则
export const accountValidationRules: ValidationRule[] = [
    {required: true, message: '用户名不能为空'},
    {pattern: /^[A-Za-z0-9_]+$/, message: '用户名只能为字母、数字和下划线'},
    {minLength: 8, maxLength: 40, message: '用户名长度为8-20个字符'}
];

//密码输入验证规则
export const passwordValidationRules: ValidationRule[] = [
    {required: true, message: '密码不能为空'},
    {pattern: /^[A-Za-z0-9!?]+$/, message: '密码只能为字母、数字以及英文感叹号!和英文问号?'},
    {minLength: 8, maxLength: 40, message: '密码长度为8-20个字符'}
];

//邮箱验证规则
export const emailValidationRules: ValidationRule[] = [
    {required: true, message: '邮箱不能为空'},
    {pattern: /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/, message: '邮箱格式错误'}
];