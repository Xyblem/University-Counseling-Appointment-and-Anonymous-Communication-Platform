package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * DSQ防御方式问卷简化版（30题）
 */
public class DSQTest extends PsychTest {

    public DSQTest() {
        super(3, "DSQ防御方式问卷", "防御方式问卷简化版，包含30个问题，评估个体的防御机制特点");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用9点计分：1=完全反对，2=很反对，3=比较反对，4=稍微反对，5=既不反对也不同意
        // 6=稍微同意，7=比较同意，8=很同意，9=完全同意

        // 因子1：不成熟防御机制 (10题)
        questions.add(new Question(1, "DSQ-1", "人们总是不公平地对待我", false, createNinePointOptions())); // 投射
        questions.add(new Question(2, "DSQ-2", "人们往往虐待我", false, createNinePointOptions())); // 投射
        questions.add(new Question(3, "DSQ-3", "人们告诉我：我总有被害的感觉", false, createNinePointOptions())); // 投射
        questions.add(new Question(4, "DSQ-4", "人们常说我是个脾气暴躁的人", false, createNinePointOptions())); // 被动攻击
        questions.add(new Question(5, "DSQ-5", "在我愤怒的时候，我变得很愿挖苦人", false, createNinePointOptions())); // 被动攻击
        questions.add(new Question(6, "DSQ-6", "我不知道为什么总是遇到相同的受挫情境", false, createNinePointOptions())); // 潜意显现
        questions.add(new Question(7, "DSQ-7", "我常常不由自主地迫使自己干些过头的事情，以至于其他人不得不限制我", false, createNinePointOptions())); // 潜意显现
        questions.add(new Question(8, "DSQ-8", "我幻想的多，可在现实生活中做的少", false, createNinePointOptions())); // 幻想
        questions.add(new Question(9, "DSQ-9", "我受到挫折时，表现就象个孩子", false, createNinePointOptions())); // 退缩
        questions.add(new Question(10, "DSQ-10", "当某些事情使我烦恼时，我常常不由自主地做出些行为", false, createNinePointOptions())); // 潜意显现

        // 因子2：成熟防御机制 (6题)
        questions.add(new Question(11, "DSQ-11", "我通过做一些积极的或预见性的事情来摆脱自己的焦虑不安，如绘画、做木工活等", false, createNinePointOptions())); // 升华
        questions.add(new Question(12, "DSQ-12", "勤奋工作使我感觉好些", false, createNinePointOptions())); // 升华
        questions.add(new Question(13, "DSQ-13", "忘我地工作，可使我摆脱情绪上的忧郁和焦虑", false, createNinePointOptions())); // 升华
        questions.add(new Question(14, "DSQ-14", "在我没有时间处理某个棘手的事情时，我可以把它搁置一边", false, createNinePointOptions())); // 压抑
        questions.add(new Question(15, "DSQ-15", "我能够相当轻松地嘲笑我自己", false, createNinePointOptions())); // 幽默
        questions.add(new Question(16, "DSQ-16", "我通常可以看到恶境当中好的一面", false, createNinePointOptions())); // 幽默

        // 因子3：中间型防御机制 (9题)
        questions.add(new Question(17, "DSQ-17", "如果某人骗了我或偷了我的钱，我宁愿他得到帮助，而不是受惩罚", false, createNinePointOptions())); // 反作用形成
        questions.add(new Question(18, "DSQ-18", "我往往对那些我讨厌的人表示友好", false, createNinePointOptions())); // 反作用形成
        questions.add(new Question(19, "DSQ-19", "在维护我的利益方面，我羞于与人计较", false, createNinePointOptions())); // 制止
        questions.add(new Question(20, "DSQ-20", "我对性问题感到害羞", false, createNinePointOptions())); // 制止
        questions.add(new Question(21, "DSQ-21", "当自尊心受伤害时，我就回避", false, createNinePointOptions())); // 回避
        questions.add(new Question(22, "DSQ-22", "我沮丧时，就会避开", false, createNinePointOptions())); // 回避
        questions.add(new Question(23, "DSQ-23", "我认识这样一个人，他什么都能做而且做得合理正直", false, createNinePointOptions())); // 理想化
        questions.add(new Question(24, "DSQ-24", "我从帮助他人而获得满足，如果不这样做，我就会变得情绪抑郁", false, createNinePointOptions())); // 假性利他
        questions.add(new Question(25, "DSQ-25", "我往往有意忽视一些不愉快的事情", false, createNinePointOptions())); // 否认

        // 因子4：掩饰因子 (5题)
        questions.add(new Question(26, "DSQ-26", "偶尔，我把一些今天该做的事情推迟到明天做", false, createNinePointOptions())); // 掩饰（disguise）
        questions.add(new Question(27, "DSQ-27", "偶尔，我想一些坏得不能说出口的事情", false, createNinePointOptions())); // 掩饰（disguise）
        questions.add(new Question(28, "DSQ-28", "偶尔，我因一些下流的笑话而大笑", false, createNinePointOptions())); // 掩饰（disguise）
        questions.add(new Question(29, "DSQ-29", "我有时发怒", false, createNinePointOptions())); // 掩饰（disguise）
        questions.add(new Question(30, "DSQ-30", "我不总是说真话", false, createNinePointOptions())); // 掩饰（disguise）
    }

