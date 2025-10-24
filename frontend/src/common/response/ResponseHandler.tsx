// 组件Props类型
import React, {forwardRef, ReactNode, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {ReturnObject} from "./ReturnObject";
import {ResponseState} from "./ResponseState";


export interface ResponseHandlerProps<RequestBody=any,ReturnType=any> {
    /*响应前显示的组件*/
    idleComponent?:ReactNode;
    /*响应中时显示的组件*/
    loadingComponent?: ReactNode;
    /*处理返回对象时显示的组件*/
    handlingReturnObjectComponent?: ReactNode;
    /*响应正常结束时(与返回结果的code和status无关)显示的组件*/
    finishedComponent?: ReactNode;
    /*网络错误时(request(...).catch中)显示的组件*/
    networkErrorComponent?: ReactNode;
    /*请求操作*/
    request:(requestBody:RequestBody)=>Promise<ReturnObject<ReturnType>>;
    /*请求开始时(request(...)之前)执行*/
    onRequestBegin?: (requestBody:RequestBody) => void;
    /*处理返回对象时执行(request(...).then中)*/
    onHandlingReturnObject?: (requestBody:RequestBody,returnObject:ReturnObject<ReturnType>) => void;
    /*请求结束时(request(...).finally中)执行*/
    onRequestEnd?: (requestBody:RequestBody,returnObject:ReturnObject<ReturnType>) => void;
    /*请求出错时(request(...).catch中)执行*/
    onRequestError?: (requestBody:RequestBody,err:Error) => void;
    /*设置状态的方式*/
    setResponseState?:React.Dispatch<React.SetStateAction<ResponseState<ReturnType> | undefined>>
    /*自动请求*/
    autoRequest?:RequestBody;
}


export interface ResponseHandlerRef<RequestBody=any,ReturnType=any>{
    /*发起请求*/
    request: (requestBody:RequestBody) => Promise<ReturnObject<ReturnType>>;
    /*回到初始状态*/
    recover:()=>void;
    /*暴露返回结果*/
    returnObject:ReturnObject<ReturnType>|null;
    /*暴露网络错误*/
    networkError:Error|null;
}

type ComponentState = 'idle' | 'loading' | 'handling' | 'finished' | 'networkError';

export const ResponseHandler = forwardRef(<RequestBody, ReturnType>(
    props: ResponseHandlerProps<RequestBody, ReturnType>,
    ref: React.Ref<ResponseHandlerRef<RequestBody, ReturnType>>
) => {
    const {
        idleComponent,
        loadingComponent,
        handlingReturnObjectComponent,
        finishedComponent,
        networkErrorComponent,
        request,
        onRequestBegin,
        onHandlingReturnObject,
        onRequestEnd,
        onRequestError,
        setResponseState,
        autoRequest
    } = props;

    const [currentState, setCurrentState] = useState<ComponentState>('idle');
    const [returnObject, setReturnObject] = useState<ReturnObject|null>(null);
    const [networkError, setNetworkError] = useState<Error|null>(null);
    const requestBodyRef = useRef<RequestBody | null>(null);

    useEffect(() => {
        if(autoRequest!==undefined){
            handleRequest(autoRequest);
        }
    }, []);

    const handleRequest = useCallback(async (requestBody: RequestBody): Promise<ReturnObject<ReturnType>> => {
        setCurrentState('loading');
        setResponseState?.((prev: any) => ({...prev, loading: true}));
        onRequestBegin?.(requestBody);
        let result:ReturnObject={status:"null",code:0,timestamp:0};
        request(requestBody).then(response=>{
            setCurrentState('handling');
            setReturnObject(response);
            setResponseState?.((prev: any) => ({...prev, returnObject: response}));
            result=response;
            onHandlingReturnObject?.(requestBody, response);
            setCurrentState('finished');
        }).catch(err=>{
            setCurrentState('networkError');
            setNetworkError(err as Error);
            setResponseState?.((prev: any) => ({...prev, networkError: err}));
            onRequestError?.(requestBody, err as Error);
            //throw err;
        }).finally(()=>{
            setResponseState?.((prev: any) => ({...prev, loading: false}));
            onRequestEnd?.(requestBody,result);
        });
        return result;
    }, [request, onRequestBegin, onHandlingReturnObject, onRequestEnd, onRequestError]);

    const recover = useCallback(() => {
        setCurrentState('idle');
        setReturnObject(null);
        setNetworkError(null);
        requestBodyRef.current = null;
    }, []);

    useImperativeHandle(ref, () => ({
        request: handleRequest,
        recover:recover,
        get returnObject(){return returnObject},
        get networkError(){return networkError}
    }), [handleRequest, recover]);

    const renderComponent = () => {
        switch (currentState) {
            case 'idle':
                return idleComponent || null;
            case 'loading':
                return loadingComponent || null;
            case 'handling':
                return handlingReturnObjectComponent || null;
            case 'finished':
                return finishedComponent || null;
            case 'networkError':
                return networkErrorComponent || null;
            default:
                return null;
        }
    };

    return <>{renderComponent()}</>;
}) as <RequestBody, ReturnType>(
    props: ResponseHandlerProps<RequestBody, ReturnType> & {
        ref?: React.Ref<ResponseHandlerRef<RequestBody, ReturnType>>
    }
) => React.ReactElement;


