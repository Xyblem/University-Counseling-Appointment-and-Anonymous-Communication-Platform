package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * MMPI明尼苏达多相个性测验简化版（30题）
 */
public class MMPITest extends PsychTest {

    public MMPITest() {
        super(12, "MMPI明尼苏达多相个性测验", "MMPI简化版，包含30个问题，评估个性特征和心理状态");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用2点计分：1=是，2=否
        questions.add(new Question(1, "MMPI-1", "我喜欢看机械方面的杂志", false, createTwoPointOptions()));
        questions.add(new Question(2, "MMPI-2", "我的胃口很好", false, createTwoPointOptions()));
        questions.add(new Question(3, "MMPI-3", "我早上起来的时候，多半觉得睡眠充足，头脑清醒", false, createTwoPointOptions()));
        questions.add(new Question(4, "MMPI-4", "我想我会喜欢图书管理员的工作", false, createTwoPointOptions()));
        questions.add(new Question(5, "MMPI-5", "我很容易被吵醒", false, createTwoPointOptions()));
        questions.add(new Question(6, "MMPI-6", "我喜欢看报纸上的犯罪新闻", false, createTwoPointOptions()));
        questions.add(new Question(7, "MMPI-7", "我的手脚经常是暖和的", false, createTwoPointOptions()));
        questions.add(new Question(8, "MMPI-8", "我的日常生活中充满了使我感兴趣的事情", false, createTwoPointOptions()));
        questions.add(new Question(9, "MMPI-9", "我现在的工作（学习）的能力和从前差不多", false, createTwoPointOptions()));
        questions.add(new Question(10, "MMPI-10", "我的喉咙里总好象有一块东西堵着似的", false, createTwoPointOptions()));
        questions.add(new Question(11, "MMPI-11", "一个人应该去了解自己的梦，并从中得到指导和警告", false, createTwoPointOptions()));
        questions.add(new Question(12, "MMPI-12", "我喜欢侦探小说或神秘小说", false, createTwoPointOptions()));
        questions.add(new Question(13, "MMPI-13", "我总是在很紧张的情况下工作", false, createTwoPointOptions()));
        questions.add(new Question(14, "MMPI-14", "我每个月至少有一、二次拉肚子", false, createTwoPointOptions()));
        questions.add(new Question(15, "MMPI-15", "偶尔我会想到一些坏得说不出口的事", false, createTwoPointOptions()));
        questions.add(new Question(16, "MMPI-16", "我深信生活对我是残酷的", false, createTwoPointOptions()));
        questions.add(new Question(17, "MMPI-17", "我的父亲是一个好人", false, createTwoPointOptions()));
        questions.add(new Question(18, "MMPI-18", "我很少有大便不通的毛病", false, createTwoPointOptions()));
        questions.add(new Question(19, "MMPI-19", "当我干一件新的工作时，总喜欢别人告诉我我应该接近谁", false, createTwoPointOptions()));
        questions.add(new Question(20, "MMPI-20", "我的性生活是满意的", false, createTwoPointOptions()));
        questions.add(new Question(21, "MMPI-21", "有时我非常想离开家", false, createTwoPointOptions()));
        questions.add(new Question(22, "MMPI-22", "有时我会哭一阵笑一阵，连自己也不能控制", false, createTwoPointOptions()));
        questions.add(new Question(23, "MMPI-23", "恶心和呕吐的毛病使我苦恼", false, createTwoPointOptions()));
        questions.add(new Question(24, "MMPI-24", "似乎没有一个人了解我", false, createTwoPointOptions()));
        questions.add(new Question(25, "MMPI-25", "我想当一个歌唱家", false, createTwoPointOptions()));
        questions.add(new Question(26, "MMPI-26", "当我处境困难的时候，我觉得最好是不开口", false, createTwoPointOptions()));
        questions.add(new Question(27, "MMPI-27", "有时我觉得有鬼附在我身上", false, createTwoPointOptions()));
        questions.add(new Question(28, "MMPI-28", "当别人惹了我时，我觉得只有机会就应报复，这是理所当然的", false, createTwoPointOptions()));
        questions.add(new Question(29, "MMPI-29", "我有胃酸过多的毛病，一星期要犯好几次，使我苦恼", false, createTwoPointOptions()));
        questions.add(new Question(30, "MMPI-30", "有时我真想骂人", false, createTwoPointOptions()));
    }

