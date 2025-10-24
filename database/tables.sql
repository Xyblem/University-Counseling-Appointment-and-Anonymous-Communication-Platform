USE `UCAACP`;
-- 需要SQL版本5.0及以上
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+08:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 用户表`user`
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
                        `username` VARCHAR(45) NOT NULL COMMENT '用户名（账号名）',-- 用户名长度为8-45个字符
                        `nickname` VARCHAR(45) DEFAULT NULL COMMENT '昵称',-- 用户昵称最多45个字符(可以为NULL)
                        `description`  VARCHAR(255) DEFAULT NULL COMMENT '描述',-- 用户描述(可以为NULL)
                        `name` VARCHAR(6) NOT NULL COMMENT '姓名（个人真实姓名）',-- 姓名长度为2-6个字符
                        `password` VARCHAR(45) NOT NULL COMMENT '密码',-- 密码长度为8-45个字符
                        `gender` TINYINT NOT NULL COMMENT '性别',-- 性别编码
                        `school_province` BIGINT(20) NOT NULL COMMENT '学校所在省份',-- 行政区编码
                        `school` VARCHAR(60) NOT NULL COMMENT '所属学校',-- 学校名称4-60个字符
                        `secondary_unit` VARCHAR(100) NOT NULL COMMENT '二级单位',-- 二级单位名称2-100个字符
                        `major` VARCHAR(45) DEFAULT NULL COMMENT '专业',-- 专业名称长度2-45个字符(可以为NULL)
                        `role` TINYINT NOT NULL COMMENT '用户类型',-- 用户类型编码
                        `position` VARCHAR(20) NOT NULL COMMENT '职务',-- 职务长度2-20个字符
                        `email` VARCHAR(255) NOT NULL COMMENT '邮箱',-- 邮箱长度最多255个字符
                        `phone_number` VARCHAR(20) NOT NULL COMMENT '电话号码',-- 电话号码长度20个字符
                        `qq` VARCHAR(20) DEFAULT NULL COMMENT 'QQ账号',-- QQ账号长度6-20个字符(可以为NULL)
                        `wechat` VARCHAR(45) DEFAULT NULL COMMENT '微信账号',-- 微信账号长度6-20个字符(可以为NULL)
                        `registration_time` DATETIME NOT NULL DEFAULT NOW() COMMENT '注册时间',-- 注册时间
                        PRIMARY KEY (`username`),-- 用户名为主码
                        UNIQUE KEY `username_UNIQUE` (`username`),-- 用户名唯一
                        -- 用户名验证：用户名长度为8-45个字符，只能为字母、数字和下划线
                        CONSTRAINT `chk_username` CHECK((`username` REGEXP '^[A-Za-z0-9_]+$')AND(CHAR_LENGTH(`username`)>=8)),
                        -- 姓名验证：姓名长度为2-6个字符，只能为《通用规范汉字表》中汉字，符合国家标准【姓名登记条例】
                        CONSTRAINT `chk_name` CHECK((`name` REGEXP '^[\\x{4E00}-\\x{9FA5}\\x{3400}-\\x{4DBF}]+$')AND(CHAR_LENGTH(`name`)>=2)),
                        -- 密码验证：密码长度为8-45个字符，只能为字母、数字以及英文感叹号!和英文问号?
                        CONSTRAINT `chk_password` CHECK ((`password`REGEXP '^[A-Za-z0-9!?]+$')AND(CHAR_LENGTH(`password`)>=8)),
                        -- 性别验证：使用国家性别编码[0未知，1男性，2女性，9未指定(其他)]，符合国家标准【中华人民共和国国家标准:人的性别代码(GB 2261-1980)】
                        CONSTRAINT `chk_gender` CHECK ((`gender` in (0,1,2,9))),
                        -- 学校所在省份验证：使用行政区编码，符合国家标准【中华人民共和国行政区划代码(GB/T2260-2007)】
                        CONSTRAINT `chk_school_province` CHECK((`school_province` in (110000,120000,130000,140000,150000,210000,220000,230000,310000,320000,330000,340000,350000,360000,370000,410000,420000,430000,440000,450000,500000,510000,520000,530000,540000,610000,620000,630000,640000,650000,710000,810000,820000))),
                        -- 学校验证：学校名称4-60个字符
                        CONSTRAINT `chk_school` CHECK((CHAR_LENGTH(`school`)>=4)),
                        -- 二级单位验证：二级单位名称2-100个字符
                        CONSTRAINT `chk_secondary_unit` CHECK((CHAR_LENGTH(`secondary_unit`)>=2)),
                        -- 专业验证：专业名称长度2-45个字符
                        CONSTRAINT `chk_major` CHECK((`major` IS NULL)OR(CHAR_LENGTH(`major`)>=2)),
                        -- 用户类型验证：使用本项目的用户类型编码[0未知，1学生，2(心理咨询)教师 3(学校心理中心)管理员 9未指定(其他)]，参考【2022级软件工程+软件工程综合实践+项目选题】
                        CONSTRAINT `chk_identity` CHECK ((`role` in (0,1,2,3,9))),
                        -- 职务验证：职务长度2-20个字符，只能是['未指定','学生','心理部咨询员','心理部负责人','非心理部教职工']
                        CONSTRAINT `chk_position` CHECK ((`position` in (_utf8mb4'未指定',_utf8mb4'学生',_utf8mb4'心理部咨询员',_utf8mb4'心理部负责人',_utf8mb4'非心理部教职工'))),
                        -- 邮箱验证：邮箱长度最多255个字符，且符合邮箱格式
                        CONSTRAINT `chk_email` CHECK (`email` REGEXP '^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$'),
                        -- 电话号码验证：电话号码长度20个字符，且符合电话号码格式，符合国家标准。
                        CONSTRAINT `chk_phone_number` CHECK(`phone_number` REGEXP '^[\+]?[0-9]{0,3}[\-]?(13|14|15|16|17|18|19)[0-9]{9}|0\d{2,3}-\d{7,8}|^0\d{2,3}-\d{7,8}-\d{1,4}$'),
                        -- QQ账号验证：QQ账号长度6-20个字符
                        CONSTRAINT `chk_qq` CHECK((`qq` IS NULL)OR(CHAR_LENGTH(`qq`)>=6)),
                        -- 微信账号验证：微信账号长度6-20个字符
                        CONSTRAINT `chk_wechat` CHECK((`wechat` IS NULL)OR(CHAR_LENGTH(`wechat`)>=6))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表（用于注册和登录）';





DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
                               `appointment_id` int NOT NULL AUTO_INCREMENT COMMENT '预约ID，主键自增',
                               `student_username` varchar(45) NOT NULL COMMENT '学生用户名（外键关联用户表）',
                               `teacher_username` varchar(45) NOT NULL COMMENT '教师用户名（外键关联用户表）',
                               `description` text COMMENT '预约描述',
                               `start_time` datetime NOT NULL COMMENT '预约开始时间',
                               `end_time` datetime NOT NULL COMMENT '预约结束时间',
                               `apply_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '预约申请时间',
                               `status` enum('PENDING','CONFIRM','REJECT','RESCHEDULE') NOT NULL DEFAULT 'RESCHEDULE' COMMENT '处理状态',
                               PRIMARY KEY (`appointment_id`),
                               KEY `fk_appointment_student` (`student_username`),
                               KEY `fk_appointment_teacher` (`teacher_username`),
                               CONSTRAINT `fk_appointment_student` FOREIGN KEY (`student_username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT `fk_appointment_teacher` FOREIGN KEY (`teacher_username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT `chk_apply_time` CHECK ((`apply_time` <= `start_time`)),
                               CONSTRAINT `chk_time_order` CHECK ((`end_time` > `start_time`))
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='预约表（学生与教师的预约记录）';
/*!40101 SET character_set_client = @saved_cs_client */;






DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
                        `post_id` int NOT NULL AUTO_INCREMENT COMMENT '帖子ID，主键自增',
                        `title` varchar(255) NOT NULL COMMENT '帖子标题',
                        `content` text NOT NULL COMMENT '帖子内容',
                        `username` varchar(45) NOT NULL COMMENT '发布者用户名，关联用户表',
                        `publish_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间，默认当前时间',
                        `is_anonymous` tinyint(1) NOT NULL COMMENT '是否匿名（0：否，1：是）',
                        `is_public` tinyint(1) NOT NULL COMMENT '是否公开（0：否，1：是）',
                        PRIMARY KEY (`post_id`),
                        KEY `fk_post_user` (`username`),
                        CONSTRAINT `fk_post_user` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
                        CONSTRAINT `chk_is_anonymous` CHECK ((`is_anonymous` in (0,1))),
                        CONSTRAINT `chk_is_public` CHECK ((`is_public` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='帖子表（存储用户发布的帖子信息）';
/*!40101 SET character_set_client = @saved_cs_client */;



DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
                         `reply_id` int NOT NULL AUTO_INCREMENT COMMENT '回帖ID，主键自增',
                         `content` text NOT NULL COMMENT '回复内容',
                         `post_id` int NOT NULL COMMENT '被回复的帖子ID，关联帖子表',
                         `username` varchar(45) NOT NULL COMMENT '回复者用户名，关联用户表',
                         `reply_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '回帖时间',
                         PRIMARY KEY (`reply_id`),
                         KEY `fk_reply_post` (`post_id`),
                         KEY `fk_reply_user` (`username`),
                         CONSTRAINT `fk_reply_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
                         CONSTRAINT `fk_reply_user` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='回帖表（存储用户对帖子的回复信息）';
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `post_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_report` (
                               `report_id` int NOT NULL AUTO_INCREMENT COMMENT '举报记录ID（主键），自增唯一',
                               `post_id` int NOT NULL COMMENT '被举报的帖子ID，关联post表的post_id',
                               `report_reason` text NOT NULL COMMENT '举报理由（非空，需详细说明原因）',
                               `reporter_username` varchar(50) DEFAULT NULL COMMENT '举报者用户名，关联user表的username',
                               `report_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '举报提交时间，默认当前时间',
                               PRIMARY KEY (`report_id`),
                               KEY `fk_report_post` (`post_id`),
                               KEY `fk_report_post_reporter` (`reporter_username`),
                               CONSTRAINT `fk_report_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
                               CONSTRAINT `fk_report_post_reporter` FOREIGN KEY (`reporter_username`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='举报帖子表：存储用户对论坛/社区帖子内容的举报记录';



DROP TABLE IF EXISTS `psych_assessment_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psych_assessment_record` (
                                           `assessment_id` int NOT NULL AUTO_INCREMENT COMMENT '测评记录ID（主键），自增唯一',
                                           `assessment_class` varchar(50) NOT NULL COMMENT '测评类名（程序标识，如DISCTest）',
                                           `assessment_name` varchar(100) NOT NULL COMMENT '测评中文名称（用户可见）',
                                           `test_username` varchar(50) DEFAULT NULL COMMENT '测试用户名称（关联user表username）',
                                           `assessment_report` text NOT NULL COMMENT '测评报告（含得分、分析、建议）',
                                           `assessment_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '测评完成时间',
                                           PRIMARY KEY (`assessment_id`),
                                           KEY `fk_assessment_user` (`test_username`),
                                           KEY `idx_assessment_class` (`assessment_class`),
                                           KEY `idx_assessment_time` (`assessment_time`),
                                           CONSTRAINT `fk_assessment_user` FOREIGN KEY (`test_username`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='心理测评记录表（含测试用户外键，关联user表）';
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `psych_knowledge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psych_knowledge` (
                                   `knowledge_id` int NOT NULL AUTO_INCREMENT COMMENT '科普ID（主键），自增唯一',
                                   `title` varchar(255) NOT NULL COMMENT '科普标题（非空，如“大学生常见焦虑应对方法”）',
                                   `content` text NOT NULL COMMENT '科普详细内容（非空，含心理知识、案例、建议等）',
                                   `teacher_publisher_username` varchar(45) NOT NULL COMMENT '发布者（心理咨询教师）用户名，关联user表',
                                   `publish_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '科普发布时间，默认当前系统时间',
                                   `admin_reviewer_username` varchar(45) DEFAULT NULL COMMENT '审核者（心理中心管理员）用户名，关联user表',
                                   `review_time` datetime DEFAULT NULL COMMENT '审核完成时间，未审核时为NULL',
                                   `review_status` enum('PENDING','PASSED','BANNED','REVOKED') NOT NULL DEFAULT 'PENDING' COMMENT '审核状态：PENDING(待审核)、PASSED(审核通过)、BANNED(审核驳回)、REVOKED(已撤销)',
                                   PRIMARY KEY (`knowledge_id`),
                                   KEY `fk_knowledge_teacher` (`teacher_publisher_username`),
                                   KEY `fk_knowledge_admin` (`admin_reviewer_username`),
                                   CONSTRAINT `fk_knowledge_admin` FOREIGN KEY (`admin_reviewer_username`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE,
                                   CONSTRAINT `fk_knowledge_teacher` FOREIGN KEY (`teacher_publisher_username`) REFERENCES `user` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE,
                                   CONSTRAINT `chk_review_time` CHECK ((((`review_status` in (_utf8mb3'PENDING',_utf8mb3'REVOKED')) and (`review_time` is null)) or ((`review_status` in (_utf8mb3'PASSED',_utf8mb3'BANNED')) and (`review_time` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='心理知识科普表：存储心理咨询教师发布、心理中心管理员审核的科普内容';


DROP TABLE IF EXISTS `psych_knowledge_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `psych_knowledge_report` (
                                          `report_id` int NOT NULL AUTO_INCREMENT COMMENT '举报记录ID（主键），自增唯一',
                                          `knowledge_id` int NOT NULL COMMENT '被举报的科普ID，关联psych_knowledge表的knowledge_id',
                                          `report_reason` text NOT NULL COMMENT '举报理由（非空，需详细说明原因）',
                                          `reporter_username` varchar(50) DEFAULT NULL COMMENT '举报者用户名，关联user表的username（主键），允许为NULL',
                                          `report_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '举报提交时间，默认当前时间',
                                          PRIMARY KEY (`report_id`),
                                          KEY `fk_report_knowledge` (`knowledge_id`),
                                          KEY `fk_report_reporter` (`reporter_username`),
                                          CONSTRAINT `fk_report_knowledge` FOREIGN KEY (`knowledge_id`) REFERENCES `psych_knowledge` (`knowledge_id`) ON DELETE CASCADE ON UPDATE CASCADE,
                                          CONSTRAINT `fk_report_reporter` FOREIGN KEY (`reporter_username`) REFERENCES `user` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='心理知识科普举报表（解决1830错误：允许reporter_username为NULL以适配ON DELETE SET NULL）';




/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;