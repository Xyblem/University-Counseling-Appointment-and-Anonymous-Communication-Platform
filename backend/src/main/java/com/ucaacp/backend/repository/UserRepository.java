package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.entity.DTO.UserDTO;
import com.ucaacp.backend.entity.enums.ProvinceCN;
import com.ucaacp.backend.entity.enums.UserRole;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    /**
     * 根据用户名查找用户（由于username是主键，等同于findById）
     */
    Optional<User> findByUsername(String username);

    /**
     * 根据用户名和密码查找用户（用于登录验证）
     */
    Optional<User> findByUsernameAndPassword(String username, String password);
    /**
     * 更新用户密码
     */
    @Modifying
    @Query("UPDATE User u SET u.password = :password WHERE u.username = :username")
    int updatePassword(@Param("username") String username, @Param("password") String password);

    /**
     * 删除用户（由于username是主键，等同于deleteById）
     */
    User deleteByUsername(String username);

    /**
     * 更新用户信息
     */
    //int updateUserByUsername(User user);



    @Modifying
    @Query("SELECT new com.ucaacp.backend.entity.DTO.UserDTO(u.username,u.nickname,u.description,u.name,u.gender,u.schoolProvince,u.school,u.secondaryUnit,u.major,u.role,u.position,u.email,u.phoneNumber,u.qq,u.wechat,u.registrationTime) FROM User u WHERE u.role=:role AND u.schoolProvince=:schoolProvince AND u.school=:school")
    List<UserDTO> findUsersByRoleAnAndSchoolProvinceAndAndSchool(@Param("role")UserRole role, @Param("schoolProvince")ProvinceCN schoolProvince, @Param("school")String school);


}
