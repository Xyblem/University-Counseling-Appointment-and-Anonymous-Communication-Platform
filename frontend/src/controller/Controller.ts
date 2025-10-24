import {ReturnObject} from "../common/response/ReturnObject";
import api from "../utils/api/api_config";



export class Controller {

    _get=<RequestBody,ReturnType>(_api_:string)=>async (request:RequestBody): Promise<ReturnObject<ReturnType>> => {
        let result:ReturnObject<ReturnType>= {code:0,status:"",timestamp:0};
        await api.get<ReturnObject<ReturnType>>(_api_,{params:request}).then(response => {
            //@ts-ignore
            result=response;
        })
        return result;
    }

    _post=<RequestBody,ReturnType>(_api_:string)=>async (request:RequestBody): Promise<ReturnObject<ReturnType>> => {
        let result:ReturnObject<ReturnType>= {code:0,status:"",timestamp:0};
        await api.post<ReturnObject<ReturnType>>(_api_,request).then(response => {
            //@ts-ignore
            result=response;
        })
        return result;
    }
}