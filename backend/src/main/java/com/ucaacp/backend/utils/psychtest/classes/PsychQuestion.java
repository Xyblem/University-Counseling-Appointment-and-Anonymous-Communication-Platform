package com.ucaacp.backend.utils.psychtest.classes;
import lombok.Data;
import lombok.Getter;

import java.util.List;

/**
 * 心理测试题目的一个问题
 */
@Data
public abstract class PsychQuestion {
    private int id;
    private String title;
    private String content;
    private List<PsychOption> options;
    private boolean multiOptional;

    public PsychQuestion(int id, String title, String content, boolean multiOptional,List<PsychOption> options) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.options = options;
        this.multiOptional = multiOptional;
    }

    public void addOption(PsychOption option){
        this.options.add(option);
    }

    /**
     * 计算题目分数
     * @param answer 答案
     * @return 结果
     */
    public abstract PsychQuestionResult answer(PsychQuestionAnswer answer);


}
