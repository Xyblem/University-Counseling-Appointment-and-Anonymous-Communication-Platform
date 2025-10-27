package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * FES-CV家庭环境量表简化版（30题）
 */
public class FESCVTest extends PsychTest {

    public FESCVTest() {
        super(7, "FES-CV家庭环境量表", "家庭环境量表中文版简化版，包含30个问题，评估家庭环境特征");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用2点计分：1=是，2=否
        // 从原90题中精选30个代表性题目，覆盖10个分量表

        // 亲密度 (3题)
        questions.add(new Question(1, "FES-1", "我们家庭成员都总是互相给予最大的帮助和支持", false, createTwoPointOptions()));
        questions.add(new Question(2, "FES-31", "在我们家里有一种和谐一致的气氛", false, createTwoPointOptions()));
        questions.add(new Question(3, "FES-51", "家庭成员都总是衷心地互相支持", false, createTwoPointOptions()));

        // 情感表达 (3题)
        questions.add(new Question(4, "FES-12", "在家里我们想说什么就可以说什么", false, createTwoPointOptions()));
        questions.add(new Question(5, "FES-42", "家庭成员经常公开地表达相互之间的感情", false, createTwoPointOptions()));
        questions.add(new Question(6, "FES-72", "家庭成员之间讲话时都很注意避免伤害对方的感情", false, createTwoPointOptions()));

        // 矛盾性 (3题)
        questions.add(new Question(7, "FES-3", "家中经常吵架", false, createTwoPointOptions()));
        questions.add(new Question(8, "FES-23", "有时家庭成员发怒时摔东西", false, createTwoPointOptions()));
        questions.add(new Question(9, "FES-53", "家庭成员有时互相打架", false, createTwoPointOptions()));

        // 独立性 (3题)
        questions.add(new Question(10, "FES-14", "我们都非常鼓励家里人具有独立精神", false, createTwoPointOptions()));
        questions.add(new Question(11, "FES-34", "我们家的每个人的出入是完全自由的", false, createTwoPointOptions()));
        questions.add(new Question(12, "FES-64", "家庭成员希望家里人独立解决问题", false, createTwoPointOptions()));

        // 成功性 (3题)
        questions.add(new Question(13, "FES-5", "家庭成员无论做什么事情都是尽力而为的", false, createTwoPointOptions()));
        questions.add(new Question(14, "FES-15", "为了有好的前途，家庭成员都花了几乎所有的精力", false, createTwoPointOptions()));
        questions.add(new Question(15, "FES-45", "我们总是不断反省自己，强迫自己尽力把事情做得一次比一次好", false, createTwoPointOptions()));

        // 知识性 (3题)
        questions.add(new Question(16, "FES-6", "我们家经常谈论政治和社会问题", false, createTwoPointOptions()));
        questions.add(new Question(17, "FES-46", "我们很少讨论有关科技知识方面的问题", true, createTwoPointOptions())); // 反向计分
        questions.add(new Question(18, "FES-66", "家庭成员常去图书馆", false, createTwoPointOptions()));

        // 娱乐性 (3题)
        questions.add(new Question(19, "FES-17", "家庭成员常外出到朋友家去玩并在一起吃饭", false, createTwoPointOptions()));
        questions.add(new Question(20, "FES-37", "我们常看电影或体育比赛、外出郊游等", false, createTwoPointOptions()));
        questions.add(new Question(21, "FES-77", "家庭成员常在业余时间参加家庭以外的社交活动", false, createTwoPointOptions()));

        // 道德宗教观 (3题)
        questions.add(new Question(22, "FES-8", "我们都认为不管有多大困难，子女应该首先满足老人的各种需求", false, createTwoPointOptions()));
        questions.add(new Question(23, "FES-48", "我们认为无论怎么样，晚辈都应该接受长辈的劝导", false, createTwoPointOptions()));
        questions.add(new Question(24, "FES-78", "我们认为无论怎么样，离婚是不道德的", false, createTwoPointOptions()));

        // 组织性 (3题)
        questions.add(new Question(25, "FES-9", "家中较大的活动都是经过仔细安排的", false, createTwoPointOptions()));
        questions.add(new Question(26, "FES-39", "在我们家很重视做事要准时", false, createTwoPointOptions()));
        questions.add(new Question(27, "FES-69", "在我们家里每个人的分工是明确的", false, createTwoPointOptions()));

        // 控制性 (3题)
        questions.add(new Question(28, "FES-10", "家里人很少强求其他家庭成员遵守家规", true, createTwoPointOptions())); // 反向计分
        questions.add(new Question(29, "FES-50", "我们家非常强调要遵守固定的生活规律和家规", false, createTwoPointOptions()));
        questions.add(new Question(30, "FES-90", "在家里违反家规者会受到严厉的批评", false, createTwoPointOptions()));
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
        // 计算10个分量表得分
        float cohesionScore = 0;          // 亲密度
        float expressivenessScore = 0;    // 情感表达
        float conflictScore = 0;          // 矛盾性
        float independenceScore = 0;      // 独立性
        float achievementScore = 0;       // 成功性
        float intellectualScore = 0;      // 知识性
        float recreationalScore = 0;      // 娱乐性
        float moralScore = 0;             // 道德宗教观
        float organizationScore = 0;      // 组织性
        float controlScore = 0;           // 控制性

        // 各分量表题目索引（注意：有些题目是反向计分）
        int[] cohesionIndices = {0, 1, 2};           // 1-3题
        int[] expressivenessIndices = {3, 4, 5};     // 4-6题
        int[] conflictIndices = {6, 7, 8};           // 7-9题
        int[] independenceIndices = {9, 10, 11};     // 10-12题
        int[] achievementIndices = {12, 13, 14};     // 13-15题
        int[] intellectualIndices = {15, 16, 17};    // 16-18题（16题反向）
        int[] recreationalIndices = {18, 19, 20};    // 19-21题
        int[] moralIndices = {21, 22, 23};           // 22-24题
        int[] organizationIndices = {24, 25, 26};    // 25-27题
        int[] controlIndices = {27, 28, 29};         // 28-30题（27题反向）

        // 计算各分量表得分
        for (int index : cohesionIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            cohesionScore += result.getScore();
        }

        for (int index : expressivenessIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            expressivenessScore += result.getScore();
        }

        for (int index : conflictIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            conflictScore += result.getScore();
        }

        for (int index : independenceIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            independenceScore += result.getScore();
        }

        for (int index : achievementIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            achievementScore += result.getScore();
        }

        for (int index : intellectualIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            intellectualScore += result.getScore();
        }

        for (int index : recreationalIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            recreationalScore += result.getScore();
        }

        for (int index : moralIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            moralScore += result.getScore();
        }

        for (int index : organizationIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            organizationScore += result.getScore();
        }

        for (int index : controlIndices) {
            FESCVResult result = (FESCVResult) this.getQuestions().get(index).answer(answer.get(index));
            controlScore += result.getScore();
        }

        // 转换为标准分（0-9分范围，与原量表一致）
        float cohesionStandard = (cohesionScore / cohesionIndices.length) * 9;
        float expressivenessStandard = (expressivenessScore / expressivenessIndices.length) * 9;
        float conflictStandard = (conflictScore / conflictIndices.length) * 9;
        float independenceStandard = (independenceScore / independenceIndices.length) * 9;
        float achievementStandard = (achievementScore / achievementIndices.length) * 9;
        float intellectualStandard = (intellectualScore / intellectualIndices.length) * 9;
        float recreationalStandard = (recreationalScore / recreationalIndices.length) * 9;
        float moralStandard = (moralScore / moralIndices.length) * 9;
        float organizationStandard = (organizationScore / organizationIndices.length) * 9;
        float controlStandard = (controlScore / controlIndices.length) * 9;

        FESCVReport result = new FESCVReport();

        // 设置原始分
        result.setCohesionScore(cohesionScore);
        result.setExpressivenessScore(expressivenessScore);
        result.setConflictScore(conflictScore);
        result.setIndependenceScore(independenceScore);
        result.setAchievementScore(achievementScore);
        result.setIntellectualScore(intellectualScore);
        result.setRecreationalScore(recreationalScore);
        result.setMoralScore(moralScore);
        result.setOrganizationScore(organizationScore);
        result.setControlScore(controlScore);

        // 设置标准分
        result.setCohesionStandard(cohesionStandard);
        result.setExpressivenessStandard(expressivenessStandard);
        result.setConflictStandard(conflictStandard);
        result.setIndependenceStandard(independenceStandard);
        result.setAchievementStandard(achievementStandard);
        result.setIntellectualStandard(intellectualStandard);
        result.setRecreationalStandard(recreationalStandard);
        result.setMoralStandard(moralStandard);
        result.setOrganizationStandard(organizationStandard);
        result.setControlStandard(controlStandard);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的FES-CV家庭环境量表测试结果：\n\n");

        message.append(String.format("亲密度: 原始分%.1f, 标准分%.1f\n", cohesionScore, cohesionStandard));
        message.append(String.format("情感表达: 原始分%.1f, 标准分%.1f\n", expressivenessScore, expressivenessStandard));
        message.append(String.format("矛盾性: 原始分%.1f, 标准分%.1f\n", conflictScore, conflictStandard));
        message.append(String.format("独立性: 原始分%.1f, 标准分%.1f\n", independenceScore, independenceStandard));
        message.append(String.format("成功性: 原始分%.1f, 标准分%.1f\n", achievementScore, achievementStandard));
        message.append(String.format("知识性: 原始分%.1f, 标准分%.1f\n", intellectualScore, intellectualStandard));
        message.append(String.format("娱乐性: 原始分%.1f, 标准分%.1f\n", recreationalScore, recreationalStandard));
        message.append(String.format("道德宗教观: 原始分%.1f, 标准分%.1f\n", moralScore, moralStandard));
        message.append(String.format("组织性: 原始分%.1f, 标准分%.1f\n", organizationScore, organizationStandard));
        message.append(String.format("控制性: 原始分%.1f, 标准分%.1f\n\n", controlScore, controlStandard));

        // 结果解释
        message.append("家庭环境特征分析：\n");

        // 亲密度解释
        if (cohesionStandard > 6) {
            message.append("• 家庭亲密度高：成员间互相支持、关系紧密\n");
        } else if (cohesionStandard < 4) {
            message.append("• 家庭亲密度较低：成员间情感联系需要加强\n");
        }

        // 情感表达解释
        if (expressivenessStandard > 6) {
            message.append("• 情感表达充分：家庭成员能够公开表达情感\n");
        } else if (expressivenessStandard < 4) {
            message.append("• 情感表达不足：家庭成员情感交流较少\n");
        }

        // 矛盾性解释
        if (conflictStandard > 6) {
            message.append("• 家庭矛盾较多：存在较多冲突和紧张关系\n");
        } else if (conflictStandard < 4) {
            message.append("• 家庭矛盾较少：成员间关系较为和谐\n");
        }

        // 独立性解释
        if (independenceStandard > 6) {
            message.append("• 独立性较强：鼓励成员独立自主\n");
        } else if (independenceStandard < 4) {
            message.append("• 独立性较弱：家庭成员依赖性强\n");
        }

        // 成功性解释
        if (achievementStandard > 6) {
            message.append("• 成功导向强：重视成就和竞争\n");
        } else if (achievementStandard < 4) {
            message.append("• 成功导向较弱：对成就要求相对宽松\n");
        }

        // 知识性解释
        if (intellectualStandard > 6) {
            message.append("• 知识性活动丰富：重视文化知识学习\n");
        } else if (intellectualStandard < 4) {
            message.append("• 知识性活动较少：对文化知识关注度一般\n");
        }

        // 娱乐性解释
        if (recreationalStandard > 6) {
            message.append("• 娱乐活动丰富：积极参与社交娱乐\n");
        } else if (recreationalStandard < 4) {
            message.append("• 娱乐活动较少：社交参与度不高\n");
        }

        // 组织性解释
        if (organizationStandard > 6) {
            message.append("• 组织性强：家庭生活井然有序\n");
        } else if (organizationStandard < 4) {
            message.append("• 组织性较弱：家庭安排相对随意\n");
        }

        // 控制性解释
        if (controlStandard > 6) {
            message.append("• 控制性较强：家规严格、约束较多\n");
        } else if (controlStandard < 4) {
            message.append("• 控制性较弱：家庭管理相对宽松\n");
        }

        message.append("\n总体评价：\n");
        int positiveFactors = 0;
        int concernFactors = 0;

        if (cohesionStandard > 5) positiveFactors++;
        if (expressivenessStandard > 5) positiveFactors++;
        if (conflictStandard < 5) positiveFactors++; // 矛盾性低分是积极的
        if (independenceStandard > 5) positiveFactors++;
        if (organizationStandard > 5) positiveFactors++;

        if (cohesionStandard < 4) concernFactors++;
        if (expressivenessStandard < 4) concernFactors++;
        if (conflictStandard > 6) concernFactors++;
        if (controlStandard > 7) concernFactors++;

        if (positiveFactors > concernFactors) {
            message.append("您的家庭环境总体上较为健康和谐，具有良好的家庭功能。\n");
        } else if (positiveFactors < concernFactors) {
            message.append("您的家庭环境存在一些需要关注的方面，建议加强家庭成员间的沟通和理解。\n");
        } else {
            message.append("您的家庭环境较为均衡，既有优势也有需要改进的方面。\n");
        }

        message.append("\n温馨提示：本测试为简化版本，结果仅供参考。家庭环境对我们的成长发展有重要影响。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * FES-CV测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            FESCVResult result = new FESCVResult();

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
     * FES-CV问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class FESCVResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * FES-CV测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class FESCVReport extends PsychTestResult {
        // 原始分
        private float cohesionScore;
        private float expressivenessScore;
        private float conflictScore;
        private float independenceScore;
        private float achievementScore;
        private float intellectualScore;
        private float recreationalScore;
        private float moralScore;
        private float organizationScore;
        private float controlScore;

        // 标准分（0-9分）
        private float cohesionStandard;
        private float expressivenessStandard;
        private float conflictStandard;
        private float independenceStandard;
        private float achievementStandard;
        private float intellectualStandard;
        private float recreationalStandard;
        private float moralStandard;
        private float organizationStandard;
        private float controlStandard;
    }
}