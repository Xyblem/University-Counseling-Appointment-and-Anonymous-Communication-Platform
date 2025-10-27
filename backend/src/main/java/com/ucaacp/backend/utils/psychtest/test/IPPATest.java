package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * IPPA父母与同伴依恋量表简化版（30题）
 */
public class IPPATest extends PsychTest {

    public IPPATest() {
        super(8, "IPPA父母与同伴依恋量表", "父母与同伴依恋量表简化版，包含30个问题，评估依恋关系质量");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用5点计分：1=根本不是这样，2=很少是这样，3=有时是这样，4=经常是这样，5=总是这样

        // 母亲依恋量表 (10题)
        questions.add(new Question(1, "IPPA-M-1", "我母亲尊重我的情感", false, createFivePointOptions()));
        questions.add(new Question(2, "IPPA-M-2", "我认为我的母亲是称职的母亲", false, createFivePointOptions()));
        questions.add(new Question(3, "IPPA-M-3", "我真希望我的母亲是另外的人", true, createFivePointOptions())); // 反向
        questions.add(new Question(4, "IPPA-M-4", "我母亲很认可我现在的样子", false, createFivePointOptions()));
        questions.add(new Question(5, "IPPA-M-5", "对我在意的事情，我喜欢听取我母亲的意见", false, createFivePointOptions()));
        questions.add(new Question(6, "IPPA-M-6", "我觉得向母亲表露自己的情感是没有用的", true, createFivePointOptions())); // 反向
        questions.add(new Question(7, "IPPA-M-7", "当我为某事情难过的时候，我母亲会看出来", false, createFivePointOptions()));
        questions.add(new Question(8, "IPPA-M-8", "与母亲讨论我的困扰令我感到很羞耻，很愚蠢", true, createFivePointOptions())); // 反向
        questions.add(new Question(9, "IPPA-M-9", "母亲对我期望太高", true, createFivePointOptions())); // 反向
        questions.add(new Question(10, "IPPA-M-10", "我母亲理解我", false, createFivePointOptions()));

        // 父亲依恋量表 (10题)
        questions.add(new Question(11, "IPPA-F-1", "我父亲尊重我的情感", false, createFivePointOptions()));
        questions.add(new Question(12, "IPPA-F-2", "我认为我的父亲是称职的父亲", false, createFivePointOptions()));
        questions.add(new Question(13, "IPPA-F-3", "我真希望我的父亲是另外的人", true, createFivePointOptions())); // 反向
        questions.add(new Question(14, "IPPA-F-4", "我父亲很认可我现在的样子", false, createFivePointOptions()));
        questions.add(new Question(15, "IPPA-F-5", "对我在意的事情，我喜欢听取我父亲的意见", false, createFivePointOptions()));
        questions.add(new Question(16, "IPPA-F-6", "我觉得向父亲表露自己的情感是没有用的", true, createFivePointOptions())); // 反向
        questions.add(new Question(17, "IPPA-F-7", "当我为某事情难过的时候，我父亲会看出来", false, createFivePointOptions()));
        questions.add(new Question(18, "IPPA-F-8", "与父亲讨论我的困扰令我感到很羞耻，很愚蠢", true, createFivePointOptions())); // 反向
        questions.add(new Question(19, "IPPA-F-9", "父亲对我期望太高", true, createFivePointOptions())); // 反向
        questions.add(new Question(20, "IPPA-F-10", "我父亲理解我", false, createFivePointOptions()));

        // 同伴依恋量表 (10题)
        questions.add(new Question(21, "IPPA-P-1", "我喜欢在我看重的问题上听取我朋友的观点", false, createFivePointOptions()));
        questions.add(new Question(22, "IPPA-P-2", "当我因某事感到难过的时候，我的朋友能看出来", false, createFivePointOptions()));
        questions.add(new Question(23, "IPPA-P-3", "当我们讨论事情时，我的朋友能重视我的观点", false, createFivePointOptions()));
        questions.add(new Question(24, "IPPA-P-4", "与朋友讨论我的苦恼，会让我感到羞耻和愚蠢", true, createFivePointOptions())); // 反向
        questions.add(new Question(25, "IPPA-P-5", "我希望我的朋友不是这个样子", true, createFivePointOptions())); // 反向
        questions.add(new Question(26, "IPPA-P-6", "我的朋友理解我", false, createFivePointOptions()));
        questions.add(new Question(27, "IPPA-P-7", "我的朋友鼓励我探讨我的困难", false, createFivePointOptions()));
        questions.add(new Question(28, "IPPA-P-8", "我的朋友接纳我这个样子", false, createFivePointOptions()));
        questions.add(new Question(29, "IPPA-P-9", "我的朋友不理解我这些天都经历了什么", true, createFivePointOptions())); // 反向
        questions.add(new Question(30, "IPPA-P-10", "我信任我的朋友", false, createFivePointOptions()));
    }

