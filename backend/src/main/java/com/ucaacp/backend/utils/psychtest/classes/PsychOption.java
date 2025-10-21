package com.ucaacp.backend.utils.psychtest.classes;


import lombok.Data;


/**
 * 心理测试题目的一个选项
 */
@Data
public class PsychOption {
    private String key;
    private String text;
    private float score;

    public PsychOption(String key, String text, float score) {
        this.key = key;
        this.text = text;
        this.score = score;
    }
}
