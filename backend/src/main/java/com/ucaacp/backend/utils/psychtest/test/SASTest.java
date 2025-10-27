package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * SAS焦虑自测量表
 */
public class SASTest extends PsychTest {

    public SASTest() {
        super(14, "SAS焦虑自测量表", "用于评估焦虑症状的主观感受和严重程度");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用4点计分：1=很少，2=有时，3=经常，4=持续
        // 注意：第5、9、13、17、19题为反向计分题

        questions.add(new Question(1, "SAS-1", "觉得比平常容易紧张和着急", false, createFourPointOptions(), false));
        questions.add(new Question(2, "SAS-2", "无缘无故地感到害怕", false, createFourPointOptions(), false));
        questions.add(new Question(3, "SAS-3", "容易心里烦乱或觉得惊恐", false, createFourPointOptions(), false));
        questions.add(new Question(4, "SAS-4", "觉得可能要发疯", false, createFourPointOptions(), false));
        questions.add(new Question(5, "SAS-5", "觉得一切都很好，也不会发生什么不幸", false, createFourPointOptions(), true)); // 反向计分
        questions.add(new Question(6, "SAS-6", "手脚发抖打颤", false, createFourPointOptions(), false));
        questions.add(new Question(7, "SAS-7", "因为头痛、头颈痛和背痛而苦恼", false, createFourPointOptions(), false));
        questions.add(new Question(8, "SAS-8", "感觉容易衰弱和疲乏", false, createFourPointOptions(), false));
        questions.add(new Question(9, "SAS-9", "觉得心平气和，并且容易安静地坐着", false, createFourPointOptions(), true)); // 反向计分
        questions.add(new Question(10, "SAS-10", "觉得心跳得很快", false, createFourPointOptions(), false));
        questions.add(new Question(11, "SAS-11", "因为一阵阵头晕而苦恼", false, createFourPointOptions(), false));
        questions.add(new Question(12, "SAS-12", "有晕倒发作，或觉得要晕倒似的", false, createFourPointOptions(), false));
        questions.add(new Question(13, "SAS-13", "吸气呼气都感到很容易", false, createFourPointOptions(), true)); // 反向计分
        questions.add(new Question(14, "SAS-14", "手脚麻木和刺痛", false, createFourPointOptions(), false));
        questions.add(new Question(15, "SAS-15", "因为胃痛和消化不良而苦恼", false, createFourPointOptions(), false));
        questions.add(new Question(16, "SAS-16", "常常要小便", false, createFourPointOptions(), false));
        questions.add(new Question(17, "SAS-17", "手常常是干燥温暖的", false, createFourPointOptions(), true)); // 反向计分
        questions.add(new Question(18, "SAS-18", "脸红发热", false, createFourPointOptions(), false));
        questions.add(new Question(19, "SAS-19", "容易入睡并且睡得很好", false, createFourPointOptions(), true)); // 反向计分
        questions.add(new Question(20, "SAS-20", "做噩梦", false, createFourPointOptions(), false));

        // 补充题目（扩展至30题）
        questions.add(new Question(21, "SAS-21", "感到坐立不安，难以平静", false, createFourPointOptions(), false));
        questions.add(new Question(22, "SAS-22", "对平时感兴趣的事情失去兴趣", false, createFourPointOptions(), false));
        questions.add(new Question(23, "SAS-23", "感到喉咙哽咽，吞咽困难", false, createFourPointOptions(), false));
        questions.add(new Question(24, "SAS-24", "对未来感到悲观", false, createFourPointOptions(), false));
        questions.add(new Question(25, "SAS-25", "感到自己能够应对生活中的压力", false, createFourPointOptions(), true)); // 反向计分
        questions.add(new Question(26, "SAS-26", "注意力难以集中", false, createFourPointOptions(), false));
        questions.add(new Question(27, "SAS-27", "肌肉紧张或疼痛", false, createFourPointOptions(), false));
        questions.add(new Question(28, "SAS-28", "感到呼吸急促或窒息感", false, createFourPointOptions(), false));
        questions.add(new Question(29, "SAS-29", "对声音或光线特别敏感", false, createFourPointOptions(), false));
        questions.add(new Question(30, "SAS-30", "感到能够放松和享受生活", false, createFourPointOptions(), true)); // 反向计分
    }

