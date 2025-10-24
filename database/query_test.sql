USE `UCAACP`;
-- 需要SQL版本5.0及以上
SELECT VERSION();

SELECT * FROM `user`;


DELETE FROM `user` WHERE TRUE;

SELECT
    `post_id`,
    `title`,
    `content`,
    CASE
        WHEN `is_anonymous` = 1 THEN '匿名用户'
        WHEN `nickname` IS NOT NULL AND `nickname` != '' THEN `nickname`
        ELSE `user`.`username`
        END AS 'display_name',
    CASE
        WHEN `is_anonymous` = 1 THEN NULL
        ELSE `user`.`username`
        END AS 'username',
    `is_anonymous`,
    `is_public`,
    `publish_time`
FROM `post`
         JOIN `user` ON `post`.`username` = `user`.`username`
WHERE `is_public` = 1
ORDER BY `publish_time` DESC;



SELECT `reply_id`,`content`,`post_id`,
       CASE WHEN `nickname` IS NOT NULL AND `nickname` != '' THEN `nickname`
            ELSE `user`.`username`
           END AS 'display_name',
       `user`.`username`,`reply_time`
FROM `reply` JOIN `user` ON `reply`.`username` = `user`.`username`
ORDER BY `reply_time` DESC;
;



SELECT * FROM `user` WHERE `role`=2 AND `school_province`=340000 AND `school`='安徽大学';

SELECT `appointment_id`,
       `student_username`,
       `stu`.`name` AS `student_name`,
       `teacher_username`,
       `tea`.`name` AS `teacher_name`,
       `appointment`.`description`,`start_time`,`end_time`,`apply_time`,`status`
FROM `appointment`
         LEFT JOIN `user` AS `stu` ON `appointment`.`student_username` = `stu`.`username`
         LEFT JOIN `user` AS `tea` ON `appointment`.`teacher_username` = `tea`.`username`
WHERE `student_username`='stu2022007';


SELECT `assessment_id`,`assessment_class`,`assessment_name`,`test_username`,
       `user`.`name`,
       `assessment_report`,`assessment_time`
FROM `psych_assessment_record`
JOIN `user` ON `psych_assessment_record`.`test_username` = `user`.`username`
WHERE `test_username`='stu2022007';
