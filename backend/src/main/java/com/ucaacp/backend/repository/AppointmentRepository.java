package com.ucaacp.backend.repository;

import com.ucaacp.backend.entity.Appointment;
import com.ucaacp.backend.entity.DTO.AppointmentDTO;
import com.ucaacp.backend.entity.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{



    @Query("SELECT new com.ucaacp.backend.entity.DTO.AppointmentDTO(a.appointmentId," +
            "       a.studentUsername," +
            "       stu.name ," +
            "       a.teacherUsername," +
            "       tea.name ," +
            "       a.description,a.startTime,a.endTime,a.applyTime,a.status) " +
            "FROM Appointment a " +
            "         LEFT JOIN User stu ON a.studentUsername = stu.username " +
            "         LEFT JOIN User tea ON a.teacherUsername = tea.username " +
            "WHERE a.studentUsername=:studentUsername ")
    public List<AppointmentDTO> findAppointmentDTOsByStudentUsername(@Param("studentUsername") String studentUsername);

    @Query("SELECT new com.ucaacp.backend.entity.DTO.AppointmentDTO(a.appointmentId," +
            "       a.studentUsername," +
            "       stu.name ," +
            "       a.teacherUsername," +
            "       tea.name ," +
            "       a.description,a.startTime,a.endTime,a.applyTime,a.status) " +
            "FROM Appointment a " +
            "         LEFT JOIN User stu ON a.studentUsername = stu.username " +
            "         LEFT JOIN User tea ON a.teacherUsername = tea.username " +
            "WHERE a.teacherUsername=:teacherUsername ")
    List<AppointmentDTO> findAppointmentDTOsByTeacherUsername(@Param("teacherUsername")String teacherUsername);


    @Query("SELECT new com.ucaacp.backend.entity.DTO.AppointmentDTO(a.appointmentId," +
            "       a.studentUsername," +
            "       stu.name ," +
            "       a.teacherUsername," +
            "       tea.name ," +
            "       a.description,a.startTime,a.endTime,a.applyTime,a.status) " +
            "FROM Appointment a " +
            "         LEFT JOIN User stu ON a.studentUsername = stu.username " +
            "         LEFT JOIN User tea ON a.teacherUsername = tea.username " +
            "WHERE a.teacherUsername=:teacherUsername AND a.status='PENDING'")
    List<AppointmentDTO> findAppointmentDTOsByTeacherUsernamePending(@Param("teacherUsername")String teacherUsername);

    @Query("SELECT new com.ucaacp.backend.entity.DTO.AppointmentDTO(a.appointmentId," +
            "       a.studentUsername," +
            "       stu.name ," +
            "       a.teacherUsername," +
            "       tea.name ," +
            "       a.description,a.startTime,a.endTime,a.applyTime,a.status) " +
            "FROM Appointment a " +
            "         LEFT JOIN User stu ON a.studentUsername = stu.username " +
            "         LEFT JOIN User tea ON a.teacherUsername = tea.username " +
            "WHERE a.teacherUsername=:teacherUsername AND a.status!='PENDING'")
    List<AppointmentDTO> findAppointmentDTOsByTeacherUsernameNonPending(@Param("teacherUsername")String teacherUsername);


    @Modifying
    @Query("UPDATE Appointment a SET a.status=:appointmentStatus WHERE a.appointmentId=:appointmentId")
    int handle(@Param("appointmentId") Integer appointmentId,@Param("appointmentStatus") AppointmentStatus appointmentStatus);

    @Query("SELECT new com.ucaacp.backend.entity.DTO.AppointmentDTO(a.appointmentId," +
            "       a.studentUsername," +
            "       stu.name ," +
            "       a.teacherUsername," +
            "       tea.name ," +
            "       a.description,a.startTime,a.endTime,a.applyTime,a.status) " +
            "FROM Appointment a " +
            "         LEFT JOIN User stu ON a.studentUsername = stu.username " +
            "         LEFT JOIN User tea ON a.teacherUsername = tea.username ")
    List<AppointmentDTO> findAllAppointmentDTO();
}
