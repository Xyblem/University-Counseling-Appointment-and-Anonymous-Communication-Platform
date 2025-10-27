package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * UPI大学生人格健康调查表简化版（30题）
 */
public class UPITest extends PsychTest {

    public UPITest() {
        super(16, "UPI大学生人格健康调查表", "用于筛查大学生心理健康问题，识别需要关注的学生");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用2点计分：0=否，1=是
        // 注意：第5、10、15、20、25、30题为测伪题（反向计分）

        // 身体症状相关
        questions.add(new Question(1, "UPI-1", "食欲不振", false, createTwoPointOptions(), false));
        questions.add(new Question(2, "UPI-2", "恶心、胃口难受、肚子痛", false, createTwoPointOptions(), false));
        questions.add(new Question(3, "UPI-3", "容易拉肚子或便秘", false, createTwoPointOptions(), false));
        questions.add(new Question(4, "UPI-4", "关注心悸和脉搏", false, createTwoPointOptions(), false));
        questions.add(new Question(5, "UPI-5", "身体健康状况良好", false, createTwoPointOptions(), true)); // 测伪题

        // 情绪症状相关
        questions.add(new Question(6, "UPI-6", "牢骚和不满多", false, createTwoPointOptions(), false));
        questions.add(new Question(7, "UPI-7", "过于担心将来的事情", false, createTwoPointOptions(), false));
        questions.add(new Question(8, "UPI-8", "不想见人", false, createTwoPointOptions(), false));
        questions.add(new Question(9, "UPI-9", "觉得自己不是自己", false, createTwoPointOptions(), false));
        questions.add(new Question(10, "UPI-10", "总是朝气蓬勃的", false, createTwoPointOptions(), true)); // 测伪题

        // 认知功能相关
        questions.add(new Question(11, "UPI-11", "缺乏热情和积极性", false, createTwoPointOptions(), false));
        questions.add(new Question(12, "UPI-12", "悲观", false, createTwoPointOptions(), false));
        questions.add(new Question(13, "UPI-13", "思想不集中", false, createTwoPointOptions(), false));
        questions.add(new Question(14, "UPI-14", "情绪起伏过大", false, createTwoPointOptions(), false));
        questions.add(new Question(15, "UPI-15", "心情开朗", false, createTwoPointOptions(), true)); // 测伪题

        // 睡眠和躯体症状
        questions.add(new Question(16, "UPI-16", "常常失眠", false, createTwoPointOptions(), false));
        questions.add(new Question(17, "UPI-17", "头痛", false, createTwoPointOptions(), false));
        questions.add(new Question(18, "UPI-18", "脖子、肩膀酸痛", false, createTwoPointOptions(), false));
        questions.add(new Question(19, "UPI-19", "胸痛憋闷", false, createTwoPointOptions(), false));
        questions.add(new Question(20, "UPI-20", "人缘好受欢迎", false, createTwoPointOptions(), true)); // 测伪题

        // 人际关系和性格特征
        questions.add(new Question(21, "UPI-21", "气量小", false, createTwoPointOptions(), false));
        questions.add(new Question(22, "UPI-22", "爱操心", false, createTwoPointOptions(), false));
        questions.add(new Question(23, "UPI-23", "焦躁不安", false, createTwoPointOptions(), false));
        questions.add(new Question(24, "UPI-24", "容易动怒", false, createTwoPointOptions(), false));
        questions.add(new Question(25, "UPI-25", "对任何事情不反复确认就不放心", false, createTwoPointOptions(), false));

        // 关键项目（重点关注）
        questions.add(new Question(26, "UPI-26", "想轻生", false, createTwoPointOptions(), false));
        questions.add(new Question(27, "UPI-27", "对任何事都没兴趣", false, createTwoPointOptions(), false));
        questions.add(new Question(28, "UPI-28", "记忆力减退", false, createTwoPointOptions(), false));
        questions.add(new Question(29, "UPI-29", "缺乏自信心", false, createTwoPointOptions(), false));
        questions.add(new Question(30, "UPI-30", "莫名奇妙地不安", false, createTwoPointOptions(), false));
    }

