package com.ucaacp.backend.service;

import com.ucaacp.backend.utils.psychtest.classes.PsychTest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.InvocationTargetException;

@Service
@Transactional
public class PsychTestService {

    public PsychTest getPsychTestByClassName(String className) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<?> clazz = Class.forName("com.ucaacp.backend.utils.psychtest.test." + className);
        return (PsychTest)clazz.getDeclaredConstructor().newInstance();
    }
}
