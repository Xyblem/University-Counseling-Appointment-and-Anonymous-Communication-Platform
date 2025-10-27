package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * Rutter儿童行为问卷
 */
public class RutterTest extends PsychTest {

    public RutterTest() {
        super(13, "Rutter儿童行为问卷", "用于评估儿童行为问题，包括违纪行为和神经症行为");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用3点计分：0=从来没有，1=有时出现/症状轻微，2=严重或经常出现

        // 健康问题 (1-8项)
        questions.add(new Question(1, "RUTTER-1", "头痛", false, createThreePointOptions()));
        questions.add(new Question(2, "RUTTER-2", "肚子痛或呕吐", false, createThreePointOptions()));
        questions.add(new Question(3, "RUTTER-3", "支气管哮喘或哮喘发作", false, createThreePointOptions()));
        questions.add(new Question(4, "RUTTER-4", "尿床或尿裤子", false, createThreePointOptions()));
        questions.add(new Question(5, "RUTTER-5", "大便在床上或在裤子里", false, createThreePointOptions()));
        questions.add(new Question(6, "RUTTER-6", "发脾气（伴随叫喊或发怒动作）", false, createThreePointOptions()));
        questions.add(new Question(7, "RUTTER-7", "到学校就哭或拒绝上学", false, createThreePointOptions()));
        questions.add(new Question(8, "RUTTER-8", "逃学", false, createThreePointOptions()));

        // 其他行为问题 (9-26项)
        questions.add(new Question(9, "RUTTER-9", "非常不安，难于长期静坐", false, createThreePointOptions()));
        questions.add(new Question(10, "RUTTER-10", "动作多，乱动，坐立不安", false, createThreePointOptions()));
        questions.add(new Question(11, "RUTTER-11", "经常破坏自己或别人的东西", false, createThreePointOptions()));
        questions.add(new Question(12, "RUTTER-12", "经常与别的儿童打架或争吵", false, createThreePointOptions()));
        questions.add(new Question(13, "RUTTER-13", "别的孩子不喜欢他", false, createThreePointOptions()));
        questions.add(new Question(14, "RUTTER-14", "经常烦恼，对许多事都心烦", false, createThreePointOptions()));
        questions.add(new Question(15, "RUTTER-15", "经常一个人呆着", false, createThreePointOptions()));
        questions.add(new Question(16, "RUTTER-16", "易激惹或勃然大怒", false, createThreePointOptions()));
        questions.add(new Question(17, "RUTTER-17", "经常表现出痛苦、不愉快、流泪或忧伤", false, createThreePointOptions()));
        questions.add(new Question(18, "RUTTER-18", "面部或肢体抽动和作态", false, createThreePointOptions()));
        questions.add(new Question(19, "RUTTER-19", "经常吸吮拇指或手指", false, createThreePointOptions()));
        questions.add(new Question(20, "RUTTER-20", "经常咬指甲或手指", false, createThreePointOptions()));
        questions.add(new Question(21, "RUTTER-21", "经常不听管教", false, createThreePointOptions()));
        questions.add(new Question(22, "RUTTER-22", "做事拿不定主意", false, createThreePointOptions()));
        questions.add(new Question(23, "RUTTER-23", "害怕新事物和新环境", false, createThreePointOptions()));
        questions.add(new Question(24, "RUTTER-24", "神经质或过分特殊", false, createThreePointOptions()));
        questions.add(new Question(25, "RUTTER-25", "时常说谎", false, createThreePointOptions()));
        questions.add(new Question(26, "RUTTER-26", "欺负别的孩子", false, createThreePointOptions()));

        // 日常生活中的某些习惯问题 (27-31项，简化为4题)
        questions.add(new Question(27, "RUTTER-27", "有没有口吃（说话结巴）", false, createThreePointOptions()));
        questions.add(new Question(28, "RUTTER-28", "有没有言语困难（表达或转述困难）", false, createThreePointOptions()));
        questions.add(new Question(29, "RUTTER-29", "是否偷过东西", false, createThreePointOptions()));
        questions.add(new Question(30, "RUTTER-30", "有没有睡眠困难", false, createThreePointOptions()));
    }

