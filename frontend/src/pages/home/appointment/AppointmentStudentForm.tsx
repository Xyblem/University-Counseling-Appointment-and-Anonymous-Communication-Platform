import React, {useRef, useState} from "react";
import {Textarea, TextareaCallback, TextareaRef} from "../../../common/view/input/Textarea";
import {DateInput, DateInputCallback, DateInputRef} from "../../../common/view/input/DateInput";
import {TimeInput, TimeInputCallback, TimeInputRef} from "../../../common/view/input/TimeInput";
import {Button} from "../../../common/view/controller/Button";
import {User} from "../../../entity/User";
import {Input, InputCallback, InputRef} from "../../../common/view/input/Input";
import {Select, SelectCallback, SelectOption, SelectRef} from "../../../common/view/input/Select";
import {UserController} from "../../../controller/UserController";
import {ResponseHandler, ResponseHandlerRef} from "../../../common/response/ResponseHandler";
import {ResponseState} from "../../../common/response/ResponseState";
import {ReturnObject} from "../../../common/response/ReturnObject";
import Status = ReturnObject.Status;
import {ProvinceCN} from "../../../entity/enums/ProvinceCN";
import {UserPosition} from "../../../entity/enums/UserPosition";
import {AppointmentController, AppointmentRequest} from "../../../controller/AppointmentController";
import {PostCardProps} from "../community/PostCard";
import {Loading} from "../../../common/view/display/Loading";
import {Dialog, DialogRef} from "../../../common/view/container/Dialog";
import {useNavigate} from "react-router-dom";


export interface AppointmentStudentFormProps{
    studentUser:User|null
}


