import {ReturnObject} from "./ReturnObject";

export interface ResponseState<T=any> {
    loading: boolean;
    returnObject:ReturnObject<T>|null;
    networkError:Error|null
}