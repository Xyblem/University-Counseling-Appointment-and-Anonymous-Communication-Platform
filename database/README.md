# 数据字典

## 用户表 (user)

### 表说明
用于存储系统用户的基本信息和注册信息

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| username | VARCHAR(45) | NOT NULL | - | 主键，唯一 | 用户名（账号名），长度为8-45个字符，只能为字母、数字和下划线 |
| nickname | VARCHAR(45) | YES | NULL | - | 用户昵称，最多45个字符 |
| description | VARCHAR(255) | YES | NULL | - | 用户描述信息 |
| name | VARCHAR(6) | NOT NULL | - | - | 个人真实姓名，长度为2-6个字符，只能为《通用规范汉字表》中汉字 |
| password | VARCHAR(45) | NOT NULL | - | - | 密码，长度为8-45个字符，只能为字母、数字以及英文感叹号!和英文问号? |
| gender | TINYINT | NOT NULL | - | - | 性别编码[0未知，1男性，2女性，9未指定]，符合国家标准GB 2261-1980 |
| school_province | BIGINT(20) | NOT NULL | - | - | 学校所在省份行政区编码，符合国家标准GB/T2260-2007 |
| school | VARCHAR(60) | NOT NULL | - | - | 所属学校名称，4-60个字符 |
| secondary_unit | VARCHAR(100) | NOT NULL | - | - | 二级单位名称，2-100个字符 |
| major | VARCHAR(45) | YES | NULL | - | 专业名称，长度2-45个字符 |
| role | TINYINT | NOT NULL | - | - | 用户类型编码[0未知，1学生，2教师，3管理员，9未指定] |
| position | VARCHAR(20) | NOT NULL | - | - | 职务，长度2-20个字符，只能是特定枚举值 |
| email | VARCHAR(255) | NOT NULL | - | - | 邮箱地址，最多255个字符 |
| phone_number | VARCHAR(20) | NOT NULL | - | - | 电话号码，20个字符，符合国家标准格式 |
| qq | VARCHAR(20) | YES | NULL | - | QQ账号，长度6-20个字符 |
| wechat | VARCHAR(45) | YES | NULL | - | 微信账号，长度6-20个字符 |
| registration_time | DATETIME | NOT NULL | NOW() | - | 用户注册时间 |

### 约束说明
- **主键**: username
- **唯一约束**: username_UNIQUE (username)
- **检查约束**:
    - chk_username: 用户名格式验证
    - chk_name: 姓名格式验证
    - chk_password: 密码格式验证
    - chk_gender: 性别编码验证
    - chk_school_province: 省份编码验证
    - chk_school: 学校名称长度验证
    - chk_secondary_unit: 二级单位名称长度验证
    - chk_major: 专业名称长度验证
    - chk_identity: 用户类型验证
    - chk_position: 职务枚举值验证
    - chk_email: 邮箱格式验证
    - chk_phone_number: 电话号码格式验证
    - chk_qq: QQ账号长度验证
    - chk_wechat: 微信账号长度验证

---

## 预约表 (appointment)

### 表说明
存储学生与教师的心理咨询预约记录

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| appointment_id | INT | NOT NULL | AUTO_INCREMENT | 主键 | 预约ID，主键自增 |
| student_username | VARCHAR(45) | NOT NULL | - | 外键 | 学生用户名，关联用户表 |
| teacher_username | VARCHAR(45) | NOT NULL | - | 外键 | 教师用户名，关联用户表 |
| description | TEXT | YES | NULL | - | 预约描述信息 |
| start_time | DATETIME | NOT NULL | - | - | 预约开始时间 |
| end_time | DATETIME | NOT NULL | - | - | 预约结束时间 |
| apply_time | DATETIME | NOT NULL | CURRENT_TIMESTAMP | - | 预约申请时间 |
| status | ENUM | NOT NULL | 'RESCHEDULE' | - | 处理状态[PENDING,CONFIRM,REJECT,RESCHEDULE] |

### 约束说明
- **主键**: appointment_id
- **外键约束**:
    - fk_appointment_student: student_username → user(username)
    - fk_appointment_teacher: teacher_username → user(username)
- **检查约束**:
    - chk_apply_time: 申请时间必须小于等于开始时间
    - chk_time_order: 结束时间必须大于开始时间

---

## 帖子表 (post)

### 表说明
存储用户发布的帖子信息

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| post_id | INT | NOT NULL | AUTO_INCREMENT | 主键 | 帖子ID，主键自增 |
| title | VARCHAR(255) | NOT NULL | - | - | 帖子标题 |
| content | TEXT | NOT NULL | - | - | 帖子内容 |
| username | VARCHAR(45) | NOT NULL | - | 外键 | 发布者用户名，关联用户表 |
| publish_time | DATETIME | NOT NULL | CURRENT_TIMESTAMP | - | 发布时间 |
| is_anonymous | TINYINT(1) | NOT NULL | - | - | 是否匿名[0否，1是] |
| is_public | TINYINT(1) | NOT NULL | - | - | 是否公开[0否，1是] |

### 约束说明
- **主键**: post_id
- **外键约束**: fk_post_user: username → user(username)
- **检查约束**:
    - chk_is_anonymous: 匿名标识验证
    - chk_is_public: 公开标识验证

---

## 回帖表 (reply)

