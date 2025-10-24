package com.ucaacp.backend.entity.DTO;

import com.ucaacp.backend.entity.enums.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Integer appointmentId;
    private String studentUsername;
    private String studentName;
    private String teacherUsername;
    private String teacherName;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime applyTime ;
    private AppointmentStatus status;

}