    /**
     * 创建5点计分选项
     */
    private List<PsychOption> createFivePointOptions() {
        return List.of(
                new PsychOption("1", "根本不是这样", 1),
                new PsychOption("2", "很少是这样", 2),
                new PsychOption("3", "有时是这样", 3),
                new PsychOption("4", "经常是这样", 4),
                new PsychOption("5", "总是这样", 5)
        );
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        // 计算各分量表得分
        float motherTrustScore = 0;        // 母亲信任
        float motherCommunicationScore = 0; // 母亲沟通
        float motherAlienationScore = 0;    // 母亲疏离
        float fatherTrustScore = 0;        // 父亲信任
        float fatherCommunicationScore = 0; // 父亲沟通
        float fatherAlienationScore = 0;    // 父亲疏离
        float peerTrustScore = 0;          // 同伴信任
        float peerCommunicationScore = 0;  // 同伴沟通
        float peerAlienationScore = 0;     // 同伴疏离

        // 母亲量表题目索引 (1-10题)
        int[] motherTrustIndices = {0, 1, 3};          // 信任维度
        int[] motherCommunicationIndices = {4, 6, 9};  // 沟通维度
        int[] motherAlienationIndices = {2, 5, 7, 8};  // 疏离维度（反向计分）

        // 父亲量表题目索引 (11-20题)
        int[] fatherTrustIndices = {10, 11, 13};       // 信任维度
        int[] fatherCommunicationIndices = {14, 16, 19}; // 沟通维度
        int[] fatherAlienationIndices = {12, 15, 17, 18}; // 疏离维度（反向计分）

        // 同伴量表题目索引 (21-30题)
        int[] peerTrustIndices = {25, 27, 29};         // 信任维度
        int[] peerCommunicationIndices = {20, 21, 22, 26}; // 沟通维度
        int[] peerAlienationIndices = {23, 24, 28};    // 疏离维度（反向计分）

        // 计算母亲各维度得分
        for (int index : motherTrustIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            motherTrustScore += result.getScore();
        }

        for (int index : motherCommunicationIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            motherCommunicationScore += result.getScore();
        }

        for (int index : motherAlienationIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            // 疏离维度反向计分
            motherAlienationScore += (6 - result.getScore()); // 5点量表，6-得分实现反向
        }

        // 计算父亲各维度得分
        for (int index : fatherTrustIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            fatherTrustScore += result.getScore();
        }

        for (int index : fatherCommunicationIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            fatherCommunicationScore += result.getScore();
        }

        for (int index : fatherAlienationIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            // 疏离维度反向计分
            fatherAlienationScore += (6 - result.getScore());
        }

        // 计算同伴各维度得分
        for (int index : peerTrustIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            peerTrustScore += result.getScore();
        }

        for (int index : peerCommunicationIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            peerCommunicationScore += result.getScore();
        }

        for (int index : peerAlienationIndices) {
            IPPAResult result = (IPPAResult) this.getQuestions().get(index).answer(answer.get(index));
            // 疏离维度反向计分
            peerAlienationScore += (6 - result.getScore());
        }

        // 计算总分
        float motherTotalScore = motherTrustScore + motherCommunicationScore + motherAlienationScore;
        float fatherTotalScore = fatherTrustScore + fatherCommunicationScore + fatherAlienationScore;
        float peerTotalScore = peerTrustScore + peerCommunicationScore + peerAlienationScore;

        // 计算平均分
        float motherTrustMean = motherTrustScore / motherTrustIndices.length;
        float motherCommunicationMean = motherCommunicationScore / motherCommunicationIndices.length;
        float motherAlienationMean = motherAlienationScore / motherAlienationIndices.length;
        float fatherTrustMean = fatherTrustScore / fatherTrustIndices.length;
        float fatherCommunicationMean = fatherCommunicationScore / fatherCommunicationIndices.length;
        float fatherAlienationMean = fatherAlienationScore / fatherAlienationIndices.length;
        float peerTrustMean = peerTrustScore / peerTrustIndices.length;
        float peerCommunicationMean = peerCommunicationScore / peerCommunicationIndices.length;
        float peerAlienationMean = peerAlienationScore / peerAlienationIndices.length;

        IPPAReport result = new IPPAReport();

        // 设置母亲得分
        result.setMotherTrustScore(motherTrustScore);
        result.setMotherCommunicationScore(motherCommunicationScore);
        result.setMotherAlienationScore(motherAlienationScore);
        result.setMotherTotalScore(motherTotalScore);
        result.setMotherTrustMean(motherTrustMean);
        result.setMotherCommunicationMean(motherCommunicationMean);
        result.setMotherAlienationMean(motherAlienationMean);

        // 设置父亲得分
        result.setFatherTrustScore(fatherTrustScore);
        result.setFatherCommunicationScore(fatherCommunicationScore);
        result.setFatherAlienationScore(fatherAlienationScore);
        result.setFatherTotalScore(fatherTotalScore);
        result.setFatherTrustMean(fatherTrustMean);
        result.setFatherCommunicationMean(fatherCommunicationMean);
        result.setFatherAlienationMean(fatherAlienationMean);

        // 设置同伴得分
        result.setPeerTrustScore(peerTrustScore);
        result.setPeerCommunicationScore(peerCommunicationScore);
        result.setPeerAlienationScore(peerAlienationScore);
        result.setPeerTotalScore(peerTotalScore);
        result.setPeerTrustMean(peerTrustMean);
        result.setPeerCommunicationMean(peerCommunicationMean);
        result.setPeerAlienationMean(peerAlienationMean);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的IPPA父母与同伴依恋量表测试结果：\n\n");

        message.append("母亲依恋关系分析：\n");
        message.append(String.format("信任维度: 总分%.1f, 均分%.2f\n", motherTrustScore, motherTrustMean));
        message.append(String.format("沟通维度: 总分%.1f, 均分%.2f\n", motherCommunicationScore, motherCommunicationMean));
        message.append(String.format("疏离维度: 总分%.1f, 均分%.2f\n", motherAlienationScore, motherAlienationMean));
        message.append(String.format("母亲依恋总分: %.1f\n\n", motherTotalScore));

        message.append("父亲依恋关系分析：\n");
        message.append(String.format("信任维度: 总分%.1f, 均分%.2f\n", fatherTrustScore, fatherTrustMean));
        message.append(String.format("沟通维度: 总分%.1f, 均分%.2f\n", fatherCommunicationScore, fatherCommunicationMean));
        message.append(String.format("疏离维度: 总分%.1f, 均分%.2f\n", fatherAlienationScore, fatherAlienationMean));
        message.append(String.format("父亲依恋总分: %.1f\n\n", fatherTotalScore));

        message.append("同伴依恋关系分析：\n");
        message.append(String.format("信任维度: 总分%.1f, 均分%.2f\n", peerTrustScore, peerTrustMean));
        message.append(String.format("沟通维度: 总分%.1f, 均分%.2f\n", peerCommunicationScore, peerCommunicationMean));
        message.append(String.format("疏离维度: 总分%.1f, 均分%.2f\n", peerAlienationScore, peerAlienationMean));
        message.append(String.format("同伴依恋总分: %.1f\n\n", peerTotalScore));

        // 结果解释
        message.append("依恋关系质量分析：\n");

        // 母亲依恋评价
        message.append("母亲依恋：");
        if (motherTotalScore > 35) {
            message.append("安全型依恋 - 与母亲关系亲密，沟通良好\n");
        } else if (motherTotalScore > 25) {
            message.append("中间型依恋 - 与母亲关系基本良好\n");
        } else {
            message.append("不安全型依恋 - 与母亲关系需要改善\n");
        }

        // 父亲依恋评价
        message.append("父亲依恋：");
        if (fatherTotalScore > 35) {
            message.append("安全型依恋 - 与父亲关系亲密，沟通良好\n");
        } else if (fatherTotalScore > 25) {
            message.append("中间型依恋 - 与父亲关系基本良好\n");
        } else {
            message.append("不安全型依恋 - 与父亲关系需要改善\n");
        }

        // 同伴依恋评价
        message.append("同伴依恋：");
        if (peerTotalScore > 30) {
            message.append("安全型依恋 - 同伴关系良好，信任度高\n");
        } else if (peerTotalScore > 20) {
            message.append("中间型依恋 - 同伴关系基本良好\n");
        } else {
            message.append("不安全型依恋 - 同伴关系需要加强\n");
        }

        message.append("\n各维度分析：\n");

        // 信任维度分析
        message.append("• 信任维度：反映对他人的可靠性和理解度的感知\n");
        if (motherTrustMean > 3.5 && fatherTrustMean > 3.5 && peerTrustMean > 3.5) {
            message.append("  您对重要他人的信任度较高，这有助于建立稳定关系。\n");
        } else {
            message.append("  某些关系的信任度有待提升，建议加强相互理解。\n");
        }

        // 沟通维度分析
        message.append("• 沟通维度：反映情感表达和问题讨论的开放性\n");
        if (motherCommunicationMean > 3.5 && fatherCommunicationMean > 3.5 && peerCommunicationMean > 3.5) {
            message.append("  您在重要关系中沟通良好，能够表达真实情感。\n");
        } else {
            message.append("  某些关系的沟通需要改善，建议学习有效沟通技巧。\n");
        }

        // 疏离维度分析
        message.append("• 疏离维度：反映关系中的距离感和情感隔离\n");
        if (motherAlienationMean < 2.5 && fatherAlienationMean < 2.5 && peerAlienationMean < 2.5) {
            message.append("  您在重要关系中较少感到疏离，情感连接较好。\n");
        } else {
            message.append("  某些关系中存在疏离感，建议加强情感连接。\n");
        }

        message.append("\n总体建议：\n");
        if (motherTotalScore > 35 && fatherTotalScore > 35 && peerTotalScore > 30) {
            message.append("您的依恋关系整体健康，继续保持良好的沟通和信任。\n");
        } else if (motherTotalScore < 25 || fatherTotalScore < 25 || peerTotalScore < 20) {
            message.append("某些依恋关系需要关注，建议寻求专业指导来改善重要关系。\n");
        } else {
            message.append("您的依恋关系总体良好，某些方面可以进一步优化。\n");
        }

        message.append("\n温馨提示：依恋关系对我们的情感健康有重要影响，理解现有模式是改善关系的第一步。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * IPPA测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            IPPAResult result = new IPPAResult();

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
     * IPPA问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class IPPAResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * IPPA测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class IPPAReport extends PsychTestResult {
        // 母亲依恋得分
        private float motherTrustScore;
        private float motherCommunicationScore;
        private float motherAlienationScore;
        private float motherTotalScore;
        private float motherTrustMean;
        private float motherCommunicationMean;
        private float motherAlienationMean;

        // 父亲依恋得分
        private float fatherTrustScore;
        private float fatherCommunicationScore;
        private float fatherAlienationScore;
        private float fatherTotalScore;
        private float fatherTrustMean;
        private float fatherCommunicationMean;
        private float fatherAlienationMean;

        // 同伴依恋得分
        private float peerTrustScore;
        private float peerCommunicationScore;
        private float peerAlienationScore;
        private float peerTotalScore;
        private float peerTrustMean;
        private float peerCommunicationMean;
        private float peerAlienationMean;
    }
}