    /**
     * 创建2点计分选项
     */
    private List<PsychOption> createTwoPointOptions() {
        return List.of(
                new PsychOption("0", "否", 0),
                new PsychOption("1", "是", 1)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算总分（排除测伪题）
        float totalScore = 0;
        int lieScore = 0; // 测伪题得分

        // 测伪题索引：5,10,15,20（原UPI有4个测伪题，这里简化为4个）
        int[] lieQuestionIndices = {4, 9, 14, 19};

        // 关键项目索引
        int[] keyQuestionIndices = {15, 25}; // 第16题（失眠）和第26题（想轻生）

        // 计算总分和测伪分
        for (int i = 0; i < answer.size(); i++) {
            UPIResult result = (UPIResult) this.getQuestions().get(i).answer(answer.get(i));
            float score = result.getScore();

            // 检查是否为测伪题
            boolean isLieQuestion = false;
            for (int index : lieQuestionIndices) {
                if (i == index) {
                    isLieQuestion = true;
                    lieScore += score;
                    break;
                }
            }

            // 非测伪题计入总分
            if (!isLieQuestion) {
                totalScore += score;
            }
        }

        // 筛查分类
        String screeningCategory = "第三类";
        String description = "";

        // 第一类筛选标准
        if (totalScore >= 13 ||
                hasKeyQuestionSelected(answer, 25) || // 第26题（想轻生）
                hasLieInconsistency(lieScore)) {
            screeningCategory = "第一类";
            description = "可能有较明显心理问题，应尽快约请咨询";
        }
        // 第二类筛选标准
        else if (totalScore >= 8 && totalScore < 13 ||
                hasKeyQuestionSelected(answer, 15) || // 第16题（常常失眠）
                hasKeyQuestionSelected(answer, 25)) { // 第26题（对任何事都没兴趣）
            screeningCategory = "第二类";
            description = "有一定心理问题，需要关注";
        } else {
            screeningCategory = "第三类";
            description = "没有特别问题";
        }

        UPIReport result = new UPIReport();
        result.setTotalScore(totalScore);
        result.setLieScore(lieScore);
        result.setScreeningCategory(screeningCategory);
        result.setDescription(description);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("UPI大学生人格健康调查表测试结果：\n\n");

        message.append(String.format("总分: %.1f (排除测伪题)\n", totalScore));
        message.append(String.format("测伪题得分: %d\n", lieScore));
        message.append(String.format("筛查分类: %s\n", screeningCategory));
        message.append(String.format("描述: %s\n\n", description));

        // 测伪题一致性检查
        message.append("测伪题一致性：");
        if (lieScore <= 1) {
            message.append("良好，问卷结果可信\n");
        } else if (lieScore <= 2) {
            message.append("一般，需结合其他信息判断\n");
        } else {
            message.append("较差，建议重新测试\n");
        }
        message.append("\n");

        // 关键项目分析
        message.append("关键项目分析：\n");
        if (hasKeyQuestionSelected(answer, 25)) { // 想轻生
            message.append("• 存在自杀意念，需要立即关注和干预\n");
        }

        if (hasKeyQuestionSelected(answer, 15)) { // 常常失眠
            message.append("• 存在严重睡眠问题，可能反映神经症状\n");
        }

        if (hasKeyQuestionSelected(answer, 24)) { // 对任何事都没兴趣
            message.append("• 兴趣丧失，可能存在抑郁状态\n");
        }

        // 症状维度分析
        message.append("\n症状维度分析：\n");

        // 身体症状分析
        float physicalScore = 0;
        int[] physicalIndices = {0, 1, 2, 3, 16, 17, 18}; // 身体相关题目
        for (int index : physicalIndices) {
            if (!isLieQuestion(index, lieQuestionIndices)) {
                UPIResult questionResult = (UPIResult) this.getQuestions().get(index).answer(answer.get(index));
                physicalScore += questionResult.getScore();
            }
        }

        if (physicalScore > 0) {
            message.append(String.format("• 身体症状: %.1f分，存在躯体化表现\n", physicalScore));
        }

        // 情绪症状分析
        float emotionalScore = 0;
        int[] emotionalIndices = {5, 6, 7, 8, 10, 11, 12, 13, 21, 22, 23, 28, 29}; // 情绪相关题目
        for (int index : emotionalIndices) {
            if (!isLieQuestion(index, lieQuestionIndices)) {
                UPIResult questionResult = (UPIResult) this.getQuestions().get(index).answer(answer.get(index));
                emotionalScore += questionResult.getScore();
            }
        }

        if (emotionalScore > 0) {
            message.append(String.format("• 情绪症状: %.1f分，存在情绪困扰\n", emotionalScore));
        }

        // 人际关系分析
        float interpersonalScore = 0;
        int[] interpersonalIndices = {7, 20, 24}; // 人际相关题目
        for (int index : interpersonalIndices) {
            if (!isLieQuestion(index, lieQuestionIndices)) {
                UPIResult questionResult = (UPIResult) this.getQuestions().get(index).answer(answer.get(index));
                interpersonalScore += questionResult.getScore();
            }
        }

        if (interpersonalScore > 0) {
            message.append(String.format("• 人际关系: %.1f分，存在社交困难\n", interpersonalScore));
        }

        // 建议
        message.append("\n建议：\n");
        switch (screeningCategory) {
            case "第一类":
                message.append("1. 立即预约心理咨询面谈\n");
                message.append("2. 建立心理危机干预档案\n");
                message.append("3. 定期跟踪回访\n");
                message.append("4. 如有必要，转介专业医疗机构\n");
                break;
            case "第二类":
                message.append("1. 建议进行心理咨询\n");
                message.append("2. 提供心理健康教育资源\n");
                message.append("3. 定期关注心理状态变化\n");
                message.append("4. 鼓励参加心理健康活动\n");
                break;
            case "第三类":
                message.append("1. 继续保持良好的心理状态\n");
                message.append("2. 学习心理健康知识\n");
                message.append("3. 如有需要可随时咨询\n");
                break;
        }

        message.append("\nUPI分类说明：\n");
        message.append("• 第一类：可能有较明显心理问题，应尽快咨询\n");
        message.append("• 第二类：有一定心理问题，需要关注\n");
        message.append("• 第三类：心理健康状况良好\n");

        message.append("\n注意事项：\n");
        message.append("• 本测试为初步筛查工具，不能替代专业诊断\n");
        message.append("• 发现危机情况应立即报告相关部门\n");
        message.append("• 测试结果应严格保密\n");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * 检查关键项目是否被选中
     */
    private boolean hasKeyQuestionSelected(PsychTestAnswer answer, int questionIndex) {
        if (questionIndex < answer.size()) {
            UPIResult result = (UPIResult) this.getQuestions().get(questionIndex).answer(answer.get(questionIndex));
            return result.getScore() > 0;
        }
        return false;
    }

    /**
     * 检查测伪题一致性
     */
    private boolean hasLieInconsistency(int lieScore) {
        // 测伪题得分过高可能表示不认真作答
        return lieScore >= 3;
    }

    /**
     * 检查是否为测伪题
     */
    private boolean isLieQuestion(int index, int[] lieIndices) {
        for (int lieIndex : lieIndices) {
            if (index == lieIndex) {
                return true;
            }
        }
        return false;
    }

    /**
     * UPI测试问题类
     */
    public static class Question extends PsychQuestion {
        private boolean lieQuestion; // 是否为测伪题

        public Question(int id, String title, String content, boolean multiOptional,
                        List<PsychOption> options, boolean lieQuestion) {
            super(id, title, content, multiOptional, options);
            this.lieQuestion = lieQuestion;
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            UPIResult result = new UPIResult();
            result.setLieQuestion(this.lieQuestion);

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
     * UPI问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class UPIResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
        private boolean lieQuestion;
    }

    /**
     * UPI测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class UPIReport extends PsychTestResult {
        private float totalScore;          // 总分（排除测伪题）
        private int lieScore;              // 测伪题得分
        private String screeningCategory;  // 筛查分类
        private String description;        // 分类描述
    }
}