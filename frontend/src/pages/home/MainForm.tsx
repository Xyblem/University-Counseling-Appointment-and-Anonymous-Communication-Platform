//React框架
import React, {useEffect, useRef, useState} from "react";
//样式
import './Home.css'
import '../../css/LayoutFlex.css'
//自定义组件
//实体
import {User} from "../../entity/User";
//控制器
import {UserController} from "../../controller/UserController";
import {ResponseHandler, ResponseHandlerRef} from "../../common/response/ResponseHandler";
import {Button} from "../../common/view/controller/Button";
import {Loading} from "../../common/view/display/Loading";
import {useOutletContext} from "react-router";
import {Homepage} from "./HomepageForm";
import {UserRole} from "../../entity/enums/UserRole";
import {Table} from "../../common/view/display/Table";
import {AppointmentStatus} from "../../entity/enums/AppointmentStatus";
import {AppointmentDTO} from "../../entity/AppointmentDTO";
import {ReturnObject} from "../../common/response/ReturnObject";
import {AppointmentController} from "../../controller/AppointmentController";
import {ResponseState} from "../../common/response/ResponseState";
import {Divider} from "../../common/view/decoration/Divider";
import {useNavigate} from "react-router-dom";


//主页
export const MainForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    const navigate = useNavigate();
    //变量
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
    const date = currentDate.getDate();
    const context = useOutletContext<Homepage.OutletContext>();

    const appointmentController=new AppointmentController();

    const findPendingAppointmentsHandler=useRef<ResponseHandlerRef<string,AppointmentDTO[]>>(null);
    const [findPendingAppointmentsStates,setFindPendingAppointmentsStates] = useState<ResponseState<AppointmentDTO[]>>();

    const findNonPendingAppointmentsHandler=useRef<ResponseHandlerRef<string,AppointmentDTO[]>>(null);
    const [findNonPendingAppointmentsStates,setFindNonPendingAppointmentsStates] = useState<ResponseState<AppointmentDTO[]>>();

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-首页";
    }, []);

    let mainForm: any = null;

    if (Number(context.user?.role) === UserRole.STUDENT) {
        mainForm = (<div className="home-pair-page">
            <div className="box-appointment-consultation">
                <div className="layout-flex-column">
                    <h2>预约咨询</h2>
                    <br/>
                    <Button type="primary" onClick={()=>{
                        navigate("/home/community/post");
                    }}>匿名倾述</Button>
                    <br/>
                    <Button type="primary" onClick={() => {
                        navigate("/psych_test_entrance");
                    }}>心理测试</Button>
                    <br/>
                    <Button type="primary">科普广场</Button>
                </div>
            </div>
            <div className="box-popular-science">
                <h2>科普内容推荐</h2>
            </div>
        </div>);
    }

    const tableColumns=[{
        key: 'appointmentId',
        title: '预约ID',
        width: 80,
        sortable: true,
    },{
        key: 'studentName',
        title: '学生',
        width: 80,
        sortable: true,
    },{
        key: 'teacherName',
        title: '咨询师',
        width: 80,
        sortable: true,
    },{
        key: 'description',
        title: '描述',
        width: 80,
        sortable: true,
    },{
        key: 'startTime',
        title: '开始时间',
        width: 80,
        sortable: true,
    },{
        key: 'endTime',
        title: '结束时间',
        width: 80,
        sortable: true,
    },{
        key: 'applyTime',
        title: '申请时间',
        width: 80,
        sortable: true,
    },{
        key: 'status',
        title: '状态',
        width: 80,
        sortable: true,
        render: (value: string) => (
            <span>{AppointmentStatus.ChineseName.get(value)}</span>
        )
    }];

    if (Number(context.user?.role) === UserRole.TEACHER) {
        mainForm = (<div className="home-pair-page">
                <div className="layout-flex-column">
                    <div className="layout-flex-row">
                        <p>待处理的预约申请</p>
                        <span style={{flexGrow: 1}}></span>
                        <Button type="default" onClick={() => {
                            navigate("/home/appointment");
                        }}>立即处理</Button>
                    </div>

                    <ResponseHandler<string, AppointmentDTO[]>
                        autoRequest={context.user?.username}
                        ref={findPendingAppointmentsHandler}
                        request={appointmentController.findTeacherPending}
                        setResponseState={setFindPendingAppointmentsStates}
                        idleComponent={<></>}
                        loadingComponent={
                            <Loading type="dots"
                                     text='获取预约信息中...'
                                     color="#2196f3"
                                     size="large"
                                     fullScreen/>
                        }
                        handlingReturnObjectComponent={
                            <Loading type="dots"
                                     text='处理预约结果中...'
                                     color="#2196f3"
                                     size="large"
                                     fullScreen/>
                        }
                        networkErrorComponent={
                            <div className="layout-flex-column">
                                <h2>网络错误</h2>
                                <p>详情：{findPendingAppointmentsStates?.networkError?.message}</p>
                            </div>
                        }
                        finishedComponent={(!(findPendingAppointmentsStates?.returnObject?.status === ReturnObject.Status.SUCCESS)) ? (
                            <div className="layout-flex-column">
                                <h2>获取预约信息{ReturnObject.Status.ChineseName.get(findPendingAppointmentsStates?.returnObject?.status)}</h2>
                                <p>详情：{findPendingAppointmentsStates?.returnObject?.message}</p>
                            </div>
                        ) : (
                            <Table
                                dataSource={findPendingAppointmentsStates?.returnObject?.data == null ? [] : findPendingAppointmentsStates?.returnObject?.data}
                                columns={tableColumns}/>
                        )}
                    />
                    <Divider color="Black" spacing="10px"/>
                    <div className="layout-flex-row">
                        <p>已完成的预约</p>
                    </div>
                    <ResponseHandler<string, AppointmentDTO[]>
                        autoRequest={context.user?.username}
                        ref={findNonPendingAppointmentsHandler}
                        request={appointmentController.findTeacherNonPending}
                        setResponseState={setFindNonPendingAppointmentsStates}
                        idleComponent={<></>}
                        loadingComponent={
                            <Loading type="dots"
                                     text='获取预约信息中...'
                                     color="#2196f3"
                                     size="large"
                                     fullScreen/>
                        }
                        handlingReturnObjectComponent={
                            <Loading type="dots"
                                     text='处理预约结果中...'
                                     color="#2196f3"
                                     size="large"
                                     fullScreen/>
                        }
                        networkErrorComponent={
                            <div className="layout-flex-column">
                                <h2>网络错误</h2>
                                <p>详情：{findNonPendingAppointmentsStates?.networkError?.message}</p>
                            </div>
                        }
                        finishedComponent={(!(findNonPendingAppointmentsStates?.returnObject?.status === ReturnObject.Status.SUCCESS)) ? (
                            <div className="layout-flex-column">
                                <h2>获取预约信息{ReturnObject.Status.ChineseName.get(findNonPendingAppointmentsStates?.returnObject?.status)}</h2>
                                <p>详情：{findNonPendingAppointmentsStates?.returnObject?.message}</p>
                            </div>
                        ) : (
                            <Table
                                dataSource={findNonPendingAppointmentsStates?.returnObject?.data == null ? [] : findNonPendingAppointmentsStates?.returnObject?.data}
                                columns={tableColumns}/>
                        )}
                    />

                </div>
                <div className="layout-flex-column" style={{marginLeft: "50px"}}>
                    <Button type="primary">预约管理</Button>
                    <br/>
                    <Button type="primary">发表科普</Button>
                    <br/>
                    <Button type="primary">测评分析</Button>
                </div>
            </div>
            );
            }

            return (
            <div className="layout-flex-column">
                <div>
                    <div className="home-main-hello-label">
                        <h2>你好{context.user?.name == null ? null : context.user?.name}{UserRole.ChineseNameAppellation.get(Number(context.user?.role))}，现在是{year}年{month}月{date}日</h2>
                    </div>
                    {mainForm}
                </div>
            </div>
            )
            }