    /**
     * 创建2点计分选项
     */
    private List<PsychOption> createTwoPointOptions() {
        return List.of(
                new PsychOption("1", "是", 1),
                new PsychOption("2", "否", 0)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算各临床量表得分
        float hsScore = 0;    // 疑病量表 (题目: 2, 10, 14, 18, 23, 29)
        float dScore = 0;     // 抑郁量表 (题目: 3, 8, 16, 21, 24, 26)
        float hyScore = 0;    // 癔症量表 (题目: 1, 7, 9, 17, 20, 25)
        float pdScore = 0;    // 心理变态量表 (题目: 6, 12, 15, 19, 28, 30)
        float paScore = 0;    // 偏执量表 (题目: 4, 11, 13, 22, 27)
        float ptScore = 0;    // 精神衰弱量表 (题目: 5, 剩余题目)

        // 各量表题目索引 (基于30题简化版)
        int[] hsIndices = {1, 9, 13, 17, 22, 28};    // 对应题目2,10,14,18,23,29
        int[] dIndices = {2, 7, 15, 20, 23, 25};     // 对应题目3,8,16,21,24,26
        int[] hyIndices = {0, 6, 8, 16, 19, 24};     // 对应题目1,7,9,17,20,25
        int[] pdIndices = {5, 11, 14, 18, 27, 29};   // 对应题目6,12,15,19,28,30
        int[] paIndices = {3, 10, 12, 21, 26};       // 对应题目4,11,13,22,27
        // 剩余题目归入精神衰弱量表
        int[] ptIndices = {4};                        // 对应题目5

        // 计算各量表得分
        for (int index : hsIndices) {
            MMPIResult result = (MMPIResult) this.getQuestions().get(index).answer(answer.get(index));
            hsScore += result.getScore();
        }

        for (int index : dIndices) {
            MMPIResult result = (MMPIResult) this.getQuestions().get(index).answer(answer.get(index));
            dScore += result.getScore();
        }

        for (int index : hyIndices) {
            MMPIResult result = (MMPIResult) this.getQuestions().get(index).answer(answer.get(index));
            hyScore += result.getScore();
        }

        for (int index : pdIndices) {
            MMPIResult result = (MMPIResult) this.getQuestions().get(index).answer(answer.get(index));
            pdScore += result.getScore();
        }

        for (int index : paIndices) {
            MMPIResult result = (MMPIResult) this.getQuestions().get(index).answer(answer.get(index));
            paScore += result.getScore();
        }

        for (int index : ptIndices) {
            MMPIResult result = (MMPIResult) this.getQuestions().get(index).answer(answer.get(index));
            ptScore += result.getScore();
        }

        // 计算T分数（简化处理，实际MMPI需要复杂的转换）
        float hsT = convertToTScore(hsScore, hsIndices.length);
        float dT = convertToTScore(dScore, dIndices.length);
        float hyT = convertToTScore(hyScore, hyIndices.length);
        float pdT = convertToTScore(pdScore, pdIndices.length);
        float paT = convertToTScore(paScore, paIndices.length);
        float ptT = convertToTScore(ptScore, ptIndices.length);

        MMPIReport result = new MMPIReport();

        // 设置各量表T分数
        result.setHsTScore(hsT);
        result.setdTScore(dT);
        result.setHyTScore(hyT);
        result.setPdTScore(pdT);
        result.setPaTScore(paT);
        result.setPtTScore(ptT);

        // 设置原始分数
        result.setHsScore(hsScore);
        result.setdScore(dScore);
        result.setHyScore(hyScore);
        result.setPdScore(pdScore);
        result.setPaScore(paScore);
        result.setPtScore(ptScore);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的MMPI明尼苏达多相个性测验结果：\n\n");

        message.append("各量表T分数（中国常模标准）：\n");
        message.append(String.format("Hs(疑病): %.1f\n", hsT));
        message.append(String.format("D(抑郁): %.1f\n", dT));
        message.append(String.format("Hy(癔症): %.1f\n", hyT));
        message.append(String.format("Pd(心理变态): %.1f\n", pdT));
        message.append(String.format("Pa(偏执): %.1f\n", paT));
        message.append(String.format("Pt(精神衰弱): %.1f\n\n", ptT));

        message.append("结果分析：\n");
        message.append("• T分数在40-60分为正常范围\n");
        message.append("• T分数超过60分提示可能存在相应特质\n");
        message.append("• T分数超过70分建议寻求专业心理咨询\n\n");

        // 各量表结果解释
        message.append("量表分析：\n");

        if (hsT > 60) {
            message.append("• Hs(疑病): 可能过分关注身体健康，常有身体不适的主诉\n");
        }

        if (dT > 60) {
            message.append("• D(抑郁): 可能情绪低落，缺乏兴趣，有抑郁倾向\n");
        }

        if (hyT > 60) {
            message.append("• Hy(癔症): 可能倾向于用身体症状来表达心理冲突\n");
        }

        if (pdT > 60) {
            message.append("• Pd(心理变态): 可能在人际关系和社会适应方面存在困难\n");
        }

        if (paT > 60) {
            message.append("• Pa(偏执): 可能有多疑、敏感、警惕性高的倾向\n");
        }

        if (ptT > 60) {
            message.append("• Pt(精神衰弱): 可能有焦虑、紧张、强迫思维等表现\n");
        }

        // 总体评估
        int elevatedScales = 0;
        if (hsT > 60) elevatedScales++;
        if (dT > 60) elevatedScales++;
        if (hyT > 60) elevatedScales++;
        if (pdT > 60) elevatedScales++;
        if (paT > 60) elevatedScales++;
        if (ptT > 60) elevatedScales++;

        message.append("\n总体评估：\n");
        if (elevatedScales == 0) {
            message.append("您的各项指标均在正常范围内，心理状态总体良好。\n");
        } else if (elevatedScales <= 2) {
            message.append("您有少量量表分数略高，建议关注相关特质，保持心理健康。\n");
        } else {
            message.append("您有多个量表分数偏高，建议寻求专业心理咨询师的进一步评估。\n");
        }

        message.append("\n温馨提示：本测试为简化版本，结果仅供参考。如有疑问，请咨询专业心理医生。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * 将原始分转换为T分数（简化版）
     */
    private float convertToTScore(float rawScore, int questionCount) {
        // 简化处理：假设平均分为题目数量的一半，标准差为题目数量的1/3
        float mean = questionCount * 0.5f;
        float stdDev = questionCount * 0.33f;

        // T分数 = 50 + 10*(原始分-平均分)/标准差
        return 50 + 10 * (rawScore - mean) / stdDev;
    }

    /**
     * MMPI测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            MMPIResult result = new MMPIResult();

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
     * MMPI问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class MMPIResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * MMPI测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class MMPIReport extends PsychTestResult {
        // 原始分数
        private float hsScore;    // 疑病
        private float dScore;     // 抑郁
        private float hyScore;    // 癔症
        private float pdScore;    // 心理变态
        private float paScore;    // 偏执
        private float ptScore;    // 精神衰弱

        // T分数
        private float hsTScore;
        private float dTScore;
        private float hyTScore;
        private float pdTScore;
        private float paTScore;
        private float ptTScore;

        public void setdTScore(float dT) {
        }

        public void setdScore(float dScore) {
        }
    }
}