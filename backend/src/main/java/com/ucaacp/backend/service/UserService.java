package com.ucaacp.backend.service;


import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.entity.DTO.UserDTO;
import com.ucaacp.backend.entity.enums.ProvinceCN;
import com.ucaacp.backend.entity.enums.UserRole;
import com.ucaacp.backend.repository.UserRepository;
import com.ucaacp.backend.utils.return_object.ReturnCode;
import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;


    /**
     * 用户登录验证
     */
    public Optional<User> login(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    /**
     * 用户注册
     */
    public User signUp(@Valid User user) {
        return userRepository.save(user);
    }


    /**
     * 检查用户名是否存在
     */
    public boolean exits(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    /**
     * 更新用户密码
    */
    public int updatePassword(String username, String newPassword) {
        return userRepository.updatePassword(username, newPassword);
    }

    /**
     * 注销账号
     */
    public User closeAccount(String username) {
        return userRepository.deleteByUsername(username);
    }


    /**
     * 保存用户
     */
    public User updateUser(@Valid User user) {
        return userRepository.save(user);
    }


    /**
     * 依据学校所在省份和学校查找所有教师（保护用户密码）
     * @param schoolProvince 学校所在省份
     * @param school 学校
     * @return 用户列表
     */
    public List<UserDTO> findAllTeachersBySchoolProvinceAndSchool(ProvinceCN schoolProvince, String school) {
        List<UserDTO> users = userRepository.findUsersByRoleAnAndSchoolProvinceAndAndSchool(UserRole.TEACHER, schoolProvince, school);
        users.forEach(user -> {
           //user.setPassword(null);//保护密码
        });
        return users;
    }

}
