package com.ucaacp.backend.utils.psychtest.classes;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PsychQuestionAnswer {
    private List<String> selectedKey;

    public PsychQuestionAnswer() {
        this.selectedKey = new ArrayList<String>();
    }

    public PsychQuestionAnswer(List<String> selectedKey){
        this.selectedKey = selectedKey;
    }

    public PsychQuestionAnswer(String[] selectedKey){
        this.selectedKey = List.of(selectedKey);
    }

    /**
     * 添加选项
     * @param selectedKey 选项Key
     */
    public void addSelectedKey(String selectedKey){
        this.selectedKey.add(selectedKey);
    }

    /**
     * 移除选项
     * @param selectedKey 选项Key
     */
    public void removeSelectedKey(String selectedKey){
        this.selectedKey.remove(selectedKey);
    }

    /**
     * 判断是否选择某选项
     * @param key 选项Key
     * @return 是否选择某选项
     */
    public boolean isSelected(String key){
        return selectedKey.contains(key);
    }
}
