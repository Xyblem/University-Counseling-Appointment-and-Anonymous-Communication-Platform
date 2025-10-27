package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * AAS成人依恋量表扩展版（30题）
 */
public class AASTest extends PsychTest {

    public AASTest() {
        super(10, "AAS成人依恋量表", "成人依恋量表扩展版，包含30个问题，评估成人依恋风格");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用5点计分：1=完全不符合，2=较不符合，3=不能确定，4=较符合，5=完全符合

        // 原量表18题
        questions.add(new Question(1, "AAS-1", "我发现与人亲近比较容易", false, createFivePointOptions()));
        questions.add(new Question(2, "AAS-2", "我发现要我去依赖别人很困难", true, createFivePointOptions())); // 反向
        questions.add(new Question(3, "AAS-3", "我时常担心情侣并不真心爱我", false, createFivePointOptions()));
        questions.add(new Question(4, "AAS-4", "我发现别人并不愿像我希望的那样亲近我", false, createFivePointOptions()));
        questions.add(new Question(5, "AAS-5", "能依赖别人让我感到很舒服", false, createFivePointOptions()));
        questions.add(new Question(6, "AAS-6", "我不在乎别人太亲近我", false, createFivePointOptions()));
        questions.add(new Question(7, "AAS-7", "我发现当我需要别人帮助时，没人会帮我", true, createFivePointOptions())); // 反向
        questions.add(new Question(8, "AAS-8", "和别人亲近使我感到有些不舒服", true, createFivePointOptions())); // 反向
        questions.add(new Question(9, "AAS-9", "我时常担心情侣不想和我在一起", false, createFivePointOptions()));
        questions.add(new Question(10, "AAS-10", "当我对别人表达我的情感时，我害怕他们与我的感觉会不一样", false, createFivePointOptions()));
        questions.add(new Question(11, "AAS-11", "我时常怀疑情侣是否真正关心我", false, createFivePointOptions()));
        questions.add(new Question(12, "AAS-12", "我对别人建立亲密的关系感到很舒服", false, createFivePointOptions()));
        questions.add(new Question(13, "AAS-13", "当有人在情感上太亲近我时，我感到不舒服", true, createFivePointOptions())); // 反向
        questions.add(new Question(14, "AAS-14", "我知道当我需要别人帮助时，总有人会帮我", false, createFivePointOptions()));
        questions.add(new Question(15, "AAS-15", "我想与人亲近，但担心自己会受到伤害", false, createFivePointOptions()));
        questions.add(new Question(16, "AAS-16", "我发现我很难完全信赖别人", true, createFivePointOptions())); // 反向
        questions.add(new Question(17, "AAS-17", "情侣想要我在情感上更亲近一些，这常使我感到不舒服", true, createFivePointOptions())); // 反向
        questions.add(new Question(18, "AAS-18", "我不能肯定，在我需要时，总找得到可以依赖的人", true, createFivePointOptions())); // 反向

        // 扩展12题，保持三个维度的平衡
        // 亲近维度扩展
        questions.add(new Question(19, "AAS-19", "在亲密关系中，我感到自在和放松", false, createFivePointOptions()));
        questions.add(new Question(20, "AAS-20", "与他人分享内心感受对我来说很自然", false, createFivePointOptions()));
        questions.add(new Question(21, "AAS-21", "我喜欢与亲密的人保持一定的情感距离", true, createFivePointOptions())); // 反向
        questions.add(new Question(22, "AAS-22", "在关系中表达情感对我来说很容易", false, createFivePointOptions()));

        // 依赖维度扩展
        questions.add(new Question(23, "AAS-23", "在困难时寻求他人帮助让我感到安心", false, createFivePointOptions()));
        questions.add(new Question(24, "AAS-24", "我宁愿独自解决问题也不愿依赖他人", true, createFivePointOptions())); // 反向
        questions.add(new Question(25, "AAS-25", "相信他人会在我需要时支持我", false, createFivePointOptions()));
        questions.add(new Question(26, "AAS-26", "接受他人的帮助让我感到不适", true, createFivePointOptions())); // 反向

        // 焦虑维度扩展
        questions.add(new Question(27, "AAS-27", "我经常担心会被重要的人抛弃", false, createFivePointOptions()));
        questions.add(new Question(28, "AAS-28", "在关系中，我很少担心对方会离开我", true, createFivePointOptions())); // 反向
        questions.add(new Question(29, "AAS-29", "我需要频繁的确认关系是安全的", false, createFivePointOptions()));
        questions.add(new Question(30, "AAS-30", "我对关系的稳定性充满信心", true, createFivePointOptions())); // 反向
    }

