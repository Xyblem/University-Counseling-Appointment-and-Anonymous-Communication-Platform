package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * SCL-90症状自测量表简化版（30题）
 */
public class SCL90Test extends PsychTest {

    public SCL90Test() {
        super(15, "SCL-90症状自测量表", "90项症状清单简化版，评估心理症状的严重程度");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用5点计分：1=没有，2=很轻，3=中等，4=偏重，5=严重

        // 躯体化因子 (3题)
        questions.add(new Question(1, "SCL-1", "头痛", false, createFivePointOptions()));
        questions.add(new Question(2, "SCL-2", "头昏或昏倒", false, createFivePointOptions()));
        questions.add(new Question(3, "SCL-3", "腰痛", false, createFivePointOptions()));

        // 强迫症状因子 (3题)
        questions.add(new Question(4, "SCL-4", "头脑中有不必要的想法或字句盘旋", false, createFivePointOptions()));
        questions.add(new Question(5, "SCL-5", "忘记性大", false, createFivePointOptions()));
        questions.add(new Question(6, "SCL-6", "做事必须反复检查", false, createFivePointOptions()));

        // 人际关系敏感因子 (3题)
        questions.add(new Question(7, "SCL-7", "对旁人责备求全", false, createFivePointOptions()));
        questions.add(new Question(8, "SCL-8", "同异性相处时感到害羞不自在", false, createFivePointOptions()));
        questions.add(new Question(9, "SCL-9", "感到比不上他人", false, createFivePointOptions()));

        // 抑郁因子 (3题)
        questions.add(new Question(10, "SCL-10", "对异性的兴趣减退", false, createFivePointOptions()));
        questions.add(new Question(11, "SCL-11", "感到孤独", false, createFivePointOptions()));
        questions.add(new Question(12, "SCL-12", "感到苦闷", false, createFivePointOptions()));

        // 焦虑因子 (3题)
        questions.add(new Question(13, "SCL-13", "神经过敏，心中不踏实", false, createFivePointOptions()));
        questions.add(new Question(14, "SCL-14", "无缘无故地突然感到害怕", false, createFivePointOptions()));
        questions.add(new Question(15, "SCL-15", "心跳得很厉害", false, createFivePointOptions()));

        // 敌对因子 (3题)
        questions.add(new Question(16, "SCL-16", "容易烦恼和激动", false, createFivePointOptions()));
        questions.add(new Question(17, "SCL-17", "自己不能控制地大发脾气", false, createFivePointOptions()));
        questions.add(new Question(18, "SCL-18", "有想打人或伤害他人的冲动", false, createFivePointOptions()));

        // 恐怖因子 (3题)
        questions.add(new Question(19, "SCL-19", "害怕空旷的场所或街道", false, createFivePointOptions()));
        questions.add(new Question(20, "SCL-20", "怕单独出门", false, createFivePointOptions()));
        questions.add(new Question(21, "SCL-21", "在商店或电影院等人多的地方感到不自在", false, createFivePointOptions()));

        // 偏执因子 (3题)
        questions.add(new Question(22, "SCL-22", "责怪别人制造麻烦", false, createFivePointOptions()));
        questions.add(new Question(23, "SCL-23", "感到大多数人都不可信任", false, createFivePointOptions()));
        questions.add(new Question(24, "SCL-24", "感到别人想占您的便宜", false, createFivePointOptions()));

        // 精神病性因子 (3题)
        questions.add(new Question(25, "SCL-25", "感到别人能控制你的思想", false, createFivePointOptions()));
        questions.add(new Question(26, "SCL-26", "听到旁人听不到的声音", false, createFivePointOptions()));
        questions.add(new Question(27, "SCL-27", "有一些别人没有的想法或念头", false, createFivePointOptions()));

        // 其他因子（睡眠饮食）(3题)
        questions.add(new Question(28, "SCL-28", "胃口不好", false, createFivePointOptions()));
        questions.add(new Question(29, "SCL-29", "难以入睡", false, createFivePointOptions()));
        questions.add(new Question(30, "SCL-30", "睡得不稳不深", false, createFivePointOptions()));
    }

