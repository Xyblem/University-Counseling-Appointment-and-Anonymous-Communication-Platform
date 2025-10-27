package com.ucaacp.backend.service;

import com.ucaacp.backend.entity.Appointment;
import com.ucaacp.backend.entity.DTO.AppointmentDTO;
import com.ucaacp.backend.entity.enums.AppointmentStatus;
import com.ucaacp.backend.repository.AppointmentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment addAppointment(@Valid Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<AppointmentDTO> getAppointmentDTOsByStudentUsername(String StudentUsername) {
        return appointmentRepository.findAppointmentDTOsByStudentUsername(StudentUsername);
    }

    public List<AppointmentDTO> getAppointmentDTOsByTeacherUsername(String TeacherUsername) {
        return appointmentRepository.findAppointmentDTOsByTeacherUsername(TeacherUsername);
    }

    public List<AppointmentDTO> getAppointmentDTOsByTeacherUsernamePending(String TeacherUsername) {
        return appointmentRepository.findAppointmentDTOsByTeacherUsernamePending(TeacherUsername);
    }

    public List<AppointmentDTO> getAppointmentDTOsByTeacherUsernameNonPending(String TeacherUsername) {
        return appointmentRepository.findAppointmentDTOsByTeacherUsernameNonPending(TeacherUsername);
    }

    public int handle(Integer appointmentId, AppointmentStatus appointmentStatus) {
        return appointmentRepository.handle(appointmentId, appointmentStatus);
    }

    public List<AppointmentDTO> findAllAppointmentDTO(){
        return appointmentRepository.findAllAppointmentDTO();
    }


}
