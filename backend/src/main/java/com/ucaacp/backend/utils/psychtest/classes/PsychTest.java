package com.ucaacp.backend.utils.psychtest.classes;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Data
public abstract class PsychTest {
    private int id;
    private String title;
    private String description;
    private List<PsychQuestion> questions;

    public PsychTest(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.questions = new ArrayList<PsychQuestion>();
        this.initQuestion(this.questions);
    }

    public void addQuestion(PsychQuestion question) {
        this.questions.add(question);
    }

    /**
     * 初始化问题接口
     * @param questions 问题列表
     */
    public abstract void initQuestion(List<PsychQuestion> questions);


    /**
     * 回答测试
     * @param answer 回答
     * @return 结果
     */
    public abstract PsychTestResult answer(PsychTestAnswer answer);


}