### 表说明
存储用户对帖子的回复信息

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| reply_id | INT | NOT NULL | AUTO_INCREMENT | 主键 | 回帖ID，主键自增 |
| content | TEXT | NOT NULL | - | - | 回复内容 |
| post_id | INT | NOT NULL | - | 外键 | 被回复的帖子ID，关联帖子表 |
| username | VARCHAR(45) | NOT NULL | - | 外键 | 回复者用户名，关联用户表 |
| reply_time | DATETIME | NOT NULL | CURRENT_TIMESTAMP | - | 回帖时间 |

### 约束说明
- **主键**: reply_id
- **外键约束**:
    - fk_reply_post: post_id → post(post_id)
    - fk_reply_user: username → user(username)

---

## 帖子举报表 (post_report)

### 表说明
存储用户对论坛帖子的举报记录

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| report_id | INT | NOT NULL | AUTO_INCREMENT | 主键 | 举报记录ID，自增唯一 |
| post_id | INT | NOT NULL | - | 外键 | 被举报的帖子ID，关联帖子表 |
| report_reason | TEXT | NOT NULL | - | - | 举报理由，需详细说明原因 |
| reporter_username | VARCHAR(50) | YES | NULL | 外键 | 举报者用户名，关联用户表 |
| report_time | DATETIME | NOT NULL | CURRENT_TIMESTAMP | - | 举报提交时间 |

### 约束说明
- **主键**: report_id
- **外键约束**:
    - fk_report_post: post_id → post(post_id)
    - fk_report_post_reporter: reporter_username → user(username)

---

## 心理测评记录表 (psych_assessment_record)

### 表说明
存储用户心理测评的记录和结果

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| assessment_id | INT | NOT NULL | AUTO_INCREMENT | 主键 | 测评记录ID，自增唯一 |
| assessment_class | VARCHAR(50) | NOT NULL | - | - | 测评类名（程序标识，如DISCTest） |
| assessment_name | VARCHAR(100) | NOT NULL | - | - | 测评中文名称（用户可见） |
| test_username | VARCHAR(50) | YES | NULL | 外键 | 测试用户名称，关联用户表 |
| assessment_report | TEXT | NOT NULL | - | - | 测评报告（含得分、分析、建议） |
| assessment_time | DATETIME | NOT NULL | CURRENT_TIMESTAMP | - | 测评完成时间 |

### 约束说明
- **主键**: assessment_id
- **外键约束**: fk_assessment_user: test_username → user(username)
- **索引**:
    - idx_assessment_class: assessment_class
    - idx_assessment_time: assessment_time

---

## 心理知识科普表 (psych_knowledge)

### 表说明
存储心理咨询教师发布、心理中心管理员审核的科普内容

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| knowledge_id | INT | NOT NULL | AUTO_INCREMENT | 主键 | 科普ID，自增唯一 |
| title | VARCHAR(255) | NOT NULL | - | - | 科普标题 |
| content | TEXT | NOT NULL | - | - | 科普详细内容 |
| teacher_publisher_username | VARCHAR(45) | NOT NULL | - | 外键 | 发布者用户名，关联用户表 |
| publish_time | DATETIME | NOT NULL | CURRENT_TIMESTAMP | - | 科普发布时间 |
| admin_reviewer_username | VARCHAR(45) | YES | NULL | 外键 | 审核者用户名，关联用户表 |
| review_time | DATETIME | YES | NULL | - | 审核完成时间 |
| review_status | ENUM | NOT NULL | 'PENDING' | - | 审核状态[PENDING,PASSED,BANNED,REVOKED] |

### 约束说明
- **主键**: knowledge_id
- **外键约束**:
    - fk_knowledge_teacher: teacher_publisher_username → user(username)
    - fk_knowledge_admin: admin_reviewer_username → user(username)
- **检查约束**: chk_review_time: 审核时间与状态的一致性验证

---

## 心理知识科普举报表 (psych_knowledge_report)

### 表说明
存储对心理知识科普内容的举报记录

| 字段名 | 数据类型 | 是否为空 | 默认值 | 约束 | 说明 |
|--------|----------|----------|---------|------|------|
| report_id | INT | NOT NULL | AUTO_INCREMENT | 主键 | 举报记录ID，自增唯一 |
| knowledge_id | INT | NOT NULL | - | 外键 | 被举报的科普ID，关联心理知识科普表 |
| report_reason | TEXT | NOT NULL | - | - | 举报理由，需详细说明原因 |
| reporter_username | VARCHAR(50) | YES | NULL | 外键 | 举报者用户名，关联用户表 |
| report_time | DATETIME | NOT NULL | CURRENT_TIMESTAMP | - | 举报提交时间 |

### 约束说明
- **主键**: report_id
- **外键约束**:
    - fk_report_knowledge: knowledge_id → psych_knowledge(knowledge_id)
    - fk_report_reporter: reporter_username → user(username)

---

## 表关系说明

1. **用户表 (user)** 是核心表，其他多个表通过外键关联到该表
2. **预约表 (appointment)** 通过学生和教师用户名关联用户表
3. **帖子表 (post)** 和 **回帖表 (reply)** 通过用户名关联用户表
4. **举报表** 通过用户名关联用户表，通过帖子ID/科普ID关联相应内容表
5. **心理测评记录表** 通过用户名关联用户表
6. **心理知识科普表** 通过发布者和审核者用户名关联用户表

---

## 编码标准说明

- **性别编码**: 遵循国家标准 GB 2261-1980
- **行政区编码**: 遵循国家标准 GB/T2260-2007
- **字符集**: UTF-8MB4
- **排序规则**: utf8mb4_0900_ai_ci
- **存储引擎**: InnoDB