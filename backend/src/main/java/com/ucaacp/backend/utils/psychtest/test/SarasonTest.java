package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * Sarason考试焦虑量表简化版（30题）
 */
public class SarasonTest extends PsychTest {

    public SarasonTest() {
        super(11, "Sarason考试焦虑量表", "考试焦虑量表简化版，包含30个问题，评估考试焦虑程度");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 使用2点计分：是=1分，否=0分（部分题目反向计分）
        // 从原37题中精选30个代表性题目

        // 认知焦虑相关 (10题)
        questions.add(new Question(1, "SAR-1", "当一次重大考试就要来临时，我总是在想别人比我聪明得多", false, createTwoPointOptions()));
        questions.add(new Question(2, "SAR-2", "考试期间，我发现自己总是在想一些和考试内容无关的事", false, createTwoPointOptions()));
        questions.add(new Question(3, "SAR-3", "考试期间我经常想到会失败", false, createTwoPointOptions()));
        questions.add(new Question(4, "SAR-4", "在一次考试中取得好成绩似乎并不能增加我在第二次考试中的信心", false, createTwoPointOptions()));
        questions.add(new Question(5, "SAR-5", "考试结束后我总是觉得可以比实际上做得更好", false, createTwoPointOptions()));
        questions.add(new Question(6, "SAR-6", "考试期间我经常很紧张，以至本来知道的东西也忘了", false, createTwoPointOptions()));
        questions.add(new Question(7, "SAR-7", "对某一门考试，我越努力复习越感到困惑", false, createTwoPointOptions()));
        questions.add(new Question(8, "SAR-8", "某门考试一结束，我试图停止有关担忧，但做不到", false, createTwoPointOptions()));
        questions.add(new Question(9, "SAR-9", "考试期间我有时会想我是否能完成学业", false, createTwoPointOptions()));
        questions.add(new Question(10, "SAR-10", "想着我在考试中能得多少分，影响了我的复习和考试", false, createTwoPointOptions()));

        // 生理焦虑相关 (8题)
        questions.add(new Question(11, "SAR-11", "参加重大考试时，我会出很多汗", false, createTwoPointOptions()));
        questions.add(new Question(12, "SAR-12", "重大考试后我经常感到紧张，以至胃不舒服", false, createTwoPointOptions()));
        questions.add(new Question(13, "SAR-13", "在重大考试期间我有时感到心跳很快", false, createTwoPointOptions()));
        questions.add(new Question(14, "SAR-14", "在重大考试前，我吃不香", false, createTwoPointOptions()));
        questions.add(new Question(15, "SAR-15", "在重大考试前我发现我的手臂会颤抖", false, createTwoPointOptions()));
        questions.add(new Question(16, "SAR-16", "一接触到发下的试卷，我就觉得很不自在", false, createTwoPointOptions()));
        questions.add(new Question(17, "SAR-17", "考试期间，我的情绪反应不会干扰我考试", true, createTwoPointOptions())); // 反向
        questions.add(new Question(18, "SAR-18", "我很差劲的想法会干扰我在考试中的表现", false, createTwoPointOptions()));

        // 行为回避相关 (6题)
        questions.add(new Question(19, "SAR-19", "如果我将要做一次智能测试，在做之前我会非常焦虑", false, createTwoPointOptions()));
        questions.add(new Question(20, "SAR-20", "当一次突然袭击式的考试来到时，我感到很怕", false, createTwoPointOptions()));
        questions.add(new Question(21, "SAR-21", "我对智能考试和期末考试之类的事总感到发怵", false, createTwoPointOptions()));
        questions.add(new Question(22, "SAR-22", "我宁愿写一篇论文，而不是参加一次考试，作为某门课程的成绩", false, createTwoPointOptions()));
        questions.add(new Question(23, "SAR-23", "如果考试能废除的话，我想我能学得更好", false, createTwoPointOptions()));
        questions.add(new Question(24, "SAR-24", "我讨厌老师喜欢搞突然袭击式考试的课程", false, createTwoPointOptions()));

        // 自信心相关 (6题，含反向计分)
        questions.add(new Question(25, "SAR-25", "如果我知道将会有一次智能测试，在此之前我感到很自信、很轻松", true, createTwoPointOptions())); // 反向
        questions.add(new Question(26, "SAR-26", "每次期末考试之前，我总有一种紧张不安的感觉", false, createTwoPointOptions()));
        questions.add(new Question(27, "SAR-27", "复习重要的考试对我来说似乎是一个很大的挑战", false, createTwoPointOptions()));
        questions.add(new Question(28, "SAR-28", "尽管我对某门考试复习很好，但我仍然感到焦虑", false, createTwoPointOptions()));
        questions.add(new Question(29, "SAR-29", "我对考试抱这样的态度：虽然我现在不懂，但我并不担心", true, createTwoPointOptions())); // 反向
        questions.add(new Question(30, "SAR-30", "在考试前我很少有临时抱佛脚的需要", true, createTwoPointOptions())); // 反向
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
        // 计算总分
        float totalScore = 0;

        // 计算各维度得分
        float cognitiveScore = 0;      // 认知焦虑
        float physicalScore = 0;       // 生理焦虑
        float avoidanceScore = 0;      // 行为回避
        float confidenceScore = 0;     // 自信心（反向）

        // 各维度题目索引
        int[] cognitiveIndices = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};          // 1-10题
        int[] physicalIndices = {10, 11, 12, 13, 14, 15, 16, 17};         // 11-18题
        int[] avoidanceIndices = {18, 19, 20, 21, 22, 23};                // 19-24题
        int[] confidenceIndices = {24, 25, 26, 27, 28, 29};               // 25-30题（反向计分）

