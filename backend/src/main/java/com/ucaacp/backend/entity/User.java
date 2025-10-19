package com.ucaacp.backend.entity;

import com.ucaacp.backend.entity.attribute_converter.GenderConverter;
import com.ucaacp.backend.entity.attribute_converter.ProvinceCN_Converter;
import com.ucaacp.backend.entity.attribute_converter.UserPositionConverter;
import com.ucaacp.backend.entity.attribute_converter.UserRoleConverter;
import com.ucaacp.backend.entity.enums.Gender;
import com.ucaacp.backend.entity.enums.ProvinceCN;
import com.ucaacp.backend.entity.enums.UserPosition;
import com.ucaacp.backend.entity.enums.UserRole;
import jakarta.persistence.*;
import jakarta.validation.Constraint;
import jakarta.validation.constraints.*;


import lombok.Data;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Data
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username", name = "username_UNIQUE")
})
public class User {

    @Id
    @NotNull(message = "用户名不能为null")
    @Size(min=8,max=45,message = "用户名名长度必须在8-45之间")
    @Pattern(regexp = "^[A-Za-z0-9_]+$",message = "用户名只能为字母、数字和下划线")
    @Column(name = "username", nullable = false, length = 45)
    private String username;

    @Size(max=45,message = "用户昵称长度不能超过45个字符")
    @Column(name = "nickname",length = 45)
    private String nickname;

    @Size(max=255,message = "用户描述不能超过255个字符")
    @Column(name = "description",length = 255)
    private String description;

    @NotNull(message = "姓名不能为null")
    @Size(min=2,max=6,message = "姓名长度必须在2-6之间")
    @Pattern(regexp = "^[\\x{4E00}-\\x{9FA5}\\x{3400}-\\x{4DBF}]+$",message = "姓名只能为《通用规范汉字表》中汉字，符合国家标准【姓名登记条例】")
    @Column(name = "name", nullable = false, length = 6)
    private String name;

    @NotNull(message = "密码不能为null")
    @Size(min=8,max=45,message = "密码长度必须在8-45之间")
    @Pattern(regexp = "^[A-Za-z0-9!?]+$",message = "密码只能为字母、数字以及英文感叹号!和英文问号?")
    @Column(name = "password", nullable = false, length = 45)
    private String password;

    @NotNull(message = "性别不能为null")
    @Convert(converter = GenderConverter.class)
    @Column(name = "gender", nullable = false, length = 1)
    private Gender gender;

    @NotNull(message = "学校所在省份不能为null")
    @Convert(converter = ProvinceCN_Converter.class)
    @Column(name = "school_province", nullable = false, length = 20)
    private ProvinceCN schoolProvince;

    @NotNull(message = "学校名称不能为null")
    @Size(min=4,max=60,message = "学校名称长度必须在4-60之间")
    @Column(name = "school", nullable = false, length = 60)
    private String school;

    @NotNull(message = "二级单位名称不能为null")
    @Size(min=2,max=100,message = "二级单位名称长度必须在2-100之间")
    @Column(name = "secondary_unit", nullable = false, length = 100)
    private String secondaryUnit;


    @Size(min=2,max=45,message = "专业名称长度必须在2-45之间")
    @Column(name = "major", length = 45)
    private String major;

    @NotNull(message = "用户类型不能为null")
    @Convert(converter = UserRoleConverter.class)
    @Column(name = "role", nullable = false, length = 1)
    private UserRole role;

    @NotNull(message = "职务不能为null")
    @Convert(converter = UserPositionConverter.class)
    @Column(name = "position", nullable = false, length = 20)
    private UserPosition position;

    @NotNull(message = "邮箱不能为null")
    @Size(max=255,message = "邮箱长度不能超过255个字符")
    @Email(message = "邮箱格式错误")
    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @NotNull(message = "电话号码不能为null")
    @Size(max=20,message = "电话号码长度不能超过20个字符")
    @Pattern(regexp = "^[\\+]?[0-9]{0,3}[\\-]?(13|14|15|16|17|18|19)[0-9]{9}|0\\d{2,3}-\\d{7,8}|^0\\d{2,3}-\\d{7,8}-\\d{1,4}$",message = "电话号码格式错误")
    @Column(name = "phone_number", nullable = false, length = 11)
    private String phoneNumber;

    @Size(min=6,max = 20,message = "QQ账号长度必须在6-20之间")
    @Column(name = "qq", length = 20)
    private String qq;


    @Size(min=6,max = 20,message = "微信账号长度必须在6-20之间")
    @Column(name = "wechat", length = 45)
    private String wechat;

    @NotNull(message = "注册时间不能为null")
    @Column(name = "registration_time")
    private Date registrationTime;


    public Map<String,String> getReturnData(){
        Map<String,String> map = new HashMap<>();
        map.put("username",username);
        map.put("nickname",nickname);
        map.put("password",password);
        map.put("name",name);
        map.put("description",description);
        map.put("gender",gender.getCode().toString());
        map.put("schoolProvince",schoolProvince.getCode().toString());
        map.put("school",school);
        map.put("secondaryUnit",secondaryUnit);
        map.put("major",major);
        map.put("role",role.getCode().toString());
        map.put("position",position.getValue());
        map.put("email",email);
        map.put("phoneNumber",phoneNumber);
        map.put("qq",qq);
        map.put("wechat",wechat);
        map.put("registrationTime",registrationTime.toString());
        return map;
    }

}