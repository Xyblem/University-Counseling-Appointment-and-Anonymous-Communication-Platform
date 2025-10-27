import {User} from "../../../entity/User";
import React, {useRef, useState} from "react";
import {AppointmentStatus} from "../../../entity/enums/AppointmentStatus";
import {AppointmentDTO} from "../../../entity/AppointmentDTO";
import {Loading} from "../../../common/view/display/Loading";
import {ReturnObject} from "../../../common/response/ReturnObject";
import {Table} from "../../../common/view/display/Table";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {ResponseState} from "../../../common/response/ResponseState";
import {AppointmentController} from "../../../controller/AppointmentController";


export interface AppointmentAdminFormProps{
    adminUser:User|null
}

export const AppointmentAdminForm: React.FC<AppointmentAdminFormProps> = ({adminUser})=>{
    const appointmentController=new AppointmentController();
    const findAppointmentsHandler=useRef<ResponseHandlerRef<any,AppointmentDTO[]>>(null);
    const [findAppointmentsStates,setFindAppointmentsStates] = useState<ResponseState<AppointmentDTO[]>>();

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



    return (<div><ResponseHandler<any,AppointmentDTO[]>
        ref={findAppointmentsHandler}
        request={appointmentController.listAll}
        setResponseState={setFindAppointmentsStates}
        autoRequest={null}
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
    /></div>)
}