        // 计算认知焦虑得分
        for (int index : cognitiveIndices) {
            SarasonResult result = (SarasonResult) this.getQuestions().get(index).answer(answer.get(index));
            cognitiveScore += result.getScore();
        }

        // 计算生理焦虑得分
        for (int index : physicalIndices) {
            SarasonResult result = (SarasonResult) this.getQuestions().get(index).answer(answer.get(index));
            // 第17题是反向计分
            if (index == 16) { // 第17题
                physicalScore += (1 - result.getScore()); // 反向计分
            } else {
                physicalScore += result.getScore();
            }
        }

        // 计算行为回避得分
        for (int index : avoidanceIndices) {
            SarasonResult result = (SarasonResult) this.getQuestions().get(index).answer(answer.get(index));
            avoidanceScore += result.getScore();
        }

        // 计算自信心得分（反向计分）
        for (int index : confidenceIndices) {
            SarasonResult result = (SarasonResult) this.getQuestions().get(index).answer(answer.get(index));
            confidenceScore += result.getScore(); // 这些题目本身就是反向计分设计的
        }

        // 计算总分（注意：自信心维度已经是反向计分）
        totalScore = cognitiveScore + physicalScore + avoidanceScore + confidenceScore;

        // 确定焦虑程度
        String anxietyLevel = determineAnxietyLevel(totalScore);
        String suggestion = getSuggestion(totalScore);

        // 计算各维度平均分
        float cognitiveMean = cognitiveScore / cognitiveIndices.length;
        float physicalMean = physicalScore / physicalIndices.length;
        float avoidanceMean = avoidanceScore / avoidanceIndices.length;
        float confidenceMean = confidenceScore / confidenceIndices.length;

        SarasonReport result = new SarasonReport();

        // 设置各维度得分
        result.setCognitiveScore(cognitiveScore);
        result.setPhysicalScore(physicalScore);
        result.setAvoidanceScore(avoidanceScore);
        result.setConfidenceScore(confidenceScore);
        result.setTotalScore(totalScore);

        // 设置各维度均分
        result.setCognitiveMean(cognitiveMean);
        result.setPhysicalMean(physicalMean);
        result.setAvoidanceMean(avoidanceMean);
        result.setConfidenceMean(confidenceMean);

        result.setAnxietyLevel(anxietyLevel);
        result.setSuggestion(suggestion);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("Sarason考试焦虑量表测试结果：\n\n");

        message.append(String.format("认知焦虑: 总分%.1f, 均分%.2f\n", cognitiveScore, cognitiveMean));
        message.append(String.format("生理焦虑: 总分%.1f, 均分%.2f\n", physicalScore, physicalMean));
        message.append(String.format("行为回避: 总分%.1f, 均分%.2f\n", avoidanceScore, avoidanceMean));
        message.append(String.format("自信心: 总分%.1f, 均分%.2f\n", confidenceScore, confidenceMean));
        message.append(String.format("总得分: %.1f\n\n", totalScore));

        message.append("焦虑程度：").append(anxietyLevel).append("\n\n");

        // 各维度分析
        message.append("各维度分析：\n");

        // 认知焦虑分析
        if (cognitiveMean > 0.7) {
            message.append("• 认知焦虑：您存在明显的消极思维，如担心失败、注意力分散等\n");
        } else if (cognitiveMean > 0.4) {
            message.append("• 认知焦虑：您偶有消极思维，但总体可控\n");
        } else {
            message.append("• 认知焦虑：您的思维状态良好，很少受到焦虑干扰\n");
        }