    /**
     * 创建5点计分选项
     */
    private List<PsychOption> createFivePointOptions() {
        return List.of(
                new PsychOption("1", "完全不符合", 1),
                new PsychOption("2", "较不符合", 2),
                new PsychOption("3", "不能确定", 3),
                new PsychOption("4", "较符合", 4),
                new PsychOption("5", "完全符合", 5)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算三个分量表得分
        float closenessScore = 0;      // 亲近分量表
        float dependenceScore = 0;     // 依赖分量表
        float anxietyScore = 0;        // 焦虑分量表

        // 亲近分量表题目索引 (原量表6题 + 扩展4题 = 10题)
        int[] closenessIndices = {0, 5, 7, 11, 12, 16, 18, 19, 20, 21}; // 1,6,8,12,13,17,19,20,21,22题
        // 依赖分量表题目索引 (原量表6题 + 扩展4题 = 10题)
        int[] dependenceIndices = {1, 4, 6, 13, 15, 17, 22, 23, 24, 25}; // 2,5,7,14,16,18,23,24,25,26题
        // 焦虑分量表题目索引 (原量表6题 + 扩展4题 = 10题)
        int[] anxietyIndices = {2, 3, 8, 9, 10, 14, 26, 27, 28, 29}; // 3,4,9,10,11,15,27,28,29,30题

        // 计算亲近分量表得分（反向题目需要反向计分）
        for (int index : closenessIndices) {
            AASResult result = (AASResult) this.getQuestions().get(index).answer(answer.get(index));
            float score = result.getScore();
            // 判断是否为反向题目
            if (index == 7 || index == 12 || index == 16 || index == 21) { // 8,13,17,21题是反向
                score = 6 - score; // 5点量表，6-得分实现反向
            }
            closenessScore += score;
        }

        // 计算依赖分量表得分（反向题目需要反向计分）
        for (int index : dependenceIndices) {
            AASResult result = (AASResult) this.getQuestions().get(index).answer(answer.get(index));
            float score = result.getScore();
            // 判断是否为反向题目
            if (index == 1 || index == 6 || index == 15 || index == 17 || index == 24 || index == 25) { // 2,7,16,18,24,26题是反向
                score = 6 - score;
            }
            dependenceScore += score;
        }

        // 计算焦虑分量表得分（反向题目需要反向计分）
        for (int index : anxietyIndices) {
            AASResult result = (AASResult) this.getQuestions().get(index).answer(answer.get(index));
            float score = result.getScore();
            // 判断是否为反向题目
            if (index == 28 || index == 29) { // 28,30题是反向
                score = 6 - score;
            }
            anxietyScore += score;
        }

        // 计算各分量表平均分
        float closenessMean = closenessScore / closenessIndices.length;
        float dependenceMean = dependenceScore / dependenceIndices.length;
        float anxietyMean = anxietyScore / anxietyIndices.length;

        // 计算亲近依赖复合维度
        float closenessDependenceMean = (closenessScore + dependenceScore) / (closenessIndices.length + dependenceIndices.length);

        // 确定依恋类型
        String attachmentStyle = determineAttachmentStyle(closenessDependenceMean, anxietyMean);

        AASReport result = new AASReport();

        // 设置各分量表得分
        result.setClosenessScore(closenessScore);
        result.setDependenceScore(dependenceScore);
        result.setAnxietyScore(anxietyScore);
        result.setClosenessMean(closenessMean);
        result.setDependenceMean(dependenceMean);
        result.setAnxietyMean(anxietyMean);
        result.setClosenessDependenceMean(closenessDependenceMean);
        result.setAttachmentStyle(attachmentStyle);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("AAS成人依恋量表测试结果：\n\n");

        message.append(String.format("亲近分量表: 总分%.1f, 均分%.2f\n", closenessScore, closenessMean));
        message.append(String.format("依赖分量表: 总分%.1f, 均分%.2f\n", dependenceScore, dependenceMean));
        message.append(String.format("焦虑分量表: 总分%.1f, 均分%.2f\n", anxietyScore, anxietyMean));
        message.append(String.format("亲近依赖复合维度均分: %.2f\n\n", closenessDependenceMean));

        message.append("您的依恋类型：").append(attachmentStyle).append("\n\n");

        // 依恋类型详细解释
        message.append("依恋类型分析：\n");
        switch (attachmentStyle) {
            case "安全型":
                message.append("• 您对亲密关系感到舒适，既能享受亲密也能保持独立\n");
                message.append("• 在关系中能够建立健康的界限和信任\n");
                message.append("• 通常能够有效处理关系中的冲突和压力\n");
                break;
            case "先占型":
                message.append("• 您渴望亲密关系但常常担心被抛弃\n");
                message.append("• 可能在关系中过度寻求 reassurance（保证）\n");
                message.append("• 建议学习自我安抚技巧，建立内在安全感\n");
                break;
            case "拒绝型":
                message.append("• 您重视独立和自给自足，可能回避亲密关系\n");
                message.append("• 在情感上可能保持距离，不愿依赖他人\n");
                message.append("• 建议尝试适度开放，体验健康依赖的益处\n");
                break;
            case "恐惧型":
                message.append("• 您既渴望亲密又害怕受伤，处于矛盾状态\n");
                message.append("• 可能在关系中表现出犹豫和不确定\n");
                message.append("• 建议逐步建立信任，处理过去的创伤经历\n");
                break;
        }

        message.append("\n各维度分析：\n");

        // 亲近维度分析
        if (closenessMean > 3.5) {
            message.append("• 亲近维度：您对情感亲近感到舒适，能够建立亲密关系\n");
        } else if (closenessMean > 2.5) {
            message.append("• 亲近维度：您对亲近有一定舒适度，但可能有所保留\n");
        } else {
            message.append("• 亲近维度：您对情感亲近感到不适，可能回避亲密\n");
        }

        // 依赖维度分析
        if (dependenceMean > 3.5) {
            message.append("• 依赖维度：您能够健康地依赖他人，接受支持\n");
        } else if (dependenceMean > 2.5) {
            message.append("• 依赖维度：您在依赖他人方面有所保留\n");
        } else {
            message.append("• 依赖维度：您倾向于独立自主，不愿依赖他人\n");
        }

        // 焦虑维度分析
        if (anxietyMean > 3.5) {
            message.append("• 焦虑维度：您在关系中容易感到焦虑和不安\n");
        } else if (anxietyMean > 2.5) {
            message.append("• 焦虑维度：您偶有关系焦虑，但总体可控\n");
        } else {
            message.append("• 焦虑维度：您在关系中感到安全，很少焦虑\n");
        }

        message.append("\n发展建议：\n");
        if ("安全型".equals(attachmentStyle)) {
            message.append("继续保持健康的沟通模式，您的依恋风格有助于建立稳定关系。\n");
        } else {
            message.append("了解自己的依恋模式是改善关系的第一步。建议：\n");
            message.append("1. 增强自我觉察，识别在关系中的自动反应模式\n");
            message.append("2. 学习有效的沟通技巧，表达需求和感受\n");
            message.append("3. 如有需要，可寻求专业心理咨询师的帮助\n");
        }

        message.append("\n温馨提示：依恋模式不是固定不变的，通过自我觉察和积极改变，可以发展出更安全的依恋方式。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * 确定依恋类型
     */
    private String determineAttachmentStyle(float closenessDependenceMean, float anxietyMean) {
        if (closenessDependenceMean > 3 && anxietyMean < 3) {
            return "安全型";
        } else if (closenessDependenceMean > 3 && anxietyMean > 3) {
            return "先占型";
        } else if (closenessDependenceMean < 3 && anxietyMean < 3) {
            return "拒绝型";
        } else {
            return "恐惧型";
        }
    }

    /**
     * AAS测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            AASResult result = new AASResult();

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
     * AAS问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class AASResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * AAS测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class AASReport extends PsychTestResult {
        // 各分量表得分
        private float closenessScore;
        private float dependenceScore;
        private float anxietyScore;

        // 各分量表均分
        private float closenessMean;
        private float dependenceMean;
        private float anxietyMean;

        // 亲近依赖复合维度均分
        private float closenessDependenceMean;

        // 依恋类型
        private String attachmentStyle;
    }
}