//React框架
import React, {useEffect, useState} from "react";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
//自定义组件
import {Button} from "../../components/ui/widget/Button";
//实体
import {User} from "../../entity/User";
//控制器
import {UserController} from "../../controller/UserController";
import {Divider} from "../../components/decoration/Divider";
import {ReturnObject, ReturnStatus, ReturnStatusNamesCN} from "../../utils/api/ReturnObject";
import {CheckReturnObject} from "../../components/functional/CheckReturnObject";
import {Loading} from "../../components/ui/widget/Loading";






//主页
export const MainForm: React.FC = () => {
    //控制器
    const userController=new UserController();
    //变量
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
    const date = currentDate.getDate();
    //状态
    const [userLoading, setUserLoading] = useState<boolean>(false);
    const [userReturnObject,setUserReturnObject]=useState<ReturnObject<User>|null>(null);
    const [userNetworkError, setUserNetworkError]=useState<Error|null>(null);
    const [userSuccess,setUserSuccess]=useState<boolean>(false);
    const user=userReturnObject?.data;

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-首页";
        setUserLoading(true);
        setUserReturnObject(null);
        setUserNetworkError(null);
        setUserSuccess(false);
        userController.loggedInUser().then(result => {
                setUserReturnObject(result);
                if(result.status===ReturnStatus.SUCCESS){
                    setUserSuccess(true);
                }
            }
        ).catch(err => {
            setUserNetworkError(err);
        }).finally(()=>{
            setUserLoading(false);
        });
    }, []);


    const checkUserView=(<CheckReturnObject
        loading={userLoading}
        returnObject={userReturnObject}
        networkError={userNetworkError}
        loadingComponent={<Loading type="dots" text='加载页面中...' color="#2196f3" size="large" fullScreen></Loading>}
        networkErrorComponent={
            <div>
                <h3>网络错误</h3>
                <p className="home-error-detail">{userNetworkError?.message}</p>
            </div>
        }
    >
        <div>
            <h3>加载信息{ReturnStatusNamesCN.get(userReturnObject?.status)}</h3>
            <p className="home-error-detail">{userReturnObject?.message}</p>
        </div>
    </CheckReturnObject>);




    return (<div className="layout-flex-column">
        {!userSuccess?(checkUserView): (
            <div>
                <div className="home-main-hello-label">
                    <h2>你好{user == null ? null : user.name}同学，现在是{year}年{month}月{date}日</h2>
                </div>
                <div className="home-pair-page">
                    <div className="box-appointment-consultation">
                        <div className="layout-flex-column">
                            <h2>预约咨询</h2>
                            <br/>
                            <Button type="primary">匿名倾述</Button>
                            <br/>
                            <Button type="primary" onClick={() => {
                                window.location.href = "/psych_test_entrance"
                            }}>心理测试</Button>
                            <br/>
                            <Button type="primary">科普广场</Button>
                        </div>
                    </div>
                    <div className="box-popular-science">
                        <h2>科普内容推荐</h2>
                    </div>
                </div>
            </div>
        )}
    </div>)
}