    /**
     * 创建4点计分选项
     */
    private List<PsychOption> createFourPointOptions() {
        return List.of(
                new PsychOption("1", "很少(没有或很少时间)", 1),
                new PsychOption("2", "有时(少部分时间)", 2),
                new PsychOption("3", "经常(相当多时间)", 3),
                new PsychOption("4", "持续(绝大部分或全部时间)", 4)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算粗分
        float rawScore = 0;

        // 反向计分题目索引：5,9,13,17,19,25,30
        int[] reverseScoringIndices = {4, 8, 12, 16, 18, 24, 29};

        for (int i = 0; i < answer.size(); i++) {
            SASResult result = (SASResult) this.getQuestions().get(i).answer(answer.get(i));
            float questionScore = result.getScore();

            // 检查是否为反向计分题
            boolean isReverse = false;
            for (int index : reverseScoringIndices) {
                if (i == index) {
                    isReverse = true;
                    break;
                }
            }

            // 如果是反向计分题，需要转换分数：1->4, 2->3, 3->2, 4->1
            if (isReverse) {
                questionScore = 5 - questionScore; // 1->4, 2->3, 3->2, 4->1
            }

            rawScore += questionScore;
        }

        // 计算标准分 = 粗分 × 1.25
        float standardScore = rawScore * 1.25f;

        // 确定焦虑程度
        String anxietyLevel;
        String suggestion;

        if (standardScore < 50) {
            anxietyLevel = "正常范围";
            suggestion = "您的焦虑水平在正常范围内，请继续保持良好的心理状态。";
        } else if (standardScore < 60) {
            anxietyLevel = "轻度焦虑";
            suggestion = "您有轻度焦虑症状，建议适当放松，减少压力，保持规律作息。";
        } else if (standardScore < 70) {
            anxietyLevel = "中度焦虑";
            suggestion = "您有中度焦虑症状，建议寻求专业心理咨询，学习压力管理技巧。";
        } else {
            anxietyLevel = "重度焦虑";
            suggestion = "您有重度焦虑症状，强烈建议尽快寻求专业心理医生或精神科医生的帮助。";
        }

        SASReport result = new SASReport();
        result.setRawScore(rawScore);
        result.setStandardScore(standardScore);
        result.setAnxietyLevel(anxietyLevel);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("SAS焦虑自测量表测试结果：\n\n");

        message.append(String.format("粗分: %.1f\n", rawScore));
        message.append(String.format("标准分: %.1f\n", standardScore));
        message.append(String.format("焦虑程度: %s\n\n", anxietyLevel));

        message.append("分数说明（中国常模）：\n");
        message.append("• 50分以下：正常范围\n");
        message.append("• 50-59分：轻度焦虑\n");
        message.append("• 60-69分：中度焦虑\n");
        message.append("• 70分以上：重度焦虑\n\n");

        // 症状分析
        message.append("主要症状分析：\n");

        // 分析情绪症状
        float emotionalScore = 0;
        int[] emotionalIndices = {0, 1, 2, 3, 21, 22, 24}; // 情绪相关题目
        for (int index : emotionalIndices) {
            SASResult questionResult = (SASResult) this.getQuestions().get(index).answer(answer.get(index));
            emotionalScore += getAdjustedScore(questionResult.getScore(), index, reverseScoringIndices);
        }

        if (emotionalScore > emotionalIndices.length * 2) { // 平均分超过2分
            message.append("• 情绪症状：存在明显的紧张、害怕、烦躁等情绪问题\n");
        }

        // 分析躯体症状
        float physicalScore = 0;
        int[] physicalIndices = {5, 6, 9, 10, 11, 13, 14, 15, 17, 22, 26, 27, 28}; // 躯体相关题目
        for (int index : physicalIndices) {
            SASResult questionResult = (SASResult) this.getQuestions().get(index).answer(answer.get(index));
            physicalScore += getAdjustedScore(questionResult.getScore(), index, reverseScoringIndices);
        }

        if (physicalScore > physicalIndices.length * 2) {
            message.append("• 躯体症状：存在明显的身体不适，如心悸、头痛、肌肉紧张等\n");
        }

        // 分析睡眠问题
        float sleepScore = 0;
        int[] sleepIndices = {18, 19, 29}; // 睡眠相关题目
        for (int index : sleepIndices) {
            SASResult questionResult = (SASResult) this.getQuestions().get(index).answer(answer.get(index));
            sleepScore += getAdjustedScore(questionResult.getScore(), index, reverseScoringIndices);
        }

        if (sleepScore > sleepIndices.length * 2) {
            message.append("• 睡眠问题：存在入睡困难、睡眠质量差等问题\n");
        }

        message.append("\n建议：\n");
        message.append(suggestion);
        message.append("\n\n具体建议：\n");

        if (standardScore >= 50) {
            message.append("1. 学习放松技巧：深呼吸、渐进式肌肉放松等\n");
            message.append("2. 保持规律作息，确保充足睡眠\n");
            message.append("3. 适量运动，如散步、瑜伽等\n");
            message.append("4. 减少咖啡因和酒精摄入\n");
            message.append("5. 与亲友沟通，寻求社会支持\n");

            if (standardScore >= 60) {
                message.append("6. 考虑寻求专业心理咨询或治疗\n");
                message.append("7. 在医生指导下考虑药物治疗\n");
            }
        } else {
            message.append("1. 继续保持健康的生活方式\n");
            message.append("2. 学习压力管理技巧以备不时之需\n");
            message.append("3. 定期进行心理状态自我评估\n");
        }

        message.append("\n注意事项：\n");
        message.append("• 本测试反映最近一周的症状水平\n");
        message.append("• 测试结果仅供参考，不能替代专业诊断\n");
        message.append("• 如有严重症状，请及时就医\n");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * 获取调整后的分数（考虑反向计分）
     */
    private float getAdjustedScore(float score, int questionIndex, int[] reverseIndices) {
        for (int index : reverseIndices) {
            if (questionIndex == index) {
                return 5 - score; // 反向计分转换
            }
        }
        return score;
    }

    /**
     * SAS测试问题类
     */
    public static class Question extends PsychQuestion {
        private boolean reverseScoring; // 是否为反向计分题

        public Question(int id, String title, String content, boolean multiOptional,
                        List<PsychOption> options, boolean reverseScoring) {
            super(id, title, content, multiOptional, options);
            this.reverseScoring = reverseScoring;
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            SASResult result = new SASResult();
            result.setReverseScoring(this.reverseScoring);

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
     * SAS问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class SASResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
        private boolean reverseScoring;
    }

    /**
     * SAS测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class SASReport extends PsychTestResult {
        private float rawScore;        // 粗分
        private float standardScore;   // 标准分
        private String anxietyLevel;   // 焦虑程度
    }
}