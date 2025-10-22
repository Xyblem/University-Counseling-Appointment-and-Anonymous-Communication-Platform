
// 组件Props类型
import React, {ReactNode} from "react";
import {ReturnObject} from "../../utils/api/ReturnObject";

export interface CheckReturnObjectProps {
    loading?: boolean;
    returnObject:ReturnObject|null;
    networkError:Error|null;
    loadingComponent?: ReactNode;
    children?: ReactNode;
    networkErrorComponent?: ReactNode;
}

export const CheckReturnObject: React.FC<CheckReturnObjectProps> = ({
                                                                loading,
                                                                returnObject,
                                                                networkError,
                                                                loadingComponent,
                                                                children,
                                                                networkErrorComponent,
                                                                    }) => {

    if(loading){
        return (<div>{loadingComponent}</div>);
    }
    if(networkError!=null){
        return (<div>{networkErrorComponent}</div>);
    }
    if(returnObject!=null){
        return (<div>{children}</div>);
    }

    return (<div></div>);
}
