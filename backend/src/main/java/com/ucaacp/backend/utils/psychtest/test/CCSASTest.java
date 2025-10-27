package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * CCSAS大学生适应量表简化版（30题）
 */
public class CCSASTest extends PsychTest {

    public CCSASTest() {
        super(2, "CCSAS大学生适应量表", "中国大学生适应量表简化版，包含30个问题，评估大学生的适应状况");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用5点计分：1=不同意，2=不太同意，3=不确定，4=比较同意，5=同意
        // 反向计分题在计算时会自动处理

        // 1. 人际关系适应维度
        questions.add(new Question(1, "CCSAS-1", "很多人都找我和他们一起玩。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(2, "CCSAS-2", "当我不想一个人做事时，总能找到人陪我。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(3, "CCSAS-3", "我不知道怎么夸奖别人。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        questions.add(new Question(4, "CCSAS-4", "当我有困难时，有很多的人愿意帮助我。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        // 2. 学习适应维度
        questions.add(new Question(5, "CCSAS-5", "我平时常看与专业有关的书。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(6, "CCSAS-6", "我对现在的学习有很高的热情。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(7, "CCSAS-7", "我不知道如何分配学习时间。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        questions.add(new Question(8, "CCSAS-8", "我非常厌烦现在的学习。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        // 3. 校园适应维度
        questions.add(new Question(9, "CCSAS-9", "我的业余生活很丰富，不需要做任何改变。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(10, "CCSAS-10", "我不习惯学校规定的作息时间。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        questions.add(new Question(11, "CCSAS-11", "我喜欢学校的娱乐、休闲或锻炼场所。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        // 4. 择业适应维度
        questions.add(new Question(12, "CCSAS-12", "我很少去了解社会对人才的需求。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        questions.add(new Question(13, "CCSAS-13", "我清楚地知道毕业后该继续深造还是工作。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(14, "CCSAS-14", "我知道自己适合做什么工作。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(15, "CCSAS-15", "我不会为实现自己的职业目标而制定计划。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        // 5. 情绪适应维度
        questions.add(new Question(16, "CCSAS-16", "每天的生活中总是有我感兴趣的事情。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(17, "CCSAS-17", "我总是感到心情愉快。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(18, "CCSAS-18", "我从不感到孤独。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(19, "CCSAS-19", "我很少感到紧张或焦虑。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        // 6. 自我适应维度
        questions.add(new Question(20, "CCSAS-20", "遇到灰心的事情，我常常一筹莫展。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        questions.add(new Question(21, "CCSAS-21", "我认为自己的优点多于缺点。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(22, "CCSAS-22", "我总是去发现自己的优点并以此来鼓励自己。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(23, "CCSAS-23", "我总拿自己的短处与别人的长处比较。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        // 7. 满意度维度
        questions.add(new Question(24, "CCSAS-24", "如果让我再选择一次，我还是会像现在这样生活。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(25, "CCSAS-25", "我对现在的大学生活很满意。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(26, "CCSAS-26", "与同龄人相比，我感到很知足。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(27, "CCSAS-27", "我认为大学生活中有很多不尽人意的地方。", true, List.of( // 反向题
                new PsychOption("1", "不同意", 5),
                new PsychOption("2", "不太同意", 4),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 2),
                new PsychOption("5", "同意", 1)
        )));

        questions.add(new Question(28, "CCSAS-28", "我非常适应大学里的生活。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        // 补充题目以达到30题
        questions.add(new Question(29, "CCSAS-29", "我总是精力充沛，精神饱满。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));

        questions.add(new Question(30, "CCSAS-30", "当心情不好时我会出去散散心。", false, List.of(
                new PsychOption("1", "不同意", 1),
                new PsychOption("2", "不太同意", 2),
                new PsychOption("3", "不确定", 3),
                new PsychOption("4", "比较同意", 4),
                new PsychOption("5", "同意", 5)
        )));
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算各维度得分
        float interpersonalScore = 0;   // 人际关系适应 (4题)
        float learningScore = 0;        // 学习适应 (4题)
        float campusScore = 0;          // 校园适应 (3题)
        float careerScore = 0;          // 择业适应 (4题)
        float emotionScore = 0;         // 情绪适应 (4题)
        float selfScore = 0;            // 自我适应 (4题)
        float satisfactionScore = 0;    // 满意度 (5题)

        // 各维度题目索引
        int[] interpersonalIndices = {0, 1, 2, 3};      // 1-4题
        int[] learningIndices = {4, 5, 6, 7};           // 5-8题
        int[] campusIndices = {8, 9, 10};               // 9-11题
        int[] careerIndices = {11, 12, 13, 14};         // 12-15题
        int[] emotionIndices = {15, 16, 17, 18};        // 16-19题
        int[] selfIndices = {19, 20, 21, 22};           // 20-23题
        int[] satisfactionIndices = {23, 24, 25, 26, 27}; // 24-28题

        // 计算各维度得分
        for (int index : interpersonalIndices) {
            CCSASResult result = (CCSASResult) this.getQuestions().get(index).answer(answer.get(index));
            interpersonalScore += result.getScore();
        }

        for (int index : learningIndices) {
            CCSASResult result = (CCSASResult) this.getQuestions().get(index).answer(answer.get(index));
            learningScore += result.getScore();
        }

        for (int index : campusIndices) {
            CCSASResult result = (CCSASResult) this.getQuestions().get(index).answer(answer.get(index));
            campusScore += result.getScore();
        }

        for (int index : careerIndices) {
            CCSASResult result = (CCSASResult) this.getQuestions().get(index).answer(answer.get(index));
            careerScore += result.getScore();
        }

        for (int index : emotionIndices) {
            CCSASResult result = (CCSASResult) this.getQuestions().get(index).answer(answer.get(index));
            emotionScore += result.getScore();
        }

        for (int index : selfIndices) {
            CCSASResult result = (CCSASResult) this.getQuestions().get(index).answer(answer.get(index));
            selfScore += result.getScore();
        }

        for (int index : satisfactionIndices) {
            CCSASResult result = (CCSASResult) this.getQuestions().get(index).answer(answer.get(index));
            satisfactionScore += result.getScore();
        }

        // 计算总分
        float totalScore = interpersonalScore + learningScore + campusScore +
                careerScore + emotionScore + selfScore + satisfactionScore;

        // 转换为标准分（满分100分）
        float interpersonalStandard = (interpersonalScore / 20) * 100;  // 4题×5分=20分
        float learningStandard = (learningScore / 20) * 100;            // 4题×5分=20分
        float campusStandard = (campusScore / 15) * 100;               // 3题×5分=15分
        float careerStandard = (careerScore / 20) * 100;               // 4题×5分=20分
        float emotionStandard = (emotionScore / 20) * 100;             // 4题×5分=20分
        float selfStandard = (selfScore / 20) * 100;                   // 4题×5分=20分
        float satisfactionStandard = (satisfactionScore / 25) * 100;   // 5题×5分=25分
        float totalStandard = (totalScore / 140) * 100;                // 28题×5分=140分

        CCSASReport result = new CCSASReport();
        result.setInterpersonalScore(interpersonalStandard);
        result.setLearningScore(learningStandard);
        result.setCampusScore(campusStandard);
        result.setCareerScore(careerStandard);
        result.setEmotionScore(emotionStandard);
        result.setSelfScore(selfStandard);
        result.setSatisfactionScore(satisfactionStandard);
        result.setTotalScore(totalStandard);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的CCSAS大学生适应量表测试结果：\n\n");
        message.append(String.format("总适应水平: %.1f分\n", totalStandard));
        message.append(String.format("人际关系适应: %.1f分\n", interpersonalStandard));
        message.append(String.format("学习适应: %.1f分\n", learningStandard));
        message.append(String.format("校园适应: %.1f分\n", campusStandard));
        message.append(String.format("择业适应: %.1f分\n", careerStandard));
        message.append(String.format("情绪适应: %.1f分\n", emotionStandard));
        message.append(String.format("自我适应: %.1f分\n", selfStandard));
        message.append(String.format("满意度: %.1f分\n\n", satisfactionStandard));

        // 评价标准：以51分为界
        message.append("结果分析：\n");
        if (totalStandard >= 51) {
            message.append("• 总体适应状况良好，您的大学生活适应能力较强。\n");
        } else {
            message.append("• 总体适应状况有待提高，建议关注以下方面：\n");
        }

        if (interpersonalStandard < 51) {
            message.append("• 人际关系适应方面需要加强，建议多参与社交活动，学习沟通技巧。\n");
        }
        if (learningStandard < 51) {
            message.append("• 学习适应方面需要改善，建议制定学习计划，提高学习效率。\n");
        }
        if (campusStandard < 51) {
            message.append("• 校园生活适应方面有待提高，建议积极参与校园活动，丰富课余生活。\n");
        }
        if (careerStandard < 51) {
            message.append("• 择业适应方面需要关注，建议尽早进行职业规划，了解就业市场。\n");
        }
        if (emotionStandard < 51) {
            message.append("• 情绪适应方面需要加强，建议学习情绪管理技巧，保持积极心态。\n");
        }
        if (selfStandard < 51) {
            message.append("• 自我适应方面有待改善，建议增强自信心，正确认识自我。\n");
        }
        if (satisfactionStandard < 51) {
            message.append("• 满意度方面需要提升，建议寻找大学生活中的积极方面。\n");
        }

        if (totalStandard >= 51 &&
                interpersonalStandard >= 51 && learningStandard >= 51 &&
                campusStandard >= 51 && careerStandard >= 51 &&
                emotionStandard >= 51 && selfStandard >= 51 &&
                satisfactionStandard >= 51) {
            message.append("\n恭喜！您在各方面都表现出良好的适应能力，继续保持！");
        }

        result.setMessage(message.toString());
        return result;
    }

    /**
     * CCSAS测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            CCSASResult result = new CCSASResult();

            // 对于单选题，只取第一个选择的选项
            if (answer.getSelectedKey() != null && !answer.getSelectedKey().isEmpty()) {
                String selectedKey = answer.getSelectedKey().get(0);
                result.setSelectedKey(selectedKey);

                // 找到对应选项的分数
                for (PsychOption option : this.getOptions()) {
                    if (option.getKey().equals(selectedKey)) {
                        result.setScore(option.getScore());
                        break;
                    }
                }
            }

            return result;
        }
    }

    /**
     * CCSAS问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CCSASResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * CCSAS测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CCSASReport extends PsychTestResult {
        private float interpersonalScore;   // 人际关系适应
        private float learningScore;        // 学习适应
        private float campusScore;          // 校园适应
        private float careerScore;          // 择业适应
        private float emotionScore;         // 情绪适应
        private float selfScore;            // 自我适应
        private float satisfactionScore;    // 满意度
        private float totalScore;           // 总分
    }
}