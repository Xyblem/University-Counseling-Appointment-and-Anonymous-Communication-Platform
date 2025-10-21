package com.ucaacp.backend.utils.psychtest.classes;

import java.util.LinkedList;
import java.util.List;


public class PsychTestAnswer extends LinkedList<PsychQuestionAnswer> {
    public PsychTestAnswer() {
        super();
    }

    public PsychTestAnswer(String[][] answers) {
        if(answers != null){
            for(String[] answer : answers) {
                this.add(new PsychQuestionAnswer(answer));
            }
        }
    }

    public PsychTestAnswer(List<List<String>> answers) {
        if(answers != null){
            for(List<String> answer : answers) {
                this.add(new PsychQuestionAnswer(answer));
            }
        }
    }

    @Override
    public boolean add(PsychQuestionAnswer psychQuestionAnswer){
        return super.add(psychQuestionAnswer);
    }


    @Override
    public PsychQuestionAnswer get(int index){
        if(index >= super.size()){
            return new PsychQuestionAnswer();
        }
        return super.get(index);
    }
}
