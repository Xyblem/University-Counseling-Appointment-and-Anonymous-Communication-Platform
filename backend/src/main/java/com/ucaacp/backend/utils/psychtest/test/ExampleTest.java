package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

public class ExampleTest extends PsychTest {

    public ExampleTest() {
        super(0, "样例测试", "样例测试描述");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions){
        questions.add(new Question(1, "样例测试-1","你更喜欢哪种环境？", false,List.of(
                new PsychOption("A", "安静的图书馆", 5),
                new PsychOption("B", "热闹的派对", 2),
                new PsychOption("C", "户外自然环境", 4)
        )));

        questions.add(new Question(2, "样例测试-2","遇到困难时，你通常会？",  false,List.of(
                new PsychOption("A", "自己思考解决", 4),
                new PsychOption("B", "寻求朋友帮助", 3),
                new PsychOption("C", "暂时逃避", 1)
        )));

        questions.add(new Question(3, "样例测试-3","你更看重？", false, List.of(
                new PsychOption("A", "内心的平静", 5),
                new PsychOption("B", "社交的人脉", 3),
                new PsychOption("C", "外在的成就", 2)
        )));

        questions.add(new Question(4, "样例测试-4","你做决定时更倾向于？",  false,List.of(
                new PsychOption("A", "理性分析后决定", 5),
                new PsychOption("B", "依靠直觉判断", 3),
                new PsychOption("C", "听取他人意见", 2)
        )));

        questions.add(new Question(5, "样例测试-5","当有人批评你时，你的反应是？", false, List.of(
                new PsychOption("A", "冷静思考是否合理", 5),
                new PsychOption("B", "有些不快但能接受", 3),
                new PsychOption("C", "感到被冒犯", 1)
        )));

        questions.add(new Question(6, "样例测试-6","空闲时间你更愿意？",  false,List.of(
                new PsychOption("A", "一个人阅读或看电影", 5),
                new PsychOption("B", "与朋友外出聚会", 2),
                new PsychOption("C", "运动或旅行", 4)
        )));

        questions.add(new Question(7, "样例测试-7","当面对压力时，你倾向于？", false, List.of(
                new PsychOption("A", "整理计划逐步解决", 5),
                new PsychOption("B", "找人倾诉释放情绪", 3),
                new PsychOption("C", "暂时逃避不去想", 1)
        )));

        questions.add(new Question(8, "样例测试-8","你的朋友评价你时通常会说？", false, List.of(
                new PsychOption("A", "冷静沉稳、理智", 5),
                new PsychOption("B", "外向开朗、热情", 2),
                new PsychOption("C", "随和、容易相处", 3)
        )));

        questions.add(new Question(9, "样例测试-9","你喜欢的工作方式是？",  false,List.of(
                new PsychOption("A", "独立完成，有自主权", 5),
                new PsychOption("B", "与团队合作完成", 3),
                new PsychOption("C", "听从安排即可", 2)
        )));

        questions.add(new Question(10, "样例测试-10","在陌生场合你通常？", false, List.of(
                new PsychOption("A", "安静观察，较少主动交流", 5),
                new PsychOption("B", "主动结交新朋友", 2),
                new PsychOption("C", "视情况而定", 3)
        )));

        questions.add(new Question(11, "样例测试-11","当计划被打乱时，你会？", false, List.of(
                new PsychOption("A", "调整计划继续前进", 5),
                new PsychOption("B", "感到焦虑但会努力适应", 3),
                new PsychOption("C", "容易情绪化", 1)
        )));

        questions.add(new Question(12, "样例测试-12","你更希望别人认为你是？",  false,List.of(
                new PsychOption("A", "可靠稳重的人", 5),
                new PsychOption("B", "有趣好相处的人", 3),
                new PsychOption("C", "成功且有能力的人", 2)
        )));

        questions.add(new Question(13, "样例测试-13","你在团队中常扮演的角色是？",  false,List.of(
                new PsychOption("A", "分析和规划型", 5),
                new PsychOption("B", "沟通协调型", 3),
                new PsychOption("C", "执行行动型", 4)
        )));

        questions.add(new Question(14, "样例测试-14","你最害怕的事情是？", false, List.of(
                new PsychOption("A", "失去掌控感", 5),
                new PsychOption("B", "被他人孤立", 3),
                new PsychOption("C", "失败被嘲笑", 2)
        )));

        questions.add(new Question(15, "样例测试-15","完成一件重要任务后，你会？", false, List.of(
                new PsychOption("A", "反思并规划下一步", 5),
                new PsychOption("B", "和朋友庆祝放松", 3),
                new PsychOption("C", "马上投入新任务", 4)
        )));
    }

    /**
     * 回答测试
     * @param answer 回答
     * @return 结果
     */
    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        float total = 0;
        int count=0;
        for (PsychQuestion qestion : this.getQuestions()) {
            Result answer0=(Result)qestion.answer(answer.get(count));
            total+=answer0.getTotalScore();
            count++;
        }

        Report result = new Report();
        float avg = total / this.getQuestions().size();
        result.setAvgScore(avg);
        if (avg >= 4.5) result.setMessage("平均分："+avg+"\n你是一个深思熟虑、理智且自律的人，性格偏内向但极具思考力。");
        else if (avg >= 3.5) result.setMessage("平均分："+avg+"\n你在理性与情感之间取得平衡，能灵活应对不同场合。");
        else if (avg >= 2.5) result.setMessage("平均分："+avg+"\n你性格外向、乐观，喜欢热闹和人际互动。");
        else  result.setMessage("平均分："+avg+"\n你情绪化较强，容易受外界影响，但也富有创造力和感性思维。");
        return result;
    }


    public static class Question extends PsychQuestion {


        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
        Result result=new Result();
            for(PsychOption option:this.getOptions()){
                if(answer.isSelected(option.getKey())){
                    result.addScore(option.getScore());
                }
            }
            return result;
        }

    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class Result extends PsychQuestionResult {
        private float totalScore;
        public Result() {
            this.totalScore = 0;
        }

        public void addScore(float score){
            totalScore+=score;
        }
    }

    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class Report extends PsychTestResult {
        private float avgScore;
        public Report() {
            this.avgScore = 0;
        }
    }


}
