// 组件Props类型
import React, {forwardRef, ReactNode, useCallback, useImperativeHandle, useRef, useState} from "react";
import {ReturnObject} from "./ReturnObject";


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
    onRequestEnd?: (requestBody:RequestBody) => void;
    /*请求出错时(request(...).catch中)执行*/
    onRequestError?: (requestBody:RequestBody,err:Error) => void;
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
        onRequestError
    } = props;

    const [currentState, setCurrentState] = useState<ComponentState>('idle');
    const [returnObject, setReturnObject] = useState<ReturnObject|null>(null);
    const [networkError, setNetworkError] = useState<Error|null>(null);
    const requestBodyRef = useRef<RequestBody | null>(null);


    const handleRequest = useCallback(async (requestBody: RequestBody): Promise<ReturnObject<ReturnType>> => {
        // requestBodyRef.current = requestBody;
        // let returnObject =null;
        //     setCurrentState('loading');
        // onRequestBegin?.(requestBody);
        // await request(requestBody).then(returnObject=>{
        //     setCurrentState('handling');
        //     onHandlingReturnObject?.(requestBody, returnObject);
        //     }
        // ).catch(err=>{
        //         setCurrentState('networkError');
        //         onRequestError?.(requestBody, err as Error);
        //     }
        // ).finally(()=>{
        //     setCurrentState('finished');
        //     onRequestEnd?.(requestBody);
        //     }
        //
        // );
        try {
            setCurrentState('loading');
            onRequestBegin?.(requestBody);

            const returnObject = await request(requestBody);

            setCurrentState('handling');
            onHandlingReturnObject?.(requestBody, returnObject);

            setCurrentState('finished');
            setReturnObject(returnObject);
            return returnObject;
        } catch (err) {
            setCurrentState('networkError');
            setNetworkError(err as Error);
            onRequestError?.(requestBody, err as Error);
            throw err;
        } finally {
            onRequestEnd?.(requestBody);
        }
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
        returnObject:returnObject,
        networkError:networkError
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


