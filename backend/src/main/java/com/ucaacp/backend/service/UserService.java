package com.ucaacp.backend.service;


import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.entity.enums.UserRole;
import com.ucaacp.backend.entity.enums.UserPosition;
import com.ucaacp.backend.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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


//    /**
//     * 保存用户
//     */
//    public User saveUser(User user) {
//        return userRepository.save(user);
//    }
//
//    /**
//     * 根据用户名查找用户
//     */
//    public Optional<User> getUserByUsername(String username) {
//        return userRepository.findByUsername(username);
//    }
//    /**
//     * 检查用户名是否存在
//     */
//    public boolean isUsernameExists(String username) {
//        return userRepository.existsByUsername(username);
//    }
//
//    /**
//     * 检查邮箱是否存在
//     */
//    public boolean isEmailExists(String email) {
//        return userRepository.existsByEmail(email);
//    }
//
//    /**
//     * 更新用户密码
//     */
//    public int updatePassword(String username, String newPassword) {
//        return userRepository.updatePassword(username, newPassword);
//    }
//
//    /**
//     * 根据角色获取用户列表
//     */
//    public List<User> getUsersByRole(UserRole role) {
//        return userRepository.findByRole(role);
//    }
//
//    /**
//     * 分页查询用户
//     */
//    public Page<User> getUsersByPage(Pageable pageable) {
//        return userRepository.findAll(pageable);
//    }
//
//    /**
//     * 删除用户
//     */
//    public void deleteUser(String username) {
//        userRepository.deleteByUsername(username);
//    }
//
//    /**
//     * 批量删除用户
//     */
//    public void deleteUsers(List<String> usernames) {
//        userRepository.deleteAllById(usernames);
//    }
}
