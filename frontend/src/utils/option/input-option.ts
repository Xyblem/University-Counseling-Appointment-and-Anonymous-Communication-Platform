//自定义配置
import {Option} from "../../components/ui/widget/InputField";
import {
    Gender,
    GenderNamesCN,
    ProvinceCN,
    ProvinceCN_NamesCN,
    UserPosition,
    UserPositionNamesCN,
    UserRole,
    UserRoleNamesCN
} from "../../entity/enums/enums";

//性别选项
export const genderOptions: Option[] = [
    { label: ''+GenderNamesCN.get(Gender.MALE), value: Gender.MALE.toString() },
    { label: ''+GenderNamesCN.get(Gender.FEMALE), value: Gender.FEMALE.toString() },
    { label: ''+GenderNamesCN.get(Gender.OTHER), value: Gender.OTHER.toString() }
];

//用户角色选项
export const userRoleOptions: Option[] = [
    {label: ''+UserRoleNamesCN.get(UserRole.STUDENT), value: UserRole.STUDENT.toString()},
    {label: ''+UserRoleNamesCN.get(UserRole.TEACHER), value: UserRole.TEACHER.toString()},
    {label: ''+UserRoleNamesCN.get(UserRole.ADMIN), value: UserRole.ADMIN.toString()}
];

//职务选项
export const userPositionOptions: Option[] = [
    { label: ''+UserPositionNamesCN.get(UserPosition.STUDENT), value: UserPosition.STUDENT.toString() },
    { label: ''+UserPositionNamesCN.get(UserPosition.PSYCHOLOGICAL_COUNSELING_STAFF), value: UserPosition.PSYCHOLOGICAL_COUNSELING_STAFF.toString() },
    { label: ''+UserPositionNamesCN.get(UserPosition.HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT), value: UserPosition.HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT.toString() },
    { label: ''+UserPositionNamesCN.get(UserPosition.NON_PSYCHOLOGICAL_DEPARTMENT_STAFF), value: UserPosition.NON_PSYCHOLOGICAL_DEPARTMENT_STAFF.toString() }
]

//省级行政区选项
export const provinceOptions: Option[] = [];

for(let province in ProvinceCN){
    if (isNaN(Number(province))) {
        continue;
    }
    provinceOptions.push({label: ''+ProvinceCN_NamesCN.get(Number(province)), value: province.toString()});
}