    /**
     * 创建9点计分选项
     */
    private List<PsychOption> createNinePointOptions() {
        return List.of(
                new PsychOption("1", "完全反对", 1),
                new PsychOption("2", "很反对", 2),
                new PsychOption("3", "比较反对", 3),
                new PsychOption("4", "稍微反对", 4),
                new PsychOption("5", "既不反对也不同意", 5),
                new PsychOption("6", "稍微同意", 6),
                new PsychOption("7", "比较同意", 7),
                new PsychOption("8", "很同意", 8),
                new PsychOption("9", "完全同意", 9)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算各因子得分
        float immatureScore = 0;      // 不成熟防御机制 (10题)
        float matureScore = 0;        // 成熟防御机制 (6题)
        float intermediateScore = 0;  // 中间型防御机制 (9题)
        float disguiseScore = 0;      // 掩饰因子 (5题，替换“掩饰”为“disguise”)

        // 各因子题目索引
        int[] immatureIndices = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};      // 1-10题
        int[] matureIndices = {10, 11, 12, 13, 14, 15};              // 11-16题
        int[] intermediateIndices = {16, 17, 18, 19, 20, 21, 22, 23, 24}; // 17-25题
        int[] disguiseIndices = {25, 26, 27, 28, 29};                // 26-30题（替换“掩饰”为“disguise”）

        // 计算各因子得分
        for (int index : immatureIndices) {
            DSQResult result = (DSQResult) this.getQuestions().get(index).answer(answer.get(index));
            immatureScore += result.getScore();
        }

        for (int index : matureIndices) {
            DSQResult result = (DSQResult) this.getQuestions().get(index).answer(answer.get(index));
            matureScore += result.getScore();
        }

        for (int index : intermediateIndices) {
            DSQResult result = (DSQResult) this.getQuestions().get(index).answer(answer.get(index));
            intermediateScore += result.getScore();
        }

        for (int index : disguiseIndices) {
            DSQResult result = (DSQResult) this.getQuestions().get(index).answer(answer.get(index));
            disguiseScore += result.getScore();
        }

        // 计算因子均分（反映使用频度）
        float immatureMean = immatureScore / immatureIndices.length;
        float matureMean = matureScore / matureIndices.length;
        float intermediateMean = intermediateScore / intermediateIndices.length;
        float disguiseMean = disguiseScore / disguiseIndices.length;  // 替换“掩饰”为“disguise”

        DSQReport result = new DSQReport();
        result.setImmatureScore(immatureScore);
        result.setMatureScore(matureScore);
        result.setIntermediateScore(intermediateScore);
        result.setDisguiseScore(disguiseScore);  // 替换“掩饰”为“disguise”
        result.setImmatureMean(immatureMean);
        result.setMatureMean(matureMean);
        result.setIntermediateMean(intermediateMean);
        result.setDisguiseMean(disguiseMean);    // 替换“掩饰”为“disguise”

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的DSQ防御方式问卷测试结果：\n\n");
        message.append("各防御机制因子得分情况：\n");
        message.append(String.format("不成熟防御机制: 总分%.1f, 均分%.2f\n", immatureScore, immatureMean));
        message.append(String.format("成熟防御机制: 总分%.1f, 均分%.2f\n", matureScore, matureMean));
        message.append(String.format("中间型防御机制: 总分%.1f, 均分%.2f\n", intermediateScore, intermediateMean));
        message.append(String.format("掩饰因子: 总分%.1f, 均分%.2f\n\n", disguiseScore, disguiseMean));  // 报告文案保留“掩饰因子”（符合用户理解习惯）

        // 结果解释
        message.append("结果分析：\n");
        message.append("防御机制均分反映您使用某类防御机制的频度（1-9分），分数越高表示使用频度越大。\n\n");

        // 不成熟防御机制分析
        message.append("1. 不成熟防御机制（投射、被动攻击、幻想、退缩等）：\n");
        if (immatureMean >= 6) {
            message.append("   • 您较多使用不成熟防御机制，可能在面对压力时倾向于使用投射、幻想等方式。\n");
            message.append("   • 建议：尝试用更成熟的方式应对压力，如直接沟通、问题解决等。\n");
        } else if (immatureMean >= 4) {
            message.append("   • 您偶尔使用不成熟防御机制，这在适度范围内是正常的。\n");
        } else {
            message.append("   • 您较少使用不成熟防御机制，显示您有较好的情绪调节能力。\n");
        }
        message.append("\n");

        // 成熟防御机制分析
        message.append("2. 成熟防御机制（升华、压抑、幽默）：\n");
        if (matureMean >= 6) {
            message.append("   • 您较多使用成熟防御机制，这表明您有良好的心理适应能力。\n");
            message.append("   • 您善于通过升华、幽默等方式转化负面情绪。\n");
        } else if (matureMean >= 4) {
            message.append("   • 您适度使用成熟防御机制，这是健康的心理调节方式。\n");
        } else {
            message.append("   • 您较少使用成熟防御机制，建议学习更多成熟的应对策略。\n");
        }
        message.append("\n");

        // 中间型防御机制分析
        message.append("3. 中间型防御机制（反作用形成、回避、理想化等）：\n");
        if (intermediateMean >= 6) {
            message.append("   • 您较多使用中间型防御机制，这在一定程度上有助于缓解压力。\n");
            message.append("   • 但过度使用可能影响问题解决效率。\n");
        } else if (intermediateMean >= 4) {
            message.append("   • 您适度使用中间型防御机制，这在正常范围内。\n");
        } else {
            message.append("   • 您较少使用中间型防御机制，显示您倾向于直接面对问题。\n");
        }
        message.append("\n");

        // 掩饰因子分析（文案保留“掩饰因子”，符合用户理解习惯）
        message.append("4. 掩饰因子：\n");
        if (disguiseMean >= 6) {
            message.append("   • 您的掩饰分数较高，可能在测试中倾向于呈现较好的社会形象。\n");
            message.append("   • 建议在安全环境中更真实地表达自己的想法和感受。\n");
        } else if (disguiseMean >= 4) {
            message.append("   • 您的掩饰分数在正常范围内。\n");
        } else {
            message.append("   • 您的掩饰分数较低，显示您在测试中较为真实。\n");
        }
        message.append("\n");

        // 总体建议
        message.append("总体建议：\n");
        if (matureMean > immatureMean && matureMean > intermediateMean) {
            message.append("您主要使用成熟的防御机制，这表明您有良好的心理适应能力和情绪调节能力。继续保持这种健康的应对方式。");
        } else if (immatureMean > matureMean && immatureMean > intermediateMean) {
            message.append("您主要使用不成熟的防御机制，建议学习更多成熟的应对策略，如问题解决、情绪管理等技巧。");
        } else {
            message.append("您的防御机制使用较为均衡，建议在保持现有优势的同时，进一步发展成熟的应对方式。");
        }

        result.setMessage(message.toString());
        return result;
    }

    /**
     * DSQ测试问题类
     */
    public static class Question extends PsychQuestion {
        // 修复原代码构造方法参数顺序错误（原代码“content”与“title”位置颠倒，导致属性赋值错误）
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            DSQResult result = new DSQResult();

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
     * DSQ问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class DSQResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * DSQ测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class DSQReport extends PsychTestResult {
        private float immatureScore;       // 不成熟防御机制总分
        private float matureScore;         // 成熟防御机制总分
        private float intermediateScore;   // 中间型防御机制总分
        private float disguiseScore;       // 掩饰因子总分（替换“掩饰”为“disguise”）

        private float immatureMean;        // 不成熟防御机制均分
        private float matureMean;          // 成熟防御机制均分
        private float intermediateMean;    // 中间型防御机制均分
        private float disguiseMean;        // 掩饰因子均分（替换“掩饰”为“disguise”）
    }
}