        // 生理焦虑分析
        if (physicalMean > 0.7) {
            message.append("• 生理焦虑：您有明显的身体不适反应，如出汗、心跳加快等\n");
        } else if (physicalMean > 0.4) {
            message.append("• 生理焦虑：您有轻微的生理不适反应\n");
        } else {
            message.append("• 生理焦虑：您的身体反应正常，很少出现不适\n");
        }

        // 行为回避分析
        if (avoidanceMean > 0.7) {
            message.append("• 行为回避：您有明显的考试回避倾向\n");
        } else if (avoidanceMean > 0.4) {
            message.append("• 行为回避：您对考试有一定程度的回避\n");
        } else {
            message.append("• 行为回避：您能够积极面对考试\n");
        }

        // 自信心分析
        if (confidenceMean < 0.3) {
            message.append("• 自信心：您的考试自信心较低\n");
        } else if (confidenceMean < 0.6) {
            message.append("• 自信心：您的考试自信心处于中等水平\n");
        } else {
            message.append("• 自信心：您的考试自信心较高\n");
        }

        message.append("\n").append(suggestion);

        message.append("\n\n应对建议：\n");

        if (cognitiveScore > 0) {
            message.append("• 认知调节：学习正念冥想，识别并挑战消极思维\n");
        }

        if (physicalScore > 0) {
            message.append("• 生理调节：练习深呼吸、渐进式肌肉放松等放松技巧\n");
        }

        if (avoidanceScore > 0) {
            message.append("• 行为调节：采用系统脱敏法，逐步面对考试情境\n");
        }

        if (confidenceScore < 3) {
            message.append("• 自信建立：制定合理目标，积累成功体验\n");
        }

        message.append("\n温馨提示：适度的考试焦虑有助于发挥，但过度焦虑会影响表现。如果焦虑严重影响学习和生活，建议寻求专业心理咨询。");

        result.setMessage(message.toString());
        return result;
    }

    /**
     * 确定焦虑程度
     */
    private String determineAnxietyLevel(float totalScore) {
        if (totalScore <= 9) {
            return "轻度焦虑";
        } else if (totalScore <= 19) {
            return "中度焦虑";
        } else {
            return "重度焦虑";
        }
    }

    /**
     * 获取建议
     */
    private String getSuggestion(float totalScore) {
        if (totalScore <= 9) {
            return "面对考试，您的心中会有些惶恐不安，有一种焦虑感，请别担心，这是正常现象。当您出现焦虑感时，说明您的脑细胞已经兴奋起来了，准备好面对紧张的考试了。相关研究结果表明，适度的焦虑感有助于考试成绩的提高。\n\n建议：在考试前，您对自己的心理掌控能力还是较好的，可以适当的放松来做一些缓解。";
        } else if (totalScore <= 19) {
            return "您在面临考试时，心情过于激动，焦虑感过高。以这样紧张的心情去参加考试，势必难以考出您的实际水平。由于焦虑，您的神经系统功能可能变得有点儿紊乱，因此，您应当设法降低自己的考试焦虑水平，防止神经功能进一步恶化。\n\n建议：在考试前，您最重要的工作并不是要抓紧时间再多学一点，而是要调整自己的心态。您可以适当放低对自己的要求，尽量做一些运动来缓解机体的焦虑。";
        } else {
            return "您已经患有较重的考试焦虑症。对您而言，考试已经不仅仅是考试那么简单，更像是一次次艰难地挑战，尤其是在考试前夕莫名其妙难以忍受的焦虑和恐惧，在这些情绪的困扰中，每一次考试都可能影响您的正常发挥。\n\n建议：您的焦虑水平已经较高，这种情况下建议您进行心理咨询，在心理咨询师的陪伴下一步步来降低考试带给您的焦虑。";
        }
    }

    /**
     * Sarason测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            SarasonResult result = new SarasonResult();

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
     * Sarason问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class SarasonResult extends PsychQuestionResult {
        private String selectedKey;
        private float score;
    }

    /**
     * Sarason测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class SarasonReport extends PsychTestResult {
        // 各维度得分
        private float cognitiveScore;
        private float physicalScore;
        private float avoidanceScore;
        private float confidenceScore;
        private float totalScore;

        // 各维度均分
        private float cognitiveMean;
        private float physicalMean;
        private float avoidanceMean;
        private float confidenceMean;

        // 焦虑程度
        private String anxietyLevel;
        private String suggestion;
    }
}