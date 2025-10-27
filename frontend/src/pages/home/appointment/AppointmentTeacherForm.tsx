import {User} from "../../../entity/User";
import React, {useEffect, useRef, useState} from "react";
import {useOutletContext} from "react-router";
import {Homepage} from "../HomepageForm";
import {AppointmentController, AppointmentHandingRequest} from "../../../controller/AppointmentController";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {AppointmentDTO} from "../../../entity/AppointmentDTO";
import {ResponseState} from "../../../common/response/ResponseState";
import {AppointmentStatus} from "../../../entity/enums/AppointmentStatus";
import {Button} from "../../../common/view/controller/Button";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";
import {Table} from "../../../common/view/display/Table";
import {Dialog, DialogRef} from "../../../common/view/container/Dialog";

export interface AppointmentTeacherFormProps{
    teacherUser:User|null
}


export const AppointmentTeacherForm: React.FC<AppointmentTeacherFormProps> = ({teacherUser})=>{
    const context=useOutletContext<Homepage.OutletContext>();
    const appointmentController=new AppointmentController();

    const findAppointmentsHandler=useRef<ResponseHandlerRef<{teacherUsername:string},AppointmentDTO[]>>(null);
    const [findAppointmentsStates,setFindAppointmentsStates] = useState<ResponseState<AppointmentDTO[]>>();

    const handleAppointmentsHandler=useRef<ResponseHandlerRef<AppointmentHandingRequest,any>>(null);
    const [handingAppointmentsStates,setHandingAppointmentsStates] = useState<ResponseState<any>>();

    const handlingResultDialogRef=useRef<DialogRef>(null);

    useEffect(() => {
        findAppointmentsHandler.current?.request({teacherUsername:context.user?.username==null?"null":context.user.username});
    }, []);

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
    },{
        key: 'action',
        title: '操作',
        width: 150,
        render: (_: any, record: AppointmentDTO) => (
            <div>
                <Button type="default" onClick={()=>{
                    handleAppointmentsHandler.current?.request({
                        appointmentId: record.appointmentId, status: AppointmentStatus.CONFIRM
                    });
                }}>确认</Button>
                <Button type="default" onClick={()=>{
                    handleAppointmentsHandler.current?.request({
                        appointmentId: record.appointmentId, status: AppointmentStatus.REJECT
                    });
                }}>拒绝</Button>
                <Button type="default" onClick={()=>{
                    handleAppointmentsHandler.current?.request({
                        appointmentId: record.appointmentId, status: AppointmentStatus.RESCHEDULE
                    });
                }}>改期</Button>
            </div>
        ),
    }];

    const handlingResultDialog=(<ResponseHandler<AppointmentHandingRequest,any>
        ref={handleAppointmentsHandler}
        request={appointmentController.handle}
        setResponseState={setHandingAppointmentsStates}
        idleComponent={<></>}
        loadingComponent={<Loading type="dots"
                                   text='处理中...'
                                   color="#2196f3"
                                   size="large"
                                   fullScreen/>}
        handlingReturnObjectComponent={<Loading type="dots"
                                                text='处理处理结果中...'
                                                color="#2196f3"
                                                size="large"
                                                fullScreen/>}
        networkErrorComponent={
            <Dialog
                autoOpen
                ref={handlingResultDialogRef}
                type="modal"
                title="网络错误"
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">详情：{handingAppointmentsStates?.networkError?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type="default"
                                style={{flexGrow: 1}} onClick={() => {
                            handlingResultDialogRef.current?.close();
                        }}>返回</Button>
                    </div>
                </div>
            </Dialog>
        }

        finishedComponent={
            <Dialog
                autoOpen
                ref={handlingResultDialogRef}
                type="modal"
                title={"处理" + ReturnObject.Status.ChineseName.get(handingAppointmentsStates?.returnObject?.status)}
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
                onClose={() => {
                    findAppointmentsHandler.current?.recover();
                    findAppointmentsHandler.current?.request({teacherUsername:context.user?.username==null?"null":context.user.username});
                }}
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">{handingAppointmentsStates?.returnObject?.status === ReturnObject.Status.SUCCESS ? "处理成功" : handingAppointmentsStates?.returnObject?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type={handingAppointmentsStates?.returnObject?.status === ReturnObject.Status.SUCCESS ? "primary" : "default"}
                                style={{flexGrow: 1}} onClick={() => {
                            handlingResultDialogRef.current?.close();
                        }}>{handingAppointmentsStates?.returnObject?.status === ReturnObject.Status.SUCCESS ? "确定" : "返回"}</Button>

                    </div>
                </div>

            </Dialog>
        }
    />);

    return (<div>
        {handlingResultDialog}
        <ResponseHandler<{teacherUsername:string},AppointmentDTO[]>
            ref={findAppointmentsHandler}
            request={appointmentController.findTeacherPending}
            setResponseState={setFindAppointmentsStates}
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
                    <p>详情：{findAppointmentsStates?.networkError?.message}</p>
                </div>
            }
            finishedComponent={(!(findAppointmentsStates?.returnObject?.status===ReturnObject.Status.SUCCESS))?(
                <div className="layout-flex-column">
                    <h2>获取预约信息{ReturnObject.Status.ChineseName.get(findAppointmentsStates?.returnObject?.status)}</h2>
                    <p>详情：{findAppointmentsStates?.returnObject?.message}</p>
                </div>
            ):(
                <Table dataSource={findAppointmentsStates?.returnObject?.data==null?[]:findAppointmentsStates?.returnObject?.data} columns={tableColumns}/>
            )}
        />
    </div>)
}