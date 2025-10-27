package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * EMBU父母教养方式量表简化版（30题）
 */
public class EMBUTest extends PsychTest {

    public EMBUTest() {
        super(5, "EMBU父母教养方式量表", "父母教养方式问卷简化版，包含30个问题，评估父母的教养方式");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用4点计分：1=从不，2=偶尔，3=经常，4=总是
        // 每个问题同时评估父亲和母亲，用户需要分别回答

        // 情感温暖、理解维度 (10题)
        questions.add(new Question(1, "EMBU-1", "我能通过父母的言谈、表情感受他（她）很喜欢我", false, createFourPointOptions()));
        questions.add(new Question(2, "EMBU-2", "我能感到父母对我的喜爱", false, createFourPointOptions()));
        questions.add(new Question(3, "EMBU-3", "遇到不顺心的事时,我能感到父母在尽量鼓励我,使我得到一些安慰", false, createFourPointOptions()));
        questions.add(new Question(4, "EMBU-4", "如果面临一项困难的任务，我能感到来自父母的支持", false, createFourPointOptions()));
        questions.add(new Question(5, "EMBU-5", "父母总试图鼓励我，使我成为佼佼者", false, createFourPointOptions()));
        questions.add(new Question(6, "EMBU-6", "父母总向我表示他们是爱我的", false, createFourPointOptions()));
        questions.add(new Question(7, "EMBU-7", "父母对我很信任且允许我独自完成某些事", false, createFourPointOptions()));
        questions.add(new Question(8, "EMBU-8", "我觉得父母很尊重我的观点", false, createFourPointOptions()));
        questions.add(new Question(9, "EMBU-9", "我觉得父母很愿意跟我在一起", false, createFourPointOptions()));
        questions.add(new Question(10, "EMBU-10", "当我感到伤心的时候可以从父母那儿得到安慰", false, createFourPointOptions()));

        // 惩罚、严厉维度 (6题)
        questions.add(new Question(11, "EMBU-11", "即使是很小的过失，父母也惩罚我", false, createFourPointOptions()));
        questions.add(new Question(12, "EMBU-12", "在我小时候，父母曾当着别人的面打我或训斥我", false, createFourPointOptions()));
        questions.add(new Question(13, "EMBU-13", "父母对我的惩罚往往超过我应受的程度", false, createFourPointOptions()));
        questions.add(new Question(14, "EMBU-14", "如果我在家里不听吩咐，父母就会发火", false, createFourPointOptions()));
        questions.add(new Question(15, "EMBU-15", "父母曾无缘无故地惩罚我", false, createFourPointOptions()));
        questions.add(new Question(16, "EMBU-16", "我经常挨父母打", false, createFourPointOptions()));

        // 过分干涉、过度保护维度 (7题)
        questions.add(new Question(17, "EMBU-17", "我觉得父母干涉我所做的每一件事", false, createFourPointOptions()));
        questions.add(new Question(18, "EMBU-18", "父母总是左右我该穿什么衣服或该打扮成什么样子", false, createFourPointOptions()));
        questions.add(new Question(19, "EMBU-19", "父母不允许我做一些其他孩子可以做的事情，因为他们害怕我会出事", false, createFourPointOptions()));
        questions.add(new Question(20, "EMBU-20", "父母总是很关注我晚上干什么", false, createFourPointOptions()));
        questions.add(new Question(21, "EMBU-21", "父母总是过分担心我的健康", false, createFourPointOptions()));
        questions.add(new Question(22, "EMBU-22", "父母要求我回到家里必须得向他们说明我在做的事情", false, createFourPointOptions()));
        questions.add(new Question(23, "EMBU-23", "父母对我该做什么、不该做什么都有严格的限制而且绝不让步", false, createFourPointOptions()));

        // 拒绝、否认维度 (4题)
        questions.add(new Question(24, "EMBU-24", "我觉得父母难以接近", false, createFourPointOptions()));
        questions.add(new Question(25, "EMBU-25", "父母曾在别人面前唠叨一些我说过的话或做过的事，这使我感到很难堪", false, createFourPointOptions()));
        questions.add(new Question(26, "EMBU-26", "在满足我需要的东西，父母是很小气的", false, createFourPointOptions()));
        questions.add(new Question(27, "EMBU-27", "父母经常对我说他们不喜欢我在家里的表现", false, createFourPointOptions()));

        // 偏爱被试维度 (3题)
        questions.add(new Question(28, "EMBU-28", "与我的兄弟姐妹比，父母更宠爱我", false, createFourPointOptions()));
        questions.add(new Question(29, "EMBU-29", "父母能让我得到其他兄弟姐妹得不到的东西", false, createFourPointOptions()));
        questions.add(new Question(30, "EMBU-30", "我觉得父母更喜欢我，而不是我的兄弟姐妹", false, createFourPointOptions()));
    }

