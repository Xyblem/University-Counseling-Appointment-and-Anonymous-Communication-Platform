package com.ucaacp.backend.entity.DTO;

import com.ucaacp.backend.entity.enums.Gender;
import com.ucaacp.backend.entity.enums.ProvinceCN;
import com.ucaacp.backend.entity.enums.UserPosition;
import com.ucaacp.backend.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String nickname;
    private String description;
    private String name;
    private Gender gender;
    private ProvinceCN schoolProvince;
    private String school;
    private String secondaryUnit;
    private String major;
    private UserRole role;
    private UserPosition position;
    private String email;
    private String phoneNumber;
    private String qq;
    private String wechat;
    private Date registrationTime;

}
