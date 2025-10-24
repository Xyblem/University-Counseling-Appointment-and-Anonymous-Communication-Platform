package com.ucaacp.backend.service;

import com.ucaacp.backend.entity.DTO.PsychAssessmentRecordDTO;
import com.ucaacp.backend.entity.PsychAssessmentRecord;
import com.ucaacp.backend.repository.PsychAssessmentRepository;
import com.ucaacp.backend.utils.psychtest.classes.PsychTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

@Service
@Transactional
public class PsychTestService {


    @Autowired
    private PsychAssessmentRepository psychAssessmentRepository;

    public PsychTest getPsychTestByClassName(String className) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<?> clazz = Class.forName("com.ucaacp.backend.utils.psychtest.test." + className);
        return (PsychTest)clazz.getDeclaredConstructor().newInstance();
    }


    public void record(String assessmentClass, String assessmentName, String testUsername, String assessmentReport){
        PsychAssessmentRecord record = new PsychAssessmentRecord(assessmentClass, assessmentName, testUsername, assessmentReport);
        psychAssessmentRepository.save(record);
    }

    public List<PsychAssessmentRecordDTO> findDTOByTestUsername(String testUsername){
        return psychAssessmentRepository.findDTOByTestUsername(testUsername);
    }


}