    /**
     * 创建5点计分选项
     */
    private List<PsychOption> createFivePointOptions() {
        return List.of(
                new PsychOption("1", "没有", 1),
                new PsychOption("2", "很轻", 2),
                new PsychOption("3", "中等", 3),
                new PsychOption("4", "偏重", 4),
                new PsychOption("5", "严重", 5)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算总分和各项指标
        float totalScore = 0;
        int positiveItems = 0; // 阳性项目数（得分≥2）
        int negativeItems = 0; // 阴性项目数（得分=1）

        // 各因子得分
        float somatizationScore = 0;        // 躯体化 (1-3题)
        float obsessiveCompulsiveScore = 0; // 强迫症状 (4-6题)
        float interpersonalScore = 0;       // 人际关系敏感 (7-9题)
        float depressionScore = 0;          // 抑郁 (10-12题)
        float anxietyScore = 0;             // 焦虑 (13-15题)
        float hostilityScore = 0;           // 敌对 (16-18题)
        float phobicAnxietyScore = 0;       // 恐怖 (19-21题)
        float paranoidScore = 0;            // 偏执 (22-24题)
        float psychoticismScore = 0;        // 精神病性 (25-27题)
        float additionalScore = 0;          // 其他 (28-30题)

        // 计算总分和各因子得分
        for (int i = 0; i < answer.size(); i++) {
            SCL90Result result = (SCL90Result) this.getQuestions().get(i).answer(answer.get(i));
            float score = result.getScore();
            totalScore += score;

            // 统计阳性和阴性项目
            if (score >= 2) {
                positiveItems++;
            } else if (score == 1) {
                negativeItems++;
            }

            // 分配到各因子
            if (i < 3) { // 1-3题：躯体化
                somatizationScore += score;
            } else if (i < 6) { // 4-6题：强迫症状
                obsessiveCompulsiveScore += score;
            } else if (i < 9) { // 7-9题：人际关系敏感
                interpersonalScore += score;
            } else if (i < 12) { // 10-12题：抑郁
                depressionScore += score;
            } else if (i < 15) { // 13-15题：焦虑
                anxietyScore += score;
            } else if (i < 18) { // 16-18题：敌对
                hostilityScore += score;
            } else if (i < 21) { // 19-21题：恐怖
                phobicAnxietyScore += score;
            } else if (i < 24) { // 22-24题：偏执
                paranoidScore += score;
            } else if (i < 27) { // 25-27题：精神病性
                psychoticismScore += score;
            } else { // 28-30题：其他
                additionalScore += score;
            }
        }

        // 计算因子均分（每个因子3题，总分除以3）
        float somatizationMean = somatizationScore / 3;
        float obsessiveCompulsiveMean = obsessiveCompulsiveScore / 3;
        float interpersonalMean = interpersonalScore / 3;
        float depressionMean = depressionScore / 3;
        float anxietyMean = anxietyScore / 3;
        float hostilityMean = hostilityScore / 3;
        float phobicAnxietyMean = phobicAnxietyScore / 3;
        float paranoidMean = paranoidScore / 3;
        float psychoticismMean = psychoticismScore / 3;
        float additionalMean = additionalScore / 3;

        // 计算总均分和阳性症状均分
        float totalMean = totalScore / 30;
        float positiveSymptomMean = positiveItems > 0 ? (totalScore - negativeItems) / positiveItems : 0;

        // 评估结果
        boolean screeningPositive = totalScore > 80 || positiveItems > 15 ||
                somatizationMean > 2 || obsessiveCompulsiveMean > 2 ||
                interpersonalMean > 2 || depressionMean > 2 ||
                anxietyMean > 2 || hostilityMean > 2 ||
                phobicAnxietyMean > 2 || paranoidMean > 2 ||
                psychoticismMean > 2;

        SCL90Report result = new SCL90Report();

        // 设置总分指标
        result.setTotalScore(totalScore);
        result.setTotalMean(totalMean);
        result.setPositiveItems(positiveItems);
        result.setNegativeItems(negativeItems);
        result.setPositiveSymptomMean(positiveSymptomMean);
        result.setScreeningPositive(screeningPositive);

        // 设置因子得分
        result.setSomatizationScore(somatizationScore);
        result.setObsessiveCompulsiveScore(obsessiveCompulsiveScore);
        result.setInterpersonalScore(interpersonalScore);
        result.setDepressionScore(depressionScore);
        result.setAnxietyScore(anxietyScore);
        result.setHostilityScore(hostilityScore);
        result.setPhobicAnxietyScore(phobicAnxietyScore);
        result.setParanoidScore(paranoidScore);
        result.setPsychoticismScore(psychoticismScore);
        result.setAdditionalScore(additionalScore);

        // 设置因子均分
        result.setSomatizationMean(somatizationMean);
        result.setObsessiveCompulsiveMean(obsessiveCompulsiveMean);
        result.setInterpersonalMean(interpersonalMean);
        result.setDepressionMean(depressionMean);
        result.setAnxietyMean(anxietyMean);
        result.setHostilityMean(hostilityMean);
        result.setPhobicAnxietyMean(phobicAnxietyMean);
        result.setParanoidMean(paranoidMean);
        result.setPsychoticismMean(psychoticismMean);
        result.setAdditionalMean(additionalMean);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("SCL-90症状自测量表测试结果：\n\n");

        message.append("总体指标：\n");
        message.append(String.format("总分: %.1f\n", totalScore));
        message.append(String.format("总均分: %.2f\n", totalMean));
        message.append(String.format("阳性项目数: %d\n", positiveItems));
        message.append(String.format("阴性项目数: %d\n", negativeItems));
        message.append(String.format("阳性症状均分: %.2f\n\n", positiveSymptomMean));

        message.append("各因子得分（均分）：\n");
        message.append(String.format("躯体化: %.2f (临界值2分)\n", somatizationMean));
        message.append(String.format("强迫症状: %.2f (临界值2分)\n", obsessiveCompulsiveMean));
        message.append(String.format("人际关系敏感: %.2f (临界值2分)\n", interpersonalMean));
        message.append(String.format("抑郁: %.2f (临界值2分)\n", depressionMean));
        message.append(String.format("焦虑: %.2f (临界值2分)\n", anxietyMean));
        message.append(String.format("敌对: %.2f (临界值2分)\n", hostilityMean));
        message.append(String.format("恐怖: %.2f (临界值2分)\n", phobicAnxietyMean));
        message.append(String.format("偏执: %.2f (临界值2分)\n", paranoidMean));
        message.append(String.format("精神病性: %.2f (临界值2分)\n", psychoticismMean));
        message.append(String.format("其他(睡眠饮食): %.2f\n\n", additionalMean));

        // 筛查结果
        message.append("筛查结果：");
        if (screeningPositive) {
            message.append("阳性（建议进一步评估）\n\n");
        } else {
            message.append("阴性\n\n");
        }

        // 症状分析
        message.append("症状分析：\n");

        if (somatizationMean > 2) {
            message.append("• 躯体化：存在明显的身体不适感，如头痛、腰痛等\n");
        }

        if (obsessiveCompulsiveMean > 2) {
            message.append("• 强迫症状：存在无法摆脱的无意义思想或行为\n");
        }

        if (interpersonalMean > 2) {
            message.append("• 人际关系敏感：在人际交往中感到不自在和自卑\n");
        }

        if (depressionMean > 2) {
            message.append("• 抑郁：情绪低落，兴趣减退，可能有悲观想法\n");
        }

        if (anxietyMean > 2) {
            message.append("• 焦虑：感到紧张、害怕、心神不宁\n");
        }

        if (hostilityMean > 2) {
            message.append("• 敌对：容易烦恼、发脾气，有攻击冲动\n");
        }

        if (phobicAnxietyMean > 2) {
            message.append("• 恐怖：对某些场所或情境感到恐惧\n");
        }

        if (paranoidMean > 2) {
            message.append("• 偏执：有多疑、猜忌倾向\n");
        }

        if (psychoticismMean > 2) {
            message.append("• 精神病性：可能有幻觉、妄想等症状\n");
        }

        if (additionalMean > 2) {
            message.append("• 睡眠饮食：存在明显的睡眠或饮食问题\n");
        }

        // 总体评估
        message.append("\n总体评估：\n");
        if (totalMean < 1.5) {
            message.append("您的心理症状很轻微，总体心理健康状况良好。\n");
        } else if (totalMean < 2.5) {
            message.append("您有一些心理症状，程度为轻到中度，建议关注心理健康。\n");
        } else if (totalMean < 3.5) {
            message.append("您的心理症状较为明显，程度为中到严重，建议寻求专业帮助。\n");
        } else {
            message.append("您的心理症状严重，强烈建议尽快寻求专业心理医生的评估和治疗。\n");
        }

        // 建议
        message.append("\n建议：\n");
        if (screeningPositive) {
            message.append("1. 建议到专业精神卫生机构进行详细评估\n");
            message.append("2. 根据具体症状寻求相应的心理治疗\n");
            message.append("3. 在医生指导下考虑是否需要药物治疗\n");
            message.append("4. 学习压力管理和情绪调节技巧\n");
        } else {
            message.append("1. 继续保持良好的心理状态\n");
            message.append("2. 学习心理健康知识，预防心理问题\n");
            message.append("3. 如有需要，可定期进行心理状态评估\n");
        }

        message.append("\n注意事项：\n");
        message.append("• 本测试为简化版本，结果仅供参考\n");
        message.append("• 不能替代专业医生的诊断\n");
        message.append("• 如有严重症状，请及时就医\n");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * SCL-90测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            SCL90Result result = new SCL90Result();

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
     * SCL-90问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class SCL90Result extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * SCL-90测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class SCL90Report extends PsychTestResult {
        // 总分指标
        private float totalScore;            // 总分
        private float totalMean;             // 总均分
        private int positiveItems;           // 阳性项目数
        private int negativeItems;           // 阴性项目数
        private float positiveSymptomMean;   // 阳性症状均分
        private boolean screeningPositive;   // 筛查是否阳性

        // 各因子得分
        private float somatizationScore;        // 躯体化
        private float obsessiveCompulsiveScore; // 强迫症状
        private float interpersonalScore;       // 人际关系敏感
        private float depressionScore;          // 抑郁
        private float anxietyScore;             // 焦虑
        private float hostilityScore;           // 敌对
        private float phobicAnxietyScore;       // 恐怖
        private float paranoidScore;            // 偏执
        private float psychoticismScore;        // 精神病性
        private float additionalScore;          // 其他

        // 各因子均分
        private float somatizationMean;
        private float obsessiveCompulsiveMean;
        private float interpersonalMean;
        private float depressionMean;
        private float anxietyMean;
        private float hostilityMean;
        private float phobicAnxietyMean;
        private float paranoidMean;
        private float psychoticismMean;
        private float additionalMean;
    }
}