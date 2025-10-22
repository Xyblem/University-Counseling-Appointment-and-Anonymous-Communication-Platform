package com.ucaacp.backend.controller;

import com.ucaacp.backend.utils.return_object.ReturnObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.antlr.v4.runtime.misc.Pair;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice("com.ucaacp.backend.controller")
public class GlobalExceptionHandler {

    /**
     * 处理请求体校验失败
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ReturnObject handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ReturnObject.fail(errors.toString());
    }

    /**
     * 处理路径变量或请求参数校验失败
     */
    @ExceptionHandler({ConstraintViolationException.class,jakarta.persistence.RollbackException.class,org.springframework.transaction.TransactionSystemException.class})
    public ReturnObject handleConstraintViolationExceptions(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(violation -> {
            String fieldName = violation.getPropertyPath().toString();
            String errorMessage = violation.getMessage();
            errors.put(fieldName, errorMessage);
        });
        StringBuilder builder = new StringBuilder();
        for (Map.Entry<String, String> pairs : errors.entrySet()) {
            builder.append("参数").append(pairs.getKey()).append(":").append(pairs.getValue()).append("\r\n");
        }
        return ReturnObject.validationError(builder.toString());
    }


    /**
     * 处理未知异常
     */
    @ExceptionHandler(value = Throwable.class)
    public ReturnObject unknownExceptionHandler(HttpServletRequest request, Throwable e) {
        e.printStackTrace();
        return ReturnObject.error(e.getMessage());
    }

}