    /**
     * 创建4点计分选项
     */
    private List<PsychOption> createFourPointOptions() {
        return List.of(
                new PsychOption("1", "从不", 1),
                new PsychOption("2", "偶尔", 2),
                new PsychOption("3", "经常", 3),
                new PsychOption("4", "总是", 4)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算各维度得分（父亲）
        float fatherWarmthScore = 0;          // 父亲情感温暖、理解 (10题)
        float fatherPunishmentScore = 0;      // 父亲惩罚、严厉 (6题)
        float fatherInterferenceScore = 0;    // 父亲过分干涉 (7题)
        float fatherRejectionScore = 0;       // 父亲拒绝、否认 (4题)
        float fatherFavoritismScore = 0;      // 父亲偏爱被试 (3题)

        // 计算各维度得分（母亲）
        float motherWarmthScore = 0;          // 母亲情感温暖、理解 (10题)
        float motherPunishmentScore = 0;      // 母亲惩罚、严厉 (6题)
        float motherInterferenceScore = 0;    // 母亲过分干涉、过度保护 (7题)
        float motherRejectionScore = 0;       // 母亲拒绝、否认 (4题)
        float motherFavoritismScore = 0;      // 母亲偏爱被试 (3题)

        // 各维度题目索引
        int[] warmthIndices = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};          // 1-10题
        int[] punishmentIndices = {10, 11, 12, 13, 14, 15};            // 11-16题
        int[] interferenceIndices = {16, 17, 18, 19, 20, 21, 22};      // 17-23题
        int[] rejectionIndices = {23, 24, 25, 26};                     // 24-27题
        int[] favoritismIndices = {27, 28, 29};                        // 28-30题

        // 计算父亲各维度得分（假设奇数题号回答父亲，偶数题号回答母亲）
        for (int index : warmthIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2));
            fatherWarmthScore += result.getScore();
        }

        for (int index : punishmentIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2));
            fatherPunishmentScore += result.getScore();
        }

        for (int index : interferenceIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2));
            fatherInterferenceScore += result.getScore();
        }

        for (int index : rejectionIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2));
            fatherRejectionScore += result.getScore();
        }

        for (int index : favoritismIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2));
            fatherFavoritismScore += result.getScore();
        }

        // 计算母亲各维度得分
        for (int index : warmthIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2 + 1));
            motherWarmthScore += result.getScore();
        }

        for (int index : punishmentIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2 + 1));
            motherPunishmentScore += result.getScore();
        }

        for (int index : interferenceIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2 + 1));
            motherInterferenceScore += result.getScore();
        }

        for (int index : rejectionIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2 + 1));
            motherRejectionScore += result.getScore();
        }

        for (int index : favoritismIndices) {
            EMBUResult result = (EMBUResult) this.getQuestions().get(index).answer(answer.get(index * 2 + 1));
            motherFavoritismScore += result.getScore();
        }

        // 计算维度均分（与常模比较）
        float fatherWarmthMean = fatherWarmthScore / warmthIndices.length;
        float fatherPunishmentMean = fatherPunishmentScore / punishmentIndices.length;
        float fatherInterferenceMean = fatherInterferenceScore / interferenceIndices.length;
        float fatherRejectionMean = fatherRejectionScore / rejectionIndices.length;
        float fatherFavoritismMean = fatherFavoritismScore / favoritismIndices.length;

        float motherWarmthMean = motherWarmthScore / warmthIndices.length;
        float motherPunishmentMean = motherPunishmentScore / punishmentIndices.length;
        float motherInterferenceMean = motherInterferenceScore / interferenceIndices.length;
        float motherRejectionMean = motherRejectionScore / rejectionIndices.length;
        float motherFavoritismMean = motherFavoritismScore / favoritismIndices.length;

        // 常模均值（根据原量表数据）
        final float FATHER_WARMTH_NORM = 2.71f;      // 51.54/19
        final float FATHER_PUNISHMENT_NORM = 1.32f;  // 15.84/12
        final float FATHER_INTERFERENCE_NORM = 2.09f; // 20.92/10
        final float FATHER_REJECTION_NORM = 1.38f;   // 8.27/6
        final float FATHER_FAVORITISM_NORM = 1.96f;  // 9.82/5

        final float MOTHER_WARMTH_NORM = 2.93f;      // 55.71/19
        final float MOTHER_PUNISHMENT_NORM = 1.24f;  // 11.13/9
        final float MOTHER_INTERFERENCE_NORM = 2.28f; // 36.42/16
        final float MOTHER_REJECTION_NORM = 1.43f;   // 11.47/8
        final float MOTHER_FAVORITISM_NORM = 2.00f;  // 9.99/5

        EMBUReport result = new EMBUReport();

        // 设置父亲得分
        result.setFatherWarmthScore(fatherWarmthScore);
        result.setFatherPunishmentScore(fatherPunishmentScore);
        result.setFatherInterferenceScore(fatherInterferenceScore);
        result.setFatherRejectionScore(fatherRejectionScore);
        result.setFatherFavoritismScore(fatherFavoritismScore);
        result.setFatherWarmthMean(fatherWarmthMean);
        result.setFatherPunishmentMean(fatherPunishmentMean);
        result.setFatherInterferenceMean(fatherInterferenceMean);
        result.setFatherRejectionMean(fatherRejectionMean);
        result.setFatherFavoritismMean(fatherFavoritismMean);

        // 设置母亲得分
        result.setMotherWarmthScore(motherWarmthScore);
        result.setMotherPunishmentScore(motherPunishmentScore);
        result.setMotherInterferenceScore(motherInterferenceScore);
        result.setMotherRejectionScore(motherRejectionScore);
        result.setMotherFavoritismScore(motherFavoritismScore);
        result.setMotherWarmthMean(motherWarmthMean);
        result.setMotherPunishmentMean(motherPunishmentMean);
        result.setMotherInterferenceMean(motherInterferenceMean);
        result.setMotherRejectionMean(motherRejectionMean);
        result.setMotherFavoritismMean(motherFavoritismMean);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的EMBU父母教养方式量表测试结果：\n\n");

        message.append("父亲教养方式分析：\n");
        message.append(String.format("情感温暖、理解: 总分%.1f, 均分%.2f (常模%.2f)\n",
                fatherWarmthScore, fatherWarmthMean, FATHER_WARMTH_NORM));
        message.append(String.format("惩罚、严厉: 总分%.1f, 均分%.2f (常模%.2f)\n",
                fatherPunishmentScore, fatherPunishmentMean, FATHER_PUNISHMENT_NORM));
        message.append(String.format("过分干涉: 总分%.1f, 均分%.2f (常模%.2f)\n",
                fatherInterferenceScore, fatherInterferenceMean, FATHER_INTERFERENCE_NORM));
        message.append(String.format("拒绝、否认: 总分%.1f, 均分%.2f (常模%.2f)\n",
                fatherRejectionScore, fatherRejectionMean, FATHER_REJECTION_NORM));
        message.append(String.format("偏爱被试: 总分%.1f, 均分%.2f (常模%.2f)\n\n",
                fatherFavoritismScore, fatherFavoritismMean, FATHER_FAVORITISM_NORM));

        message.append("母亲教养方式分析：\n");
        message.append(String.format("情感温暖、理解: 总分%.1f, 均分%.2f (常模%.2f)\n",
                motherWarmthScore, motherWarmthMean, MOTHER_WARMTH_NORM));
        message.append(String.format("惩罚、严厉: 总分%.1f, 均分%.2f (常模%.2f)\n",
                motherPunishmentScore, motherPunishmentMean, MOTHER_PUNISHMENT_NORM));
        message.append(String.format("过分干涉、过度保护: 总分%.1f, 均分%.2f (常模%.2f)\n",
                motherInterferenceScore, motherInterferenceMean, MOTHER_INTERFERENCE_NORM));
        message.append(String.format("拒绝、否认: 总分%.1f, 均分%.2f (常模%.2f)\n",
                motherRejectionScore, motherRejectionMean, MOTHER_REJECTION_NORM));
        message.append(String.format("偏爱被试: 总分%.1f, 均分%.2f (常模%.2f)\n\n",
                motherFavoritismScore, motherFavoritismMean, MOTHER_FAVORITISM_NORM));

        // 结果解释
        message.append("结果分析：\n");
        message.append("• 均分高于常模表示在该维度上表现较为突出\n");
        message.append("• 均分低于常模表示在该维度上表现相对较少\n\n");

        // 父亲教养方式特点
        message.append("父亲教养方式特点：\n");
        if (fatherWarmthMean > FATHER_WARMTH_NORM) {
            message.append("• 父亲给予较多的情感温暖和理解，有助于建立安全感。\n");
        } else {
            message.append("• 父亲的情感温暖和理解相对较少。\n");
        }

        if (fatherPunishmentMean > FATHER_PUNISHMENT_NORM) {
            message.append("• 父亲采用较多的惩罚和严厉管教方式。\n");
        }

        if (fatherInterferenceMean > FATHER_INTERFERENCE_NORM) {
            message.append("• 父亲对您的生活有较多的干涉和控制。\n");
        }

        if (fatherRejectionMean > FATHER_REJECTION_NORM) {
            message.append("• 父亲表现出较多的拒绝和否认态度。\n");
        }

        if (fatherFavoritismMean > FATHER_FAVORITISM_NORM) {
            message.append("• 父亲对您表现出明显的偏爱。\n");
        }
        message.append("\n");

        // 母亲教养方式特点
        message.append("母亲教养方式特点：\n");
        if (motherWarmthMean > MOTHER_WARMTH_NORM) {
            message.append("• 母亲给予较多的情感温暖和理解，有助于建立亲密关系。\n");
        } else {
            message.append("• 母亲的情感温暖和理解相对较少。\n");
        }

        if (motherPunishmentMean > MOTHER_PUNISHMENT_NORM) {
            message.append("• 母亲采用较多的惩罚和严厉管教方式。\n");
        }

        if (motherInterferenceMean > MOTHER_INTERFERENCE_NORM) {
            message.append("• 母亲对您有较多的干涉和过度保护。\n");
        }

        if (motherRejectionMean > MOTHER_REJECTION_NORM) {
            message.append("• 母亲表现出较多的拒绝和否认态度。\n");
        }

        if (motherFavoritismMean > MOTHER_FAVORITISM_NORM) {
            message.append("• 母亲对您表现出明显的偏爱。\n");
        }
        message.append("\n");

        // 总体评价
        message.append("总体评价：\n");
        int positiveFactors = 0;
        int negativeFactors = 0;

        if (fatherWarmthMean > FATHER_WARMTH_NORM) positiveFactors++;
        if (motherWarmthMean > MOTHER_WARMTH_NORM) positiveFactors++;
        if (fatherPunishmentMean > FATHER_PUNISHMENT_NORM) negativeFactors++;
        if (motherPunishmentMean > MOTHER_PUNISHMENT_NORM) negativeFactors++;
        if (fatherInterferenceMean > FATHER_INTERFERENCE_NORM) negativeFactors++;
        if (motherInterferenceMean > MOTHER_INTERFERENCE_NORM) negativeFactors++;
        if (fatherRejectionMean > FATHER_REJECTION_NORM) negativeFactors++;
        if (motherRejectionMean > MOTHER_REJECTION_NORM) negativeFactors++;

        if (positiveFactors > negativeFactors) {
            message.append("您的父母总体上采用了较为积极的教养方式，以情感温暖和理解为主。\n");
        } else if (positiveFactors < negativeFactors) {
            message.append("您的父母教养方式中以惩罚、干涉等消极方式较为突出。\n");
            message.append("这可能对您的个性发展产生一定影响，建议通过心理咨询等方式进行调适。\n");
        } else {
            message.append("您的父母教养方式较为均衡，既有积极方面也有需要改进的地方。\n");
        }

        message.append("\n温馨提示：父母教养方式对我们的成长有重要影响，理解这些模式有助于我们更好地认识自己。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * EMBU测试问题类
     * 注意：在实际实现中，需要修改PsychQuestionAnswer以支持父亲和母亲的分别回答
     * 这里简化处理，假设每个问题有两个回答（父亲和母亲）
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            EMBUResult result = new EMBUResult();

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
     * EMBU问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class EMBUResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * EMBU测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class EMBUReport extends PsychTestResult {
        // 父亲得分
        private float fatherWarmthScore;
        private float fatherPunishmentScore;
        private float fatherInterferenceScore;
        private float fatherRejectionScore;
        private float fatherFavoritismScore;

        // 父亲均分
        private float fatherWarmthMean;
        private float fatherPunishmentMean;
        private float fatherInterferenceMean;
        private float fatherRejectionMean;
        private float fatherFavoritismMean;

        // 母亲得分
        private float motherWarmthScore;
        private float motherPunishmentScore;
        private float motherInterferenceScore;
        private float motherRejectionScore;
        private float motherFavoritismScore;

        // 母亲均分
        private float motherWarmthMean;
        private float motherPunishmentMean;
        private float motherInterferenceMean;
        private float motherRejectionMean;
        private float motherFavoritismMean;
    }
}