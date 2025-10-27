package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * EPQ艾森克人格问卷简化版（30题）
 */
public class EPQTest extends PsychTest {

    public EPQTest() {
        super(6, "EPQ艾森克人格问卷", "艾森克人格问卷简化版，包含30个问题，评估人格特质");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用2点计分：1=是，2=否
        questions.add(new Question(1, "EPQ-1", "你是否有许多不同的业余爱好？", false, createTwoPointOptions()));
        questions.add(new Question(2, "EPQ-2", "你是否在做任何事情以前都要停下来仔细思考？", false, createTwoPointOptions()));
        questions.add(new Question(3, "EPQ-3", "你的心境是否常有起伏？", false, createTwoPointOptions()));
        questions.add(new Question(4, "EPQ-4", "你是否健谈？", false, createTwoPointOptions()));
        questions.add(new Question(5, "EPQ-5", "欠债会使你不安吗？", false, createTwoPointOptions()));
        questions.add(new Question(6, "EPQ-6", "你曾无缘无故觉得\"真是难受\"吗？", false, createTwoPointOptions()));
        questions.add(new Question(7, "EPQ-7", "你是否比较活跃？", false, createTwoPointOptions()));
        questions.add(new Question(8, "EPQ-8", "你在见到一小孩或一动物受折磨时是否会感到非常难过？", false, createTwoPointOptions()));
        questions.add(new Question(9, "EPQ-9", "你容易激动吗？", false, createTwoPointOptions()));
        questions.add(new Question(10, "EPQ-10", "你喜欢会见陌生人吗？", false, createTwoPointOptions()));
        questions.add(new Question(11, "EPQ-11", "你是一个容易伤感情的人吗？", false, createTwoPointOptions()));
        questions.add(new Question(12, "EPQ-12", "在社交场合你是否总不愿露头角？", false, createTwoPointOptions()));
        questions.add(new Question(13, "EPQ-13", "你常有\"厌倦\"之感吗？", false, createTwoPointOptions()));
        questions.add(new Question(14, "EPQ-14", "你是否常爱外出？", false, createTwoPointOptions()));
        questions.add(new Question(15, "EPQ-15", "你常为有罪恶之感所苦恼吗？", false, createTwoPointOptions()));
        questions.add(new Question(16, "EPQ-16", "你是否宁愿去看书而不愿去多见人？", false, createTwoPointOptions()));
        questions.add(new Question(17, "EPQ-17", "你觉得自己是一个神经过敏的人吗？", false, createTwoPointOptions()));
        questions.add(new Question(18, "EPQ-18", "你有许多朋友吗？", false, createTwoPointOptions()));
        questions.add(new Question(19, "EPQ-19", "你是一个多忧多虑的人吗？", false, createTwoPointOptions()));
        questions.add(new Question(20, "EPQ-20", "你认为你是一个乐天派吗？", false, createTwoPointOptions()));
        questions.add(new Question(21, "EPQ-21", "你是否总在担心会发生可怕的事情？", false, createTwoPointOptions()));
        questions.add(new Question(22, "EPQ-22", "交新朋友时一般是你采取主动吗？", false, createTwoPointOptions()));
        questions.add(new Question(23, "EPQ-23", "你认为自己很紧张，如同\"拉紧的弦\"一样吗？", false, createTwoPointOptions()));
        questions.add(new Question(24, "EPQ-24", "当你与别人在一起时，你是否言语很少？", false, createTwoPointOptions()));
        questions.add(new Question(25, "EPQ-25", "你是否有时感到自己可怜？", false, createTwoPointOptions()));
        questions.add(new Question(26, "EPQ-26", "你是否很容易将一个沉寂的集会搞得活跃起来？", false, createTwoPointOptions()));
        questions.add(new Question(27, "EPQ-27", "你为你的健康担忧吗？", false, createTwoPointOptions()));
        questions.add(new Question(28, "EPQ-28", "你喜欢与人混在一起吗？", false, createTwoPointOptions()));
        questions.add(new Question(29, "EPQ-29", "你患失眠吗？", false, createTwoPointOptions()));
        questions.add(new Question(30, "EPQ-30", "你能使一个集会顺利进行吗？", false, createTwoPointOptions()));
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
        // 计算各分量表得分
        float eScore = 0;    // 内外向 (E量表)
        float nScore = 0;    // 神经质/情绪稳定性 (N量表)
        float pScore = 0;    // 精神质 (P量表)
        float lScore = 0;    // 掩饰性 (L量表)

        // E量表题目索引 (内外向)
        int[] eIndices = {0, 3, 6, 9, 13, 16, 19, 21, 25, 27, 29}; // 共11题
        // N量表题目索引 (神经质)
        int[] nIndices = {2, 5, 8, 10, 14, 17, 20, 22, 24, 26, 28}; // 共11题
        // P量表题目索引 (精神质)
        int[] pIndices = {1, 4, 7, 11, 15, 18, 23}; // 共7题
        // L量表题目索引 (掩饰性)
        int[] lIndices = {12}; // 共1题（简化版）

        // 计算E量表得分
        for (int index : eIndices) {
            EPQResult result = (EPQResult) this.getQuestions().get(index).answer(answer.get(index));
            eScore += result.getScore();
        }

        // 计算N量表得分
        for (int index : nIndices) {
            EPQResult result = (EPQResult) this.getQuestions().get(index).answer(answer.get(index));
            nScore += result.getScore();
        }

        // 计算P量表得分
        for (int index : pIndices) {
            EPQResult result = (EPQResult) this.getQuestions().get(index).answer(answer.get(index));
            pScore += result.getScore();
        }

        // 计算L量表得分
        for (int index : lIndices) {
            EPQResult result = (EPQResult) this.getQuestions().get(index).answer(answer.get(index));
            lScore += result.getScore();
        }

        // 转换为标准分（简化处理）
        float eStandard = (eScore / eIndices.length) * 10;
        float nStandard = (nScore / nIndices.length) * 10;
        float pStandard = (pScore / pIndices.length) * 10;
        float lStandard = (lScore / lIndices.length) * 10;

        EPQReport result = new EPQReport();
        result.setEScore(eScore);
        result.setNScore(nScore);
        result.setPScore(pScore);
        result.setLScore(lScore);
        result.setEStandard(eStandard);
        result.setNStandard(nStandard);
        result.setPStandard(pStandard);
        result.setLStandard(lStandard);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的EPQ艾森克人格问卷测试结果：\n\n");

        message.append(String.format("内外向(E)量表: 原始分%.1f, 标准分%.1f\n", eScore, eStandard));
        message.append(String.format("神经质(N)量表: 原始分%.1f, 标准分%.1f\n", nScore, nStandard));
        message.append(String.format("精神质(P)量表: 原始分%.1f, 标准分%.1f\n", pScore, pStandard));
        message.append(String.format("掩饰性(L)量表: 原始分%.1f, 标准分%.1f\n\n", lScore, lStandard));

        // 结果解释
        message.append("人格特质分析：\n");

        // E量表解释
        if (eStandard > 6.5) {
            message.append("• 外向型人格：好交际，渴望刺激和冒险，情感易于冲动\n");
        } else if (eStandard < 3.5) {
            message.append("• 内向型人格：好静，富于内省，不喜欢刺激，情绪比较稳定\n");
        } else {
            message.append("• 中间型人格：内外向特征均衡\n");
        }

        // N量表解释
        if (nStandard > 6.5) {
            message.append("• 情绪不稳定：焦虑、紧张、易怒，常有强烈情绪反应\n");
        } else if (nStandard < 3.5) {
            message.append("• 情绪稳定：情绪平稳，反应适度\n");
        } else {
            message.append("• 情绪适中：情绪反应在正常范围内\n");
        }

        // P量表解释
        if (pStandard > 6.5) {
            message.append("• 精神质倾向：可能较为孤独，不关心他人，适应环境较慢\n");
        } else {
            message.append("• 精神质正常：人际关系良好，适应环境能力正常\n");
        }

        // L量表解释
        if (lStandard > 7) {
            message.append("• 掩饰倾向：测试结果可能受到社会期望影响\n");
        } else {
            message.append("• 掩饰性正常：回答较为真实可信\n");
        }

        message.append("\n温馨提示：本测试为简化版本，结果仅供参考。如需详细评估，请进行完整版测试。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * EPQ测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            EPQResult result = new EPQResult();

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
     * EPQ问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class EPQResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * EPQ测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class EPQReport extends PsychTestResult {
        // 原始分
        private float eScore;
        private float nScore;
        private float pScore;
        private float lScore;

        // 标准分
        private float eStandard;
        private float nStandard;
        private float pStandard;
        private float lStandard;
    }
}