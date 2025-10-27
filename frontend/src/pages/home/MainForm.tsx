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
import {PsychKnowledgeController} from "../../controller/PsychKnowledgeController";
import {PsychKnowledgeDTO} from "../../entity/DTO/PsychKnowledgeDTO";
import {PsychKnowledgeCard} from "../../component/view/PsychKnowledgeCard";
import {ReviewStatus} from "../../entity/enums/ReviewStatus";
import {Gender} from "../../entity/enums/Gender";
import {ProvinceCN} from "../../entity/enums/ProvinceCN";
import {UserPosition} from "../../entity/enums/UserPosition";
import {Dialog, DialogRef} from "../../common/view/container/Dialog";
import {Text} from "../../common/view/display/Text";


//主页
export const MainForm: React.FC = () => {
    //控制器
    const userController = new UserController();
    const psychKnowledgeController=new PsychKnowledgeController();
    const navigate = useNavigate();
    //变量
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
    const date = currentDate.getDate();
    const context = useOutletContext<Homepage.OutletContext>();

    const appointmentController=new AppointmentController();

    const findPendingAppointmentsHandler=useRef<ResponseHandlerRef<{teacherUsername:string},AppointmentDTO[]>>(null);
    const [findPendingAppointmentsStates,setFindPendingAppointmentsStates] = useState<ResponseState<AppointmentDTO[]>>();

    const findNonPendingAppointmentsHandler=useRef<ResponseHandlerRef<{teacherUsername:string},AppointmentDTO[]>>(null);
    const [findNonPendingAppointmentsStates,setFindNonPendingAppointmentsStates] = useState<ResponseState<AppointmentDTO[]>>();

    //钩子
    useEffect(() => {
        document.title = "高校心理咨询预约与匿名交流平台-首页";
    }, []);

    let mainForm: any = null;

    const psychKnowledgeRecommendRef=useRef<ResponseHandlerRef<null, PsychKnowledgeDTO>>(null);
    const [psychKnowledgeRecommendState,setPsychKnowledgeRecommend]=useState<ResponseState<PsychKnowledgeDTO>>();
    if (Number(context.user?.role) === UserRole.STUDENT) {
        mainForm = (<div className="home-pair-page">
            <div className="box-appointment-consultation">
                <div className="layout-flex-column">
                    <h2>预约咨询</h2>
                    <br/>
                    <Button style={{width:"250px"}} type="primary" onClick={()=>{
                        navigate("/home/community/post");
                    }}>匿名倾述</Button>
                    <br/>
                    <Button block type="primary" onClick={() => {
                        navigate("/psych_test_entrance");
                    }}>心理测试</Button>
                    <br/>
                    <Button block type="primary" onClick={()=>{
                        navigate("/psych_knowledge/browse");
                    }}>科普广场</Button>
                </div>
            </div>
            <div className="box-popular-science">
                <h2>科普内容推荐</h2>
                <ResponseHandler<null,PsychKnowledgeDTO>
                    ref={psychKnowledgeRecommendRef}
                    request={psychKnowledgeController.recommend}
                    setResponseState={setPsychKnowledgeRecommend}
                    autoRequest={null}
                    loadingComponent={<Loading type="dots"
                                               text='获取科普推荐中...'
                                               color="#2196f3"
                                               size="large"
                                               />}
                    handlingReturnObjectComponent={<Loading type="dots"
                                                            text='处理科普推荐中...'
                                                            color="#2196f3"
                                                            size="large"
                    />}
                    networkErrorComponent={<div className="layout-flex-column">
                        <h2>网络错误</h2>
                        <p>详情：{psychKnowledgeRecommendState?.networkError?.message}</p>
                    </div>}
                    finishedComponent={(!(psychKnowledgeRecommendState?.returnObject?.status === ReturnObject.Status.SUCCESS)) ? (
                        <div className="layout-flex-column">
                            <h2>获取科普信息{ReturnObject.Status.ChineseName.get(psychKnowledgeRecommendState?.returnObject?.status)}</h2>
                            <p>详情：{psychKnowledgeRecommendState?.returnObject?.message}</p>
                        </div>
                    ) : (<PsychKnowledgeCard
                        role={context.user==null?UserRole.UNKNOWN:context.user.role}
                        username={context.user==null?"":context.user.username}
                        mode="browse"
                        data={psychKnowledgeRecommendState?.returnObject?.data==null?{
                            knowledgeId:0,
                            title:"",
                            content:"",
                            teacherPublisherUsername: "",
                            teacherPublisherDisplayName:"",
                            publishTime:new Date(),
                            reviewStatus:ReviewStatus.PENDING
                        }:psychKnowledgeRecommendState?.returnObject?.data}/>)}
                />
            </div>
        </div>);
    }

    const tableColumns = [{
        key: 'appointmentId',
        title: '预约ID',
        width: 145,
        sortable: true,
    },{
        key: 'studentName',
        title: '学生',
        width: 145,
        sortable: true,
    },{
        key: 'teacherName',
        title: '咨询师',
        width: 145,
        sortable: true,
    },{
        key: 'description',
        title: '描述',
        width: 145,
        sortable: true,
    },{
        key: 'startTime',
        title: '开始时间',
        width: 145,
        sortable: true,
    },{
        key: 'endTime',
        title: '结束时间',
        width: 145,
        sortable: true,
    },{
        key: 'applyTime',
        title: '申请时间',
        width: 145,
        sortable: true,
    },{
        key: 'status',
        title: '状态',
        width: 145,
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

                    <ResponseHandler<{teacherUsername:string}, AppointmentDTO[]>
                        autoRequest={{teacherUsername:context.user==null?"null":context.user?.username}}
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
                    <Divider color="Black" spacing="50px"/>
                    <div className="layout-flex-row">
                        <p>已完成的预约</p>
                    </div>
                    <ResponseHandler<{teacherUsername:string}, AppointmentDTO[]>
                        autoRequest={{teacherUsername:context.user==null?"null":context.user?.username}}
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

                    <Button style={{width:"250px"}} type="primary" onClick={() => {
                        navigate("/home/mine/appointment_manage");
                    }}>预约管理</Button>
                    <br/>
                    <Button type="primary" onClick={() => {
                        navigate("/psych_knowledge/post");
                    }}>发表科普</Button>
                    <br/>
                    <Button type="primary" onClick={() => {
                        navigate("/psych_knowledge/mine/teacher");
                    }}>我的科普</Button>
                    <br/>
                    <Button type="primary" onClick={() => {
                        navigate("/home/mine/evaluation_record");
                    }}>测评分析</Button>
                </div>
            </div>
        );
    }

    const [detailUserInformation, setDetailUserInformation] = useState<User>();
    const userDetailInformationDialogRef=useRef<DialogRef>(null);
    const UserDetailInformationDialog=(<Dialog
        ref={userDetailInformationDialogRef}
        type="modal"
        title="用户详情"
        showCloseButton
        closeOnBackdropClick
        closeOnEscape
    >
        <div className="layout-flex-column">
            <Text label="用户名：" text={''+detailUserInformation?.username} copyable/>
            <Text label="昵称：" text={"" + detailUserInformation?.nickname} copyable/>
            <Text label="用户描述：" text={"" + detailUserInformation?.description} copyable/>
            <Text label="姓名：" text={""+detailUserInformation?.name} copyable/>
            <Text label="性别：" text={"" + Gender.ChineseName.get(""+detailUserInformation?.gender)}
                  copyable/>
            <Text label="学校所在省份："
                  text={"" + ProvinceCN.ChineseName.get(""+detailUserInformation?.schoolProvince)}
                  copyable/>
            <Text label="学校：" text={""+detailUserInformation?.school} copyable/>
            <Text label="二级单位：" text={""+detailUserInformation?.secondaryUnit} copyable/>
            <Text label="专业：" text={""+detailUserInformation?.major} copyable/>
            <Text label="用户类型：" text={"" + UserRole.ChineseName.get(""+detailUserInformation?.role)}
                  copyable/>
            <Text label="职务：" text={"" + UserPosition.ChineseName.get(""+detailUserInformation?.position)}
                  copyable/>
            <Text label="邮箱：" text={""+detailUserInformation?.email} copyable/>
            <Text label="电话号码：" text={""+detailUserInformation?.phoneNumber} copyable/>
            <Text label="QQ：" text={"" + detailUserInformation?.qq} copyable/>
            <Text label="微信：" text={"" + detailUserInformation?.wechat} copyable/>
            <Text label="注册时间：" text={"" + detailUserInformation?.registrationTime} copyable/>
            <div className="layout-flex-row justify-content-flex-end">
                <span style={{flexGrow: 3.1}}></span>
                <Button type="default"
                        style={{flexGrow: 1}} onClick={() => {
                    userDetailInformationDialogRef.current?.close();
                }}>返回</Button>
            </div>
        </div>
    </Dialog>);
    const userTableColumnsBrief=[{
        key: 'username',
        title: '用户名',
        width: 100,
        sortable: true,
    },{
        key: 'name',
        title: '姓名',
        width: 80,
        sortable: true,
    },{
        key: 'gender',
        title: '性别',
        width: 20,
        sortable: true,
        render: (value: string) => (
            <span>{Gender.ChineseName.get(value)}</span>
        )
    },{
        key: 'schoolProvince',
        title: '学校所在省份',
        width: 100,
        sortable: true,
        render: (value: string,record:User) => (
            <span>{ProvinceCN.ChineseName.get(value)}</span>
        )
    },{
        key: 'school',
        title: '学校',
        width: 100,
        sortable: true,
    },{
        key: 'secondaryUnit',
        title: '二级单位',
        width: 100,
        sortable: true,
    },{
        key: 'role',
        title: '用户类型',
        width: 80,
        sortable: true,
        render: (value: string) => (
            <span>{UserRole.ChineseName.get(value)}</span>
        )
    },{
        key: 'position',
        title: '职务',
        width: 100,
        sortable: true,
        render: (value: string) => (
            <span>{UserPosition.ChineseName.get(value)}</span>
        )
    },{
        key: 'registrationTime',
        title: '注册时间',
        width: 100,
        sortable: true,
    },{
        key: 'action',
        title: '操作',
        width: 100,
        render: (_: any, record: User) => (
            <div>
                <Button type="default" onClick={()=>{
                    setDetailUserInformation(record);
                    userDetailInformationDialogRef.current?.open();
                }}>查看</Button>
            </div>)
    }];


    const adminListAllUserHandlerRef = useRef<ResponseHandlerRef<null, User[]>>(null);
    const [adminListAllUserState, setAdminListAllUserState] = useState<ResponseState<User[]>>();
    if (Number(context.user?.role) === UserRole.ADMIN) {
        mainForm = (<div className="home-pair-page">
                {UserDetailInformationDialog}
                <div className="layout-flex-column">

                    <Button style={{width: "250px"}} type="primary" onClick={() => {
                        navigate("/psych_knowledge/admin/audit");
                }}>审核科普</Button>
                <br/>
                <Button type="primary" onClick={() => {
                    navigate("/psych_knowledge/admin/report_audit");
                }}>审核科普举报</Button>
                <br/>
                <Button type="primary" onClick={() => {
                    navigate("/psych_knowledge/mine/admin");
                }}>我的审核的科普</Button>
                <br/>
                <Button type="primary" onClick={() => {
                    navigate("/home/community/report");
                }}>审核社区倾述</Button>
            </div>
            <div className="layout-flex-column" style={{marginLeft:"25px"}}>
                <div className="layout-flex-row">
                    <p>所有用户预览</p>
                </div>
                <ResponseHandler<null, User[]>
                    ref={adminListAllUserHandlerRef}
                    request={userController.listAll}
                    setResponseState={setAdminListAllUserState}
                    autoRequest={null}
                    idleComponent={<></>}
                    loadingComponent={
                        <Loading type="dots"
                                 text='获取用户信息中...'
                                 color="#2196f3"
                                 size="large"
                                 fullScreen/>
                    }
                    handlingReturnObjectComponent={
                        <Loading type="dots"
                                 text='处理用户信息中...'
                                 color="#2196f3"
                                 size="large"
                                 fullScreen/>
                    }
                    networkErrorComponent={
                        <div className="layout-flex-column">
                            <h2>网络错误</h2>
                            <p>详情：{adminListAllUserState?.networkError?.message}</p>
                        </div>
                    }
                    finishedComponent={<Table
                        dataSource={adminListAllUserState?.returnObject?.data == null ? [] : adminListAllUserState?.returnObject?.data}
                        columns={userTableColumnsBrief}/>}
                /></div>
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