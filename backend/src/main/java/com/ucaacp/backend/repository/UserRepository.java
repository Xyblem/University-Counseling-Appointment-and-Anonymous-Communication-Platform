package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.User;
import com.ucaacp.backend.entity.enums.Gender;
import com.ucaacp.backend.entity.enums.UserRole;
import com.ucaacp.backend.entity.enums.UserPosition;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // 基本的CRUD操作由JpaRepository自动提供
//
//    /**
//     * 根据用户名查找用户（由于username是主键，等同于findById）
//     */
//    Optional<User> findByUsername(String username);
//
//    /**
//     * 根据姓名查找用户
//     */
//    List<User> findByName(String name);
//
//    /**
//     * 根据姓名模糊查询
//     */
//    List<User> findByNameContaining(String name);
//
//    /**
//     * 根据角色查找用户
//     */
//    List<User> findByRole(UserRole role);
//
//    /**
//     * 根据职位查找用户
//     */
//    List<User> findByPosition(UserPosition position);
//
//    /**
//     * 根据性别查找用户
//     */
//    List<User> findByGender(Gender gender);
//
//    /**
//     * 根据学校查找用户
//     */
//    List<User> findBySchool(String school);
//
//    /**
//     * 根据学校所在省份查找用户
//     */
//    List<User> findBySchoolProvince(String schoolProvince);
//
//    /**
//     * 根据邮箱查找用户
//     */
//    Optional<User> findByEmail(String email);
//
//    /**
//     * 根据手机号查找用户
//     */
//    Optional<User> findByPhoneNumber(String phoneNumber);
//
//    /**
//     * 根据QQ号查找用户
//     */
//    Optional<User> findByQq(String qq);
//
//    /**
//     * 根据微信号查找用户
//     */
//    Optional<User> findByWechat(String wechat);
//
//    /**
//     * 根据二级单位查找用户
//     */
//    List<User> findBySecondaryUnit(String secondaryUnit);
//
//    /**
//     * 根据专业查找用户
//     */
//    List<User> findByMajor(String major);
//
//    /**
//     * 检查用户名是否存在
//     */
//    boolean existsByUsername(String username);
//
//    /**
//     * 检查邮箱是否存在
//     */
//    boolean existsByEmail(String email);
//
//    /**
//     * 检查手机号是否存在
//     */
//    boolean existsByPhoneNumber(String phoneNumber);
//
//    /**
//     * 根据角色和学校查找用户
//     */
//    List<User> findByRoleAndSchool(UserRole role, String school);
//
//    /**
//     * 根据角色和职位查找用户
//     */
//    List<User> findByRoleAndPosition(UserRole role, UserPosition position);
//
//    /**
//     * 根据学校和专业查找用户
//     */
//    List<User> findBySchoolAndMajor(String school, String major);
//
//    /**
//     * 分页查询所有用户
//     */
//    Page<User> findAll(Pageable pageable);
//
//    /**
//     * 根据角色分页查询用户
//     */
//    Page<User> findByRole(UserRole role, Pageable pageable);
//
//    /**
//     * 根据学校分页查询用户
//     */
//    Page<User> findBySchool(String school, Pageable pageable);
//
//    /**
//     * 复杂查询：根据多个条件查询用户
//     */
//    @Query("SELECT u FROM User u WHERE " +
//            "(:name IS NULL OR u.name LIKE %:name%) AND " +
//            "(:role IS NULL OR u.role = :role) AND " +
//            "(:school IS NULL OR u.school = :school) AND " +
//            "(:position IS NULL OR u.position = :position)")
//    Page<User> findByComplexConditions(@Param("name") String name,
//                                       @Param("role") UserRole role,
//                                       @Param("school") String school,
//                                       @Param("position") UserPosition position,
//                                       Pageable pageable);
//
//    /**
//     * 更新用户密码
//     */
//    @Modifying
//    @Query("UPDATE User u SET u.password = :password WHERE u.username = :username")
//    int updatePassword(@Param("username") String username, @Param("password") String password);
//
//    /**
//     * 更新用户邮箱
//     */
//    @Modifying
//    @Query("UPDATE User u SET u.email = :email WHERE u.username = :username")
//    int updateEmail(@Param("username") String username, @Param("email") String email);
//
//    /**
//     * 更新用户手机号
//     */
//    @Modifying
//    @Query("UPDATE User u SET u.phoneNumber = :phoneNumber WHERE u.username = :username")
//    int updatePhoneNumber(@Param("username") String username, @Param("phoneNumber") String phoneNumber);
//
//    /**
//     * 统计各角色用户数量
//     */
//    @Query("SELECT u.role, COUNT(u) FROM User u GROUP BY u.role")
//    List<Object[]> countUsersByRole();
//
//    /**
//     * 统计各学校用户数量
//     */
//    @Query("SELECT u.school, COUNT(u) FROM User u GROUP BY u.school")
//    List<Object[]> countUsersBySchool();
//
//    /**
//     * 根据用户名列表批量查找用户
//     */
//    List<User> findByUsernameIn(List<String> usernames);
//
//    /**
//     * 删除用户（由于username是主键，等同于deleteById）
//     */
//    void deleteByUsername(String username);
//
//    /**
//     * 根据邮箱和密码查找用户（用于登录验证）
//     */
//    Optional<User> findByEmailAndPassword(String email, String password);



    /**
     * 根据用户名查找用户（由于username是主键，等同于findById）
     */
    Optional<User> findByUsername(String username);

    /**
     * 根据用户名和密码查找用户（用于登录验证）
     */
    Optional<User> findByUsernameAndPassword(String username, String password);
}
