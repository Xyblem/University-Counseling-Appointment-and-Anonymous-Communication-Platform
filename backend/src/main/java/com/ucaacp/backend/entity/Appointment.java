package com.ucaacp.backend.entity;


import com.ucaacp.backend.entity.enums.AppointmentStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private Integer appointmentId;

    @Column(name = "student_username", nullable = false, length = 45)
    private String studentUsername;

    @Column(name = "teacher_username", nullable = false, length = 45)
    private String teacherUsername;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "apply_time", nullable = false, updatable = false)
    private LocalDateTime applyTime = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('CONFIRM','REJECT','RESCHEDULE')")
    private AppointmentStatus status = AppointmentStatus.RESCHEDULE;

    // 构造方法
    public Appointment() {}
}

