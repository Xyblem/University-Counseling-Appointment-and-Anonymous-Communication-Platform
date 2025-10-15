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
import lombok.Data;

import java.util.Date;


@Data
@Entity
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username", name = "username_UNIQUE")
})
public class User {

    @Id
    @Column(name = "username", nullable = false, length = 45)
    private String username;

    @Column(name = "nickname",length = 45)
    private String nickname;

    @Column(name = "description",length = 255)
    private String description;

    @Column(name = "name", nullable = false, length = 6)
    private String name;

    @Column(name = "password", nullable = false, length = 45)
    private String password;

    @Convert(converter = GenderConverter.class)
    @Column(name = "gender", nullable = false, length = 1)
    private Gender gender;

    @Convert(converter = ProvinceCN_Converter.class)
    @Column(name = "school_province", nullable = false, length = 20)
    private ProvinceCN schoolProvince;

    @Column(name = "school", nullable = false, length = 60)
    private String school;

    @Column(name = "secondary_unit", nullable = false, length = 100)
    private String secondaryUnit;

    @Column(name = "major", length = 45)
    private String major;

    @Convert(converter = UserRoleConverter.class)
    @Column(name = "role", nullable = false, length = 1)
    private UserRole role;

    @Convert(converter = UserPositionConverter.class)
    @Column(name = "position", nullable = false, length = 20)
    private UserPosition position;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "phone_number", nullable = false, length = 11)
    private String phoneNumber;

    @Column(name = "qq", length = 20)
    private String qq;

    @Column(name = "wechat", length = 45)
    private String wechat;

    @Column(name = "registration_time")
    private Date registration_time;
}