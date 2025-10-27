package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * ECR亲密关系经历量表简化版（30题）
 */
public class ECRTest extends PsychTest {

    public ECRTest() {
        super(4, "ECR亲密关系经历量表", "成人依恋量表简化版，包含30个问题，评估亲密关系中的依恋风格");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用7点计分：1=非常不同意，2=不同意，3=有点不同意，4=中立
        // 5=有点同意，6=同意，7=非常同意

        // 依恋回避维度 (15题)
        questions.add(new Question(1, "ECR-1", "总的来说,我不喜欢让恋人知道自己内心深处的感觉", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(2, "ECR-2", "我觉得跟恋人亲近是一件惬意的事情", false, createSevenPointOptions(true))); // 反向(R)
        questions.add(new Question(3, "ECR-3", "当恋人开始要跟我亲近时,我发现我自己在退缩", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(4, "ECR-4", "当恋人希望跟我非常亲近时,我会觉得不自在", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(5, "ECR-5", "我觉得对恋人开诚布公,不是一件很舒服的事情", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(6, "ECR-6", "我想与恋人亲近,但我又总是会退缩不前", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(7, "ECR-7", "当恋人跟我过分亲密的时候,我会感到内心紧张", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(8, "ECR-8", "我愿意把我内心的想法和感觉告诉恋人,我觉得这是一件自在的事情", false, createSevenPointOptions(true))); // 反向(R)
        questions.add(new Question(9, "ECR-9", "我试图避免与恋人变得太亲近", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(10, "ECR-10", "我觉得我比较容易与恋人亲近", false, createSevenPointOptions(true))); // 反向(R)
        questions.add(new Question(11, "ECR-11", "我发现让我依赖恋人,是一件困难的事情", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(12, "ECR-12", "我倾向于不跟恋人过分亲密", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(13, "ECR-13", "我跟恋人什么事情都讲", false, createSevenPointOptions(true))); // 反向(R)
        questions.add(new Question(14, "ECR-14", "我觉得依赖恋人是很自在的事情", false, createSevenPointOptions(true))); // 反向(R)
        questions.add(new Question(15, "ECR-15", "我并不在意从恋人那里寻找安慰,听取劝告,得到帮助", false, createSevenPointOptions(true))); // 反向(R)

        // 依恋焦虑维度 (15题)
        questions.add(new Question(16, "ECR-16", "我担心我会被抛弃", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(17, "ECR-17", "我很担心我的恋爱关系", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(18, "ECR-18", "我担心恋人不会象我关心他(/她)那样地关心我", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(19, "ECR-19", "我有点担心会失去恋人", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(20, "ECR-20", "我常常希望恋人对我的感情和我对恋人的感情一样强烈", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(21, "ECR-21", "我常常想与恋人形影不离,但有时这样会把恋人吓跑", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(22, "ECR-22", "我担心一个人独处", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(23, "ECR-23", "我想跟恋人非常亲密的愿望,有时会把恋人吓跑", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(24, "ECR-24", "我需要我的恋人一再地保证他/她是爱我的", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(25, "ECR-25", "我觉得自己在要求恋人把更多的感觉,以及对恋爱关系的投入程度表现出来", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(26, "ECR-26", "我并不是常常担心被恋人抛弃", false, createSevenPointOptions(true))); // 反向(R)
        questions.add(new Question(27, "ECR-27", "如果我无法得到恋人的注意和关心,我会心烦意乱或者生气", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(28, "ECR-28", "我发现恋人并不愿意象我所想的那样跟我亲近", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(29, "ECR-29", "如果我还没有恋人的话,我会感到有点焦虑和不安", false, createSevenPointOptions(false))); // 正向
        questions.add(new Question(30, "ECR-30", "如果恋人不能象我所希望的那样在我身边时,我会感到灰心丧气", false, createSevenPointOptions(false))); // 正向
    }

    /**
     * 创建7点计分选项
     * @param isReverse 是否为反向计分题
     */
    private List<PsychOption> createSevenPointOptions(boolean isReverse) {
        if (isReverse) {
            // 反向计分：1=7, 2=6, 3=5, 4=4, 5=3, 6=2, 7=1
            return List.of(
                    new PsychOption("1", "非常不同意", 7),
                    new PsychOption("2", "不同意", 6),
                    new PsychOption("3", "有点不同意", 5),
                    new PsychOption("4", "中立", 4),
                    new PsychOption("5", "有点同意", 3),
                    new PsychOption("6", "同意", 2),
                    new PsychOption("7", "非常同意", 1)
            );
        } else {
            // 正向计分
            return List.of(
                    new PsychOption("1", "非常不同意", 1),
                    new PsychOption("2", "不同意", 2),
                    new PsychOption("3", "有点不同意", 3),
                    new PsychOption("4", "中立", 4),
                    new PsychOption("5", "有点同意", 5),
                    new PsychOption("6", "同意", 6),
                    new PsychOption("7", "非常同意", 7)
            );
        }
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        float avoidanceScore = 0;  // 依恋回避维度得分
        float anxietyScore = 0;    // 依恋焦虑维度得分

        // 计算各维度得分
        // 依恋回避维度：1-15题
        for (int i = 0; i < 15; i++) {
            ECRResult result = (ECRResult) this.getQuestions().get(i).answer(answer.get(i));
            avoidanceScore += result.getScore();
        }

        // 依恋焦虑维度：16-30题
        for (int i = 15; i < 30; i++) {
            ECRResult result = (ECRResult) this.getQuestions().get(i).answer(answer.get(i));
            anxietyScore += result.getScore();
        }

        // 计算维度均分
        float avoidanceMean = avoidanceScore / 15;
        float anxietyMean = anxietyScore / 15;

        // 使用费舍尔线性判别公式计算四种依恋类型得分
        float M1 = avoidanceMean * 3.2893296f + anxietyMean * 5.4725318f - 11.5307833f;  // 安全性
        float M2 = avoidanceMean * 7.2371075f + anxietyMean * 8.1776448f - 32.3553266f;  // 恐惧性
        float M3 = avoidanceMean * 3.9246754f + anxietyMean * 9.7102446f - 28.4573220f;  // 专注性
        float M4 = avoidanceMean * 7.3654621f + anxietyMean * 4.9392039f - 22.2281088f;  // 冷漠性

        // 确定主要依恋类型
        String primaryType = "安全型";
        float maxScore = M1;

        if (M2 > maxScore) {
            maxScore = M2;
            primaryType = "恐惧型";
        }
        if (M3 > maxScore) {
            maxScore = M3;
            primaryType = "专注型";
        }
        if (M4 > maxScore) {
            primaryType = "冷漠型";
        }

        ECRReport result = new ECRReport();
        result.setAvoidanceScore(avoidanceScore);
        result.setAnxietyScore(anxietyScore);
        result.setAvoidanceMean(avoidanceMean);
        result.setAnxietyMean(anxietyMean);
        result.setSecurityScore(M1);
        result.setFearScore(M2);
        result.setPreoccupiedScore(M3);
        result.setDismissingScore(M4);
        result.setPrimaryType(primaryType);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的ECR亲密关系经历量表测试结果：\n\n");
        message.append(String.format("依恋回避维度: 总分%.1f, 均分%.2f\n", avoidanceScore, avoidanceMean));
        message.append(String.format("依恋焦虑维度: 总分%.1f, 均分%.2f\n\n", anxietyScore, anxietyMean));

        message.append("四种依恋类型得分：\n");
        message.append(String.format("安全型: %.2f\n", M1));
        message.append(String.format("恐惧型: %.2f\n", M2));
        message.append(String.format("专注型: %.2f\n", M3));
        message.append(String.format("冷漠型: %.2f\n\n", M4));

        message.append("主要依恋类型：").append(primaryType).append("\n\n");

        // 依恋类型详细解释
        message.append("依恋类型解释：\n");
        switch (primaryType) {
            case "安全型":
                message.append("• 您在亲密关系中感到舒适，既能够享受亲密，也能够保持独立。\n");
                message.append("• 您对伴侣信任，不担心被抛弃，也不过度依赖。\n");
                message.append("• 这是最健康的依恋风格，有助于建立稳定、满意的亲密关系。\n");
                break;
            case "恐惧型":
                message.append("• 您渴望亲密关系，但又害怕被伤害，表现出矛盾的行为。\n");
                message.append("• 您可能既想接近伴侣，又会在关系变得亲密时退缩。\n");
                message.append("• 建议：学习信任他人，逐步建立安全感。\n");
                break;
            case "专注型":
                message.append("• 您极度渴望亲密关系，担心被抛弃，需要持续的保证和关注。\n");
                message.append("• 您可能在关系中表现出过度依赖和焦虑。\n");
                message.append("• 建议：培养自我价值感，学习独立和自我安抚。\n");
                break;
            case "冷漠型":
                message.append("• 您重视独立性，可能避免亲密关系或在关系中保持情感距离。\n");
                message.append("• 您可能不太需要亲密关系，或者难以表达情感需求。\n");
                message.append("• 建议：尝试逐步开放自己，学习表达情感需求。\n");
                break;
        }

        message.append("\n");

        // 维度分析
        message.append("维度分析：\n");
        if (avoidanceMean < 3.5 && anxietyMean < 3.5) {
            message.append("• 您的依恋回避和焦虑水平都较低，表现出典型的安全型依恋特征。\n");
        } else if (avoidanceMean < 3.5 && anxietyMean >= 3.5) {
            message.append("• 您的依恋回避较低但焦虑较高，表现出专注型依恋特征。\n");
        } else if (avoidanceMean >= 3.5 && anxietyMean < 3.5) {
            message.append("• 您的依恋回避较高但焦虑较低，表现出冷漠型依恋特征。\n");
        } else {
            message.append("• 您的依恋回避和焦虑水平都较高，表现出恐惧型依恋特征。\n");
        }

        message.append("\n");
        message.append("温馨提示：依恋风格不是固定不变的，通过自我觉察和积极改变，可以发展出更安全的依恋模式。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * ECR测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            ECRResult result = new ECRResult();

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
     * ECR问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class ECRResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * ECR测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class ECRReport extends PsychTestResult {
        private float avoidanceScore;      // 依恋回避总分
        private float anxietyScore;        // 依恋焦虑总分
        private float avoidanceMean;       // 依恋回避均分
        private float anxietyMean;         // 依恋焦虑均分
        private float securityScore;       // 安全型得分
        private float fearScore;           // 恐惧型得分
        private float preoccupiedScore;    // 专注型得分
        private float dismissingScore;     // 冷漠型得分
        private String primaryType;        // 主要依恋类型
    }
}