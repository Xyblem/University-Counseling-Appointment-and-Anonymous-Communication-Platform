

/**
 * 性别枚举
 * 使用国家性别编码[0未知，1男性，2女性，9未指定(其他)]，符合国家标准【中华人民共和国国家标准:人的性别代码(GB 2261-1980)】
 */
export enum Gender {
    UNKNOWN=0,
    MALE,
    FEMALE,
    OTHER=9
}

/**
 * 根据性别枚举(性别编码获取性别名称)
 */
export let GenderNamesCN=new Map<Gender,string>([
    [Gender.UNKNOWN,"未知"],
    [Gender.MALE,"男"],
    [Gender.FEMALE,"女"],
    [Gender.OTHER,"其他"]
]);

/**
 * 用户角色枚举使用本项目的用户类型编码[0未知，1学生，2(心理咨询)教师 3(学校心理中心)管理员 9未指定(其他)]，参考【2022级软件工程+软件工程综合实践+项目选题】
 */
export enum UserRole {
    UNKNOWN=0,
    STUDENT,
    TEACHER,
    ADMIN,
    OTHER=9
}

/**
 * 根据用户角色枚举(用户角色编码获取用户角色名称)
 */
export let UserRoleNamesCN=new Map<UserRole,string>([
    [UserRole.UNKNOWN,"未知"],
    [UserRole.STUDENT,"学生"],
    [UserRole.TEACHER,"教师"],
    [UserRole.ADMIN,"管理员"],
    [UserRole.OTHER,"其他"]
]);

/**
 * 用户职务枚举
 * 职务长度2-20个字符，只能是['未指定','学生','心理部咨询员','心理部负责人','非心理部教职工']
 */
export enum UserPosition {
    UNKNOWN="未指定",
    STUDENT="学生",
    PSYCHOLOGICAL_COUNSELING_STAFF="心理部咨询员",
    HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT="心理部负责人",
    NON_PSYCHOLOGICAL_DEPARTMENT_STAFF="非心理部教职工"
}
/**
 * 根据用户职务枚举(用户职务名称获取用户职务名称)
 */
export let UserPositionNamesCN=new Map<UserPosition,string>([
    [UserPosition.UNKNOWN,"未指定"],
    [UserPosition.STUDENT,"学生"],
    [UserPosition.PSYCHOLOGICAL_COUNSELING_STAFF,"心理部咨询员"],
    [UserPosition.HEAD_OF_THE_PSYCHOLOGICAL_DEPARTMENT,"心理部负责人"],
    [UserPosition.NON_PSYCHOLOGICAL_DEPARTMENT_STAFF,"非心理部教职工"]
]);


/**
 * 中国省级行政区枚举
 * 包含编码、中文名称及英文名称
 * 编码参考行政区域名标准，英文名称遵循国家规定的汉语拼音拼写规范
 * 符合国家标准【中华人民共和国行政区划代码(GB/T2260-2007)】
 * @see <a href="https://www.thepaper.cn/newsDetail_forward_14168547">民政部关于行政区划英文拼写的答复</a>
 */
export enum ProvinceCN {
    BEIJING=110000,
    TIANJIN=120000,
    HEBEI=130000,
    SHANXI_14=140000,
    INNER_MONGOLIA=150000,
    LIAONING=210000,
    JILIN=220000,
    HEILONGJIANG=230000,
    SHANGHAI=310000,
    JIANGSU=320000,
    ZHEJIANG=330000,
    ANHUI=340000,
    FUJIAN=350000,
    JIANGXI=360000,
    SHANDONG=370000,
    HENAN=410000,
    HUBEI=420000,
    HUNAN=430000,
    GUANGDONG=440000,
    GUANGXI=450000,
    HAINAN=460000,
    CHONGQING=500000,
    SICHUAN=510000,
    GUIZHOU=520000,
    YUNNAN=530000,
    TIBET=540000,
    SHAANXI=610000,
    GANSU=620000,
    QINGHAI=630000,
    NINGXIA=640000,
    XINJIANG=650000,
    TAIPEI=710000,
    HONG_KONG=810000,
    MACAO=820000
}

/**
 * 根据省级行政区枚举(省级行政区编码获取省级行政区名称)
 */
export let ProvinceCN_NamesCN=new Map<ProvinceCN,string>([
    [ProvinceCN.BEIJING,"北京市"],
    [ProvinceCN.TIANJIN,"天津市"],
    [ProvinceCN.HEBEI,"河北省"],
    [ProvinceCN.SHANXI_14,"山西省"],
    [ProvinceCN.INNER_MONGOLIA,"内蒙古自治区"],
    [ProvinceCN.LIAONING,"辽宁省"],
    [ProvinceCN.JILIN,"吉林省"],
    [ProvinceCN.HEILONGJIANG,"黑龙江省"],
    [ProvinceCN.SHANGHAI,"上海市"],
    [ProvinceCN.JIANGSU,"江苏省"],
    [ProvinceCN.ZHEJIANG,"浙江省"],
    [ProvinceCN.ANHUI,"安徽省"],
    [ProvinceCN.FUJIAN,"福建省"],
    [ProvinceCN.JIANGXI,"江西省"],
    [ProvinceCN.SHANDONG,"山东省"],
    [ProvinceCN.HENAN,"河南省"],
    [ProvinceCN.HUBEI,"湖北省"],
    [ProvinceCN.HUNAN,"湖南省"],
    [ProvinceCN.GUANGDONG,"广东省"],
    [ProvinceCN.GUANGXI,"广西壮族自治区"],
    [ProvinceCN.HAINAN,"海南省"],
    [ProvinceCN.CHONGQING,"重庆市"],
    [ProvinceCN.SICHUAN,"四川省"],
    [ProvinceCN.GUIZHOU,"贵州省"],
    [ProvinceCN.YUNNAN,"云南省"],
    [ProvinceCN.TIBET,"西藏自治区"],
    [ProvinceCN.SHAANXI,"陕西省"],
    [ProvinceCN.GANSU,"甘肃省"],
    [ProvinceCN.QINGHAI,"青海省"],
    [ProvinceCN.NINGXIA,"宁夏回族自治区"],
    [ProvinceCN.XINJIANG,"新疆维吾尔自治区"],
    [ProvinceCN.TAIPEI,"台湾省"],
    [ProvinceCN.HONG_KONG,"香港特别行政区"],
    [ProvinceCN.MACAO,"澳门特别行政区"]
]);


