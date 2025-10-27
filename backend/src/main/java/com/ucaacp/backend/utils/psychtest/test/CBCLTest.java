package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * CBCL儿童行为量表简化版（30题）
 */
public class CBCLTest extends PsychTest {

    public CBCLTest() {
        super(9, "CBCL儿童行为量表", "儿童行为量表简化版，包含30个问题，评估儿童行为问题");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用3点计分：0=无此表现，1=有时有，2=经常有
        // 从原113题中精选30个代表性题目，覆盖主要行为问题因子

        // 情绪问题相关 (6题)
        questions.add(new Question(1, "CBCL-1", "行为幼稚与其年龄不符", false, createThreePointOptions()));
        questions.add(new Question(2, "CBCL-12", "常说感到寂寞", false, createThreePointOptions()));
        questions.add(new Question(3, "CBCL-14", "常常哭叫", false, createThreePointOptions()));
        questions.add(new Question(4, "CBCL-35", "觉得自己无用或有自卑感", false, createThreePointOptions()));
        questions.add(new Question(5, "CBCL-103", "闷闷不乐，悲伤或抑郁", false, createThreePointOptions()));
        questions.add(new Question(6, "CBCL-112", "忧虑重重", false, createThreePointOptions()));

        // 注意力/多动问题 (5题)
        questions.add(new Question(7, "CBCL-8", "精神不能集中，注意力不能持久", false, createThreePointOptions()));
        questions.add(new Question(8, "CBCL-10", "坐立不安活动过多", false, createThreePointOptions()));
        questions.add(new Question(9, "CBCL-41", "冲动或行为粗鲁", false, createThreePointOptions()));
        questions.add(new Question(10, "CBCL-93", "话太多", false, createThreePointOptions()));
        questions.add(new Question(11, "CBCL-104", "说话声音特别大", false, createThreePointOptions()));

        // 攻击性行为 (5题)
        questions.add(new Question(12, "CBCL-3", "喜欢争论", false, createThreePointOptions()));
        questions.add(new Question(13, "CBCL-16", "虐待、欺侮别人或吝啬", false, createThreePointOptions()));
        questions.add(new Question(14, "CBCL-37", "经常打架", false, createThreePointOptions()));
        questions.add(new Question(15, "CBCL-57", "对别人身体进行攻击", false, createThreePointOptions()));
        questions.add(new Question(16, "CBCL-95", "乱发脾气或脾气暴躁", false, createThreePointOptions()));

        // 社交问题 (5题)
        questions.add(new Question(17, "CBCL-25", "不与其他儿童相处", false, createThreePointOptions()));
        questions.add(new Question(18, "CBCL-38", "常被人戏弄", false, createThreePointOptions()));
        questions.add(new Question(19, "CBCL-42", "喜欢孤独", false, createThreePointOptions()));
        questions.add(new Question(20, "CBCL-48", "不被其他儿童喜欢", false, createThreePointOptions()));
        questions.add(new Question(21, "CBCL-111", "孤独、不合群", false, createThreePointOptions()));

        // 品行问题 (4题)
        questions.add(new Question(22, "CBCL-22", "在家不听话", false, createThreePointOptions()));
        questions.add(new Question(23, "CBCL-23", "在学校不听话", false, createThreePointOptions()));
        questions.add(new Question(24, "CBCL-43", "撒谎或欺骗", false, createThreePointOptions()));
        questions.add(new Question(25, "CBCL-90", "咒骂或讲粗话", false, createThreePointOptions()));

        // 躯体化问题 (3题)
        questions.add(new Question(26, "CBCL-51", "感到头昏", false, createThreePointOptions()));
        questions.add(new Question(27, "CBCL-56a", "身体疼痛（无明确原因）", false, createThreePointOptions()));
        questions.add(new Question(28, "CBCL-56b", "头痛（无明确原因）", false, createThreePointOptions()));

        // 强迫/焦虑问题 (2题)
        questions.add(new Question(29, "CBCL-9", "老是想某些事情，不能摆脱", false, createThreePointOptions()));
        questions.add(new Question(30, "CBCL-50", "过度恐惧或担心", false, createThreePointOptions()));
    }