export const AppointmentStudentForm: React.FC<AppointmentStudentFormProps> = ({studentUser}) => {
    //控制器
    const navigate = useNavigate();
    const userController = new UserController();
    const appointmentController = new AppointmentController();
    const schoolProvinceSelectRef = useRef<SelectRef>(null);
    const schoolInputRef = useRef<InputRef>(null);
    const teacherUsernameSelectRef = useRef<SelectRef>(null);
    const getTeachersHandlerRef = useRef<ResponseHandlerRef<{ schoolProvince: number, school: string }, User[]>>(null);
    const [teachersStates, setTeachersStates] = useState<ResponseState<User[]>>();
    const [teachersFormData, setTeachersFormData] = useState({
        schoolProvince: 0,
        school: "",
    });
    const descriptionInputRef = useRef<TextareaRef>(null);
    const startDateInputRef = useRef<DateInputRef>(null);
    const startTimeInputRef = useRef<TimeInputRef>(null);
    const endDateInputRef = useRef<DateInputRef>(null);
    const endTimeInputRef = useRef<TimeInputRef>(null);
    const addAppointmentHandler = useRef<ResponseHandlerRef<AppointmentRequest, any>>(null);
    const [addAppointmentState, setAddAppointmentState] = useState<ResponseState<any>>();
    const addAppointmentResultDialogRef=useRef<DialogRef>(null);
    const [appointmentFormData, setAppointmentFormData] = useState<AppointmentRequest>({
        description: "", endTime: "", startTime: "", studentUsername: "", teacherUsername: ""
    })

    const [startDateTime, setStartDateTime] = useState<{ date: string, time: string }>({date: "", time: ""});
    const [endDateTime, setEndDateTime] = useState<{ date: string, time: string }>({date: "", time: ""});


    const teachersUsernameOptions = (users: User[] | undefined): SelectOption[] => {
        const result: SelectOption[] = [];
        if (users == null) {
            return result;
        }
        //alert("pause");
        for (let i = 0; i < users.length; i++) {
            result.push({
                label: '' + users[i].name + "(" + users[i].secondaryUnit + "," + UserPosition.ChineseName.get(users[i].position) + ")",
                value: users[i].username
            });
        }
        return result;
    }


    const teachersUsernameButtonCallback = () => {
        const isSchoolProvinceValid = schoolProvinceSelectRef.current?.validate();
        const isSchoolValid = schoolInputRef.current?.validate();

        if (isSchoolProvinceValid && isSchoolValid) {
            getTeachersHandlerRef.current?.request(teachersFormData);
        } else {
            alert("请检查表单错误");
        }
    }


    const handleAppointmentSummit = (event: { preventDefault: () => void; }) => {
        const isTeacherUsernameValid = teacherUsernameSelectRef.current?.validate();
        const isDescriptionValid = descriptionInputRef.current?.validate();
        const isStartDateValid = startDateInputRef.current?.validate();
        const isStartTimeValid = startTimeInputRef.current?.validate();
        const isEndDateValid = endDateInputRef.current?.validate();
        const isEndTimeValid = endTimeInputRef.current?.validate();
        // 阻止默认提交
        event.preventDefault();
        if (isTeacherUsernameValid && isDescriptionValid && isStartDateValid && isStartTimeValid && isEndDateValid && isEndTimeValid) {

            appointmentFormData.startTime = startDateTime.date + 'T' + startDateTime.time;
            appointmentFormData.endTime = endDateTime.date + 'T' + endDateTime.time;
            appointmentFormData.studentUsername = studentUser?.username == null ? "" : studentUser?.username;
            // console.log("暂停测试：", appointmentFormData);
            // alert("暂停测试");
            addAppointmentHandler.current?.request(appointmentFormData);
        } else {
            alert('请检查表单错误!');
        }
    }


    const addAppointResultDialog = (
        <ResponseHandler
            ref={addAppointmentHandler}
            request={appointmentController.addAppointment}
            setResponseState={setAddAppointmentState}
            idleComponent={<></>}
            loadingComponent={
            <Loading type="dots"
                     text='预约中...'
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
            networkErrorComponent={<Dialog
                autoOpen
                ref={addAppointmentResultDialogRef}
                type="modal"
                title="网络错误"
                showCloseButton
                closeOnBackdropClick
                closeOnEscape
            >
                <div className="layout-flex-column">
                    <p className="text-align-left">详情：{addAppointmentState?.networkError?.message}</p>
                    <br/>
                    <div className="layout-flex-row justify-content-flex-end">
                        <span style={{flexGrow: 3.1}}></span>
                        <Button type="default"
                                style={{flexGrow: 1}} onClick={() => {
                            addAppointmentResultDialogRef.current?.close();
                        }}>返回</Button>
                    </div>
                </div>

            </Dialog>}
            finishedComponent={
                <Dialog
                    autoOpen
                    ref={addAppointmentResultDialogRef}
                    type="modal"
                    title={"预约" + ReturnObject.Status.ChineseName.get(addAppointmentState?.returnObject?.status)}
                    showCloseButton
                    closeOnBackdropClick
                    closeOnEscape
                    onClose={() => {
                        if (addAppointmentState?.returnObject?.status === ReturnObject.Status.SUCCESS) {
                            navigate("/home/main");
                        }
                    }}
                >
                    <div className="layout-flex-column">
                        <p className="text-align-left">{addAppointmentState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "预约成功，即将返主页" : addAppointmentState?.returnObject?.message}</p>
                        <br/>
                        <div className="layout-flex-row justify-content-flex-end">
                            <span style={{flexGrow: 3.1}}></span>
                            <Button type={addAppointmentState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "primary" : "default"}
                                    style={{flexGrow: 1}} onClick={() => {
                                addAppointmentResultDialogRef.current?.close();
                            }}>{addAppointmentState?.returnObject?.status === ReturnObject.Status.SUCCESS ? "确定" : "返回"}</Button>

                        </div>
                    </div>

                </Dialog>
            }

        />);

    return (<div className="layout-flex-column">
            {addAppointResultDialog}
            <form onSubmit={handleAppointmentSummit}>
                <div className="layout-flex-row">
                    <Select
                        ref={schoolProvinceSelectRef}
                        label="学校所在省份"
                        options={User.Options.schoolProvince}
                        onChange={(value) => {
                            setTeachersFormData((prev: any) => ({...prev, schoolProvince: value}));
                            getTeachersHandlerRef.current?.recover();
                        }}
                        placeholder="请选择入学校所在省份"
                        required
                        showSelectAll
                        maxTagCount={2}
                    />&nbsp;&nbsp;&nbsp;
                    <Input
                        ref={schoolInputRef}
                        type="text"
                        label="学校"
                        placeholder="请输入学校名"
                        validationRules={User.ValidationRules.school}
                        onChange={(value) => {
                            setTeachersFormData((prev: any) => ({...prev, school: value}));
                            getTeachersHandlerRef.current?.recover();
                        }
                        }
                        required
                    />
                    &nbsp;&nbsp;&nbsp;
                    <div className="layout-flex-column">
                        <p> </p>
                        <Button type="default" onClick={teachersUsernameButtonCallback}>获取→</Button>
                    </div>

                    &nbsp;&nbsp;&nbsp;
                    <ResponseHandler<{ schoolProvince: number, school: string }, User[]>
                        ref={getTeachersHandlerRef}
                        request={userController.getAllTeachers}
                        setResponseState={setTeachersStates}
                        idleComponent={<Select
                            ref={teacherUsernameSelectRef}
                            options={[]}
                            label="选择咨询师"
                            placeholder="请先选择学校所在省份和填写学校名称"
                            value="请先选择学校所在省份和填写学校名称"
                            required
                            showSelectAll
                            maxTagCount={2}
                            disabled
                        />}
                        loadingComponent={
                            <Select
                                options={[]}
                                ref={teacherUsernameSelectRef}
                                label="选择咨询师"
                                placeholder="查询中，请稍候..."
                                required
                                showSelectAll
                                maxTagCount={2}
                                disabled
                            />
                        }
                        handlingReturnObjectComponent={
                            <Select
                                options={[]}
                                ref={teacherUsernameSelectRef}
                                label="选择咨询师"
                                placeholder="处理查询结果中，请稍候..."
                                required
                                showSelectAll
                                maxTagCount={2}
                                disabled
                            />
                        }
                        networkErrorComponent={<Select
                            options={[]}
                            ref={teacherUsernameSelectRef}
                            label="选择咨询师"
                            //placeholder="网络错误"
                            placeholder={"网络错误" + teachersStates?.networkError?.message}
                            required
                            showSelectAll
                            maxTagCount={2}
                            disabled
                        />}
                        finishedComponent={(!(teachersStates?.returnObject?.status === ReturnObject.Status.SUCCESS)) ? (
                            <Select
                                ref={teacherUsernameSelectRef}
                                label="选择咨询师"
                                options={[]}
                                //placeholder={"查询咨询师"+ReturnObject.Status.ChineseName.get(teachersStates?.returnObject?.status)}
                                placeholder={"查询咨询师" + ReturnObject.Status.ChineseName.get(teachersStates?.returnObject?.status) + ":" + teachersStates?.returnObject?.message}
                                required
                                showSelectAll
                                maxTagCount={2}
                                disabled
                            />
                        ) : (
                            <Select
                                ref={teacherUsernameSelectRef}
                                label="选择咨询师"
                                options={teachersUsernameOptions(teachersStates?.returnObject?.data)}
                                onChange={SelectCallback.handleDataChange<AppointmentRequest>("teacherUsername", setAppointmentFormData, null)}
                                placeholder="请选择咨询师"
                                required
                                showSelectAll
                                maxTagCount={2}
                            />)
                        }
                    />


                </div>
                <Textarea
                    ref={descriptionInputRef}
                    label="预约描述"
                    placeholder="请输入你的问题"
                    onChange={TextareaCallback.handleDataChange<AppointmentRequest>("description", setAppointmentFormData, null)}
                    required
                />

                <div className="layout-flex-row">
                    <DateInput
                        ref={startDateInputRef}
                        label="预约开始日期"
                        placeholder="YYYY-MM-DD"
                        //value={formData.eventDate}
                        format="YYYY-MM-DD"
                        onChange={DateInputCallback.handleDateStringDataChange("date", setStartDateTime, null)}
                        required
                    />
                    &nbsp;&nbsp;&nbsp;
                    <TimeInput
                        ref={startTimeInputRef}
                        label="预约开始时间"
                        placeholder="HH:MM:SS"
                        //value={schedule.meetingTime}
                        required
                        minuteStep={5}
                        //validationRules={businessHoursRule}
                        onChange={TimeInputCallback.handleTimeStringDataChange("time", setStartDateTime, null)}
                    />
                </div>

                <div className="layout-flex-row">
                    <DateInput
                        ref={endDateInputRef}
                        label="预约结束日期"
                        placeholder="YYYY-MM-DD"
                        //value={formData.startDate}
                        format="YYYY-MM-DD"
                        onChange={DateInputCallback.handleDateStringDataChange("date", setEndDateTime, null)}
                        required
                    />
                    &nbsp;&nbsp;&nbsp;
                    <TimeInput
                        ref={endTimeInputRef}
                        label="预约结束时间"
                        placeholder="HH:MM:SS"
                        //value={schedule.meetingTime}
                        required
                        minuteStep={5}
                        //validationRules={businessHoursRule}
                        onChange={TimeInputCallback.handleTimeStringDataChange("time", setEndDateTime, null)}
                    />
                </div>
                <Button type="primary" summit block>申请预约</Button>
            </form>
        </div>
    );
}