import {Button} from "../../components/ui/widget/Button";
import React from "react";
import {CheckLoginRef} from "../../components/functional/CheckLogin";
import {Loading} from "../../components/ui/widget/Loading";


export const CheckLoginLoading=(<Loading type="dots" text='页面加载中...' color="#2196f3" size="large" fullScreen></Loading>)


export const CheckLoginErrorViewOld=(checkLoginRef:React.RefObject<CheckLoginRef | null>)=>(<div>
    <div className="layout-flex">
        <h2 style={{color: 'red'}}>验证登录状态失败，请检查网络连接</h2>
    </div>
    <div className="layout-flex">
        <Button type="default" onClick={checkLoginRef.current?.handleRetry}>重新加载</Button>
    </div>
</div>)


export const CheckLoginNotLoginViewOld=(checkLoginRef:React.RefObject<CheckLoginRef | null>)=> (
    <div>
        <div className="layout-flex">
            <h2>您还未登录，请登录</h2>
        </div>
        <div className="layout-flex">
            <Button type="default" onClick={checkLoginRef.current?.handleRetry}>重新加载</Button>
            &nbsp;
            <Button type="default" onClick={() => {
                window.location.href = "/auth/login";
            }}>去登录</Button>
        </div>
    </div>
    )


export const CheckLoginErrorView=(<div>
    <div className="layout-flex">
        <h2 style={{color: 'red'}}>验证登录状态失败，请检查网络连接</h2>
    </div>
    <div className="layout-flex">
        <Button type="default" onClick={()=>{window.location.reload();}}>重新加载</Button>
    </div>
</div>)


export const CheckLoginNotLoginView=(
    <div>
        <div className="layout-flex">
            <h2>您还未登录，请登录</h2>
        </div>
        <div className="layout-flex">
            <Button type="default" onClick={()=>{window.location.reload();}}>重新加载</Button>
            &nbsp;
            <Button type="default" onClick={() => {
                window.location.href = "/auth/login";
            }}>去登录</Button>
        </div>
    </div>
)



