import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";

export class CaptchaController {
    /**
     * 调用API返回验证码，一定能返回可用的验证码，否则报错
     */
    captcha=async ():Promise<{captchaKey: string; base64Image: string;}> =>{
        let result:{captchaKey: string; base64Image: string;}={
            captchaKey: '',
            base64Image: '',
        }
        await api.get<ReturnObject<{captchaKey: string; base64Image: string;}>>("api/captcha").then(response=>{
            // @ts-ignore
            if (response.code === ReturnCode.SUCCESS && response.data) {
                //@ts-ignore
                result = response.data;
            }else{
                throw new Error('获取验证码失败');
            }
        })
        return result;
    }
}