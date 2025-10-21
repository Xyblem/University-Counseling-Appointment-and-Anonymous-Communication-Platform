package com.ucaacp.backend.utils.psychtest.classes;

import lombok.Data;

@Data
public class PsychTestResult {
    private String message;
    public PsychTestResult() {
        this.message = "";
    }
}