    /**
     * 创建3点计分选项
     */
    private List<PsychOption> createThreePointOptions() {
        return List.of(
                new PsychOption("0", "从来没有", 0),
                new PsychOption("1", "有时出现/症状轻微", 1),
                new PsychOption("2", "严重或经常出现", 2)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算总分
        float totalScore = 0;

        // 计算A行为（违纪行为/反社会行为）得分
        float aBehaviorScore = 0;
        // A行为题目：11,12,21,25,26,29
        int[] aBehaviorIndices = {10, 11, 20, 24, 25, 28};

        // 计算N行为（神经症行为）得分
        float nBehaviorScore = 0;
        // N行为题目：14,17,23
        int[] nBehaviorIndices = {13, 16, 22};

        // 计算总分和各行为得分
        for (int i = 0; i < answer.size(); i++) {
            RutterResult result = (RutterResult) this.getQuestions().get(i).answer(answer.get(i));
            totalScore += result.getScore();

            // 检查是否为A行为题目
            for (int index : aBehaviorIndices) {
                if (i == index) {
                    aBehaviorScore += result.getScore();
                    break;
                }
            }

            // 检查是否为N行为题目
            for (int index : nBehaviorIndices) {
                if (i == index) {
                    nBehaviorScore += result.getScore();
                    break;
                }
            }
        }

        // 判断行为问题类型
        String behaviorType = "无行为问题";
        if (totalScore >= 13) { // 父母问卷临界值为13分
            if (aBehaviorScore > nBehaviorScore) {
                behaviorType = "A行为（违纪行为/反社会行为）";
            } else if (nBehaviorScore > aBehaviorScore) {
                behaviorType = "N行为（神经症行为）";
            } else {
                behaviorType = "M行为（混合性行为）";
            }
        }

        RutterReport result = new RutterReport();
        result.setTotalScore(totalScore);
        result.setABehaviorScore(aBehaviorScore);
        result.setNBehaviorScore(nBehaviorScore);
        result.setBehaviorType(behaviorType);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("Rutter儿童行为问卷测试结果：\n\n");

        message.append(String.format("总分: %.1f (临界值: 13分)\n", totalScore));
        message.append(String.format("A行为得分: %.1f\n", aBehaviorScore));
        message.append(String.format("N行为得分: %.1f\n", nBehaviorScore));
        message.append(String.format("行为问题类型: %s\n\n", behaviorType));

        // 结果解释
        message.append("结果分析：\n");
        if (totalScore < 13) {
            message.append("• 总分低于临界值，未发现明显行为问题\n");
            message.append("• 儿童行为表现基本正常\n");
        } else {
            message.append("• 总分达到或超过临界值，存在行为问题\n");

            switch (behaviorType) {
                case "A行为（违纪行为/反社会行为）":
                    message.append("• 主要表现为违纪行为，如攻击、不听话、偷窃等\n");
                    message.append("• 建议加强行为规范和纪律教育\n");
                    break;
                case "N行为（神经症行为）":
                    message.append("• 主要表现为情绪问题，如焦虑、恐惧、抑郁等\n");
                    message.append("• 建议关注情绪健康，提供心理支持\n");
                    break;
                case "M行为（混合性行为）":
                    message.append("• 同时存在违纪行为和情绪问题\n");
                    message.append("• 需要综合性的干预措施\n");
                    break;
            }
        }

        // 具体问题分析
        message.append("\n具体表现分析：\n");

        // 分析A行为具体表现
        if (aBehaviorScore > 0) {
            message.append("• 违纪行为表现：");
            boolean hasABehavior = false;

            for (int index : aBehaviorIndices) {
                RutterResult questionResult = (RutterResult) this.getQuestions().get(index).answer(answer.get(index));
                if (questionResult.getScore() > 0) {
                    if (!hasABehavior) {
                        hasABehavior = true;
                    } else {
                        message.append("，");
                    }
                    message.append(this.getQuestions().get(index).getContent());
                }
            }
            message.append("\n");
        }

        // 分析N行为具体表现
        if (nBehaviorScore > 0) {
            message.append("• 情绪问题表现：");
            boolean hasNBehavior = false;

            for (int index : nBehaviorIndices) {
                RutterResult questionResult = (RutterResult) this.getQuestions().get(index).answer(answer.get(index));
                if (questionResult.getScore() > 0) {
                    if (!hasNBehavior) {
                        hasNBehavior = true;
                    } else {
                        message.append("，");
                    }
                    message.append(this.getQuestions().get(index).getContent());
                }
            }
            message.append("\n");
        }

        // 健康问题分析
        float healthScore = 0;
        for (int i = 0; i < 8; i++) { // 前8题为健康问题
            RutterResult questionResult = (RutterResult) this.getQuestions().get(i).answer(answer.get(i));
            healthScore += questionResult.getScore();
        }

        if (healthScore > 0) {
            message.append(String.format("\n健康问题总分: %.1f\n", healthScore));
            message.append("• 存在躯体化症状，可能与心理压力相关\n");
        }

        // 建议
        message.append("\n建议：\n");
        if (totalScore >= 13) {
            message.append("1. 建议寻求专业儿童心理医生的进一步评估\n");
            message.append("2. 加强家校沟通，共同制定干预方案\n");
            message.append("3. 关注儿童的日常行为和情绪变化\n");
            message.append("4. 提供稳定的家庭环境和情感支持\n");
        } else {
            message.append("1. 继续保持良好的教养方式\n");
            message.append("2. 定期关注儿童的行为情绪发展\n");
            message.append("3. 如有变化及时重新评估\n");
        }

        message.append("\n注：本问卷适用于学龄儿童，能够较好地区分情绪障碍和违纪行为。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * Rutter测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            RutterResult result = new RutterResult();

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
     * Rutter问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class RutterResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * Rutter测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class RutterReport extends PsychTestResult {
        private float totalScore;          // 总分
        private float aBehaviorScore;      // A行为得分（违纪行为）
        private float nBehaviorScore;      // N行为得分（神经症行为）
        private String behaviorType;       // 行为问题类型
    }
}