    /**
     * 创建3点计分选项
     */
    private List<PsychOption> createThreePointOptions() {
        return List.of(
                new PsychOption("0", "无此表现", 0),
                new PsychOption("1", "有时有", 1),
                new PsychOption("2", "经常有", 2)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算各因子得分
        float emotionalScore = 0;          // 情绪问题
        float attentionScore = 0;          // 注意力/多动问题
        float aggressionScore = 0;         // 攻击性行为
        float socialScore = 0;             // 社交问题
        float conductScore = 0;            // 品行问题
        float somaticScore = 0;            // 躯体化问题
        float anxietyScore = 0;            // 强迫/焦虑问题
        float totalScore = 0;              // 总粗分

        // 各因子题目索引
        int[] emotionalIndices = {0, 1, 2, 3, 4, 5};      // 1-6题
        int[] attentionIndices = {6, 7, 8, 9, 10};        // 7-11题
        int[] aggressionIndices = {11, 12, 13, 14, 15};   // 12-16题
        int[] socialIndices = {16, 17, 18, 19, 20};       // 17-21题
        int[] conductIndices = {21, 22, 23, 24};          // 22-25题
        int[] somaticIndices = {25, 26, 27};              // 26-28题
        int[] anxietyIndices = {28, 29};                  // 29-30题

        // 计算各因子得分
        for (int index : emotionalIndices) {
            CBCLResult result = (CBCLResult) this.getQuestions().get(index).answer(answer.get(index));
            emotionalScore += result.getScore();
        }

        for (int index : attentionIndices) {
            CBCLResult result = (CBCLResult) this.getQuestions().get(index).answer(answer.get(index));
            attentionScore += result.getScore();
        }

        for (int index : aggressionIndices) {
            CBCLResult result = (CBCLResult) this.getQuestions().get(index).answer(answer.get(index));
            aggressionScore += result.getScore();
        }

        for (int index : socialIndices) {
            CBCLResult result = (CBCLResult) this.getQuestions().get(index).answer(answer.get(index));
            socialScore += result.getScore();
        }

        for (int index : conductIndices) {
            CBCLResult result = (CBCLResult) this.getQuestions().get(index).answer(answer.get(index));
            conductScore += result.getScore();
        }

        for (int index : somaticIndices) {
            CBCLResult result = (CBCLResult) this.getQuestions().get(index).answer(answer.get(index));
            somaticScore += result.getScore();
        }

        for (int index : anxietyIndices) {
            CBCLResult result = (CBCLResult) this.getQuestions().get(index).answer(answer.get(index));
            anxietyScore += result.getScore();
        }

        // 计算总粗分
        totalScore = emotionalScore + attentionScore + aggressionScore +
                socialScore + conductScore + somaticScore + anxietyScore;

        // 计算各因子平均分
        float emotionalMean = emotionalScore / emotionalIndices.length;
        float attentionMean = attentionScore / attentionIndices.length;
        float aggressionMean = aggressionScore / aggressionIndices.length;
        float socialMean = socialScore / socialIndices.length;
        float conductMean = conductScore / conductIndices.length;
        float somaticMean = somaticScore / somaticIndices.length;
        float anxietyMean = anxietyScore / anxietyIndices.length;

        CBCLReport result = new CBCLReport();

        // 设置各因子得分
        result.setEmotionalScore(emotionalScore);
        result.setAttentionScore(attentionScore);
        result.setAggressionScore(aggressionScore);
        result.setSocialScore(socialScore);
        result.setConductScore(conductScore);
        result.setSomaticScore(somaticScore);
        result.setAnxietyScore(anxietyScore);
        result.setTotalScore(totalScore);

        // 设置各因子均分
        result.setEmotionalMean(emotionalMean);
        result.setAttentionMean(attentionMean);
        result.setAggressionMean(aggressionMean);
        result.setSocialMean(socialMean);
        result.setConductMean(conductMean);
        result.setSomaticMean(somaticMean);
        result.setAnxietyMean(anxietyMean);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("CBCL儿童行为量表测试结果：\n\n");

        message.append(String.format("情绪问题: 总分%.1f, 均分%.2f\n", emotionalScore, emotionalMean));
        message.append(String.format("注意力/多动问题: 总分%.1f, 均分%.2f\n", attentionScore, attentionMean));
        message.append(String.format("攻击性行为: 总分%.1f, 均分%.2f\n", aggressionScore, aggressionMean));
        message.append(String.format("社交问题: 总分%.1f, 均分%.2f\n", socialScore, socialMean));
        message.append(String.format("品行问题: 总分%.1f, 均分%.2f\n", conductScore, conductMean));
        message.append(String.format("躯体化问题: 总分%.1f, 均分%.2f\n", somaticScore, somaticMean));
        message.append(String.format("强迫/焦虑问题: 总分%.1f, 均分%.2f\n", anxietyScore, anxietyMean));
        message.append(String.format("总粗分: %.1f\n\n", totalScore));

        // 结果解释
        message.append("行为问题分析：\n");

        // 情绪问题分析
        if (emotionalMean > 1.0) {
            message.append("• 情绪问题较突出：可能存在抑郁、自卑等情绪困扰\n");
        } else if (emotionalMean > 0.5) {
            message.append("• 情绪问题轻度：偶有情绪低落表现\n");
        }

        // 注意力问题分析
        if (attentionMean > 1.0) {
            message.append("• 注意力/多动问题明显：可能存在注意力不集中、多动倾向\n");
        } else if (attentionMean > 0.5) {
            message.append("• 注意力问题轻度：有时难以集中注意力\n");
        }

        // 攻击性分析
        if (aggressionMean > 1.0) {
            message.append("• 攻击性行为突出：存在打架、欺负他人等行为\n");
        } else if (aggressionMean > 0.5) {
            message.append("• 攻击性行为轻度：偶有冲突行为\n");
        }

        // 社交问题分析
        if (socialMean > 1.0) {
            message.append("• 社交问题明显：存在孤独、不合群等问题\n");
        } else if (socialMean > 0.5) {
            message.append("• 社交问题轻度：社交技能需要提升\n");
        }

        // 品行问题分析
        if (conductMean > 1.0) {
            message.append("• 品行问题突出：存在不听话、说谎等行为\n");
        } else if (conductMean > 0.5) {
            message.append("• 品行问题轻度：偶有行为规范问题\n");
        }

        // 躯体化问题分析
        if (somaticMean > 1.0) {
            message.append("• 躯体化问题明显：存在无明确原因的躯体不适\n");
        }

        // 焦虑问题分析
        if (anxietyMean > 1.0) {
            message.append("• 焦虑问题突出：存在过度担心、强迫思维\n");
        } else if (anxietyMean > 0.5) {
            message.append("• 焦虑问题轻度：偶有担心和紧张\n");
        }

        message.append("\n总体评估：\n");

        // 根据总粗分进行评估（简化版标准）
        if (totalScore > 25) {
            message.append("行为问题较为明显，建议进行专业评估和干预。\n");
        } else if (totalScore > 15) {
            message.append("存在一定程度的行为问题，需要关注和引导。\n");
        } else if (totalScore > 8) {
            message.append("行为问题在正常范围内，个别方面需要关注。\n");
        } else {
            message.append("行为表现总体良好。\n");
        }

        // 根据因子数量评估
        int problematicFactors = 0;
        if (emotionalMean > 0.8) problematicFactors++;
        if (attentionMean > 0.8) problematicFactors++;
        if (aggressionMean > 0.8) problematicFactors++;
        if (socialMean > 0.8) problematicFactors++;
        if (conductMean > 0.8) problematicFactors++;
        if (somaticMean > 0.8) problematicFactors++;
        if (anxietyMean > 0.8) problematicFactors++;

        if (problematicFactors >= 3) {
            message.append("多个行为问题因子得分较高，建议综合评估儿童发展状况。\n");
        } else if (problematicFactors >= 1) {
            message.append("个别行为问题因子需要关注，建议针对性引导。\n");
        }

        message.append("\n干预建议：\n");

        if (emotionalScore > 0) {
            message.append("• 情绪问题：多与孩子沟通，鼓励表达情感，建立安全感\n");
        }

        if (attentionScore > 0) {
            message.append("• 注意力问题：建立规律作息，减少干扰，分段完成任务\n");
        }

        if (aggressionScore > 0) {
            message.append("• 攻击行为：教授情绪管理技巧，树立良好行为榜样\n");
        }

        if (socialScore > 0) {
            message.append("• 社交问题：创造社交机会，教授社交技能，增强自信\n");
        }

        message.append("\n温馨提示：本测试为简化版本，结果仅供参考。如发现明显行为问题，建议寻求专业儿童心理医生的评估和指导。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * CBCL测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            CBCLResult result = new CBCLResult();

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
     * CBCL问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CBCLResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * CBCL测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class CBCLReport extends PsychTestResult {
        // 各因子得分
        private float emotionalScore;
        private float attentionScore;
        private float aggressionScore;
        private float socialScore;
        private float conductScore;
        private float somaticScore;
        private float anxietyScore;
        private float totalScore;

        // 各因子均分
        private float emotionalMean;
        private float attentionMean;
        private float aggressionMean;
        private float socialMean;
        private float conductMean;
        private float somaticMean;
        private float anxietyMean;
    }
}