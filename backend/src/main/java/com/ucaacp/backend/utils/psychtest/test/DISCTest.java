package com.ucaacp.backend.utils.psychtest.test;

import com.ucaacp.backend.utils.psychtest.classes.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * DISC性格测试
 */
public class DISCTest extends PsychTest {

    public DISCTest() {
        super(1, "DISC性格测试", "DISC性格测试完整版，包含40个问题，测试您的性格特质");
    }

    @Override
    public void initQuestion(List<PsychQuestion> questions) {
        // 问题1-40，每个问题有4个选项，分别对应D、I、S、C四个维度
        // 每个选项的分数为1，表示选择该选项会在对应维度上加1分

        questions.add(new Question(1, "DISC-1", "富于冒险:愿意面对新事物并敢于下决心掌握的人；适应力强:轻松自如适应任何环境；生动:充满活力,表情生动,多手势；善于分析:喜欢研究各部分之间的逻辑和正确的关系。", false, List.of(
                new PsychOption("D", "富于冒险:愿意面对新事物并敢于下决心掌握的人", 1),
                new PsychOption("S", "适应力强:轻松自如适应任何环境", 1),
                new PsychOption("I", "生动:充满活力,表情生动,多手势", 1),
                new PsychOption("C", "善于分析:喜欢研究各部分之间的逻辑和正确的关系", 1)
        )));

        questions.add(new Question(2, "DISC-2", "坚持不懈：要完成现有的事才能做新的事情；喜好娱乐：开心充满乐趣与幽默感；善于说服：用逻辑和事实而不用威严和权利服人；平和：在冲突中不受干扰，保持平静。", false, List.of(
                new PsychOption("C", "坚持不懈：要完成现有的事才能做新的事情", 1),
                new PsychOption("I", "喜好娱乐：开心充满乐趣与幽默感", 1),
                new PsychOption("D", "善于说服：用逻辑和事实而不用威严和权利服人", 1),
                new PsychOption("S", "平和：在冲突中不受干扰，保持平静", 1)
        )));

        questions.add(new Question(3, "DISC-3", "顺服：易接受他人的观点和喜好，不坚持己见；自我牺牲：为他人利益愿意放弃个人意见；善于社交：认为与人相处是好玩，而不是挑战或者商业机会；意志坚定：决心以自己的方式做事。", false, List.of(
                new PsychOption("S", "顺服：易接受他人的观点和喜好，不坚持己见", 1),
                new PsychOption("C", "自我牺牲：为他人利益愿意放弃个人意见", 1),
                new PsychOption("I", "善于社交：认为与人相处是好玩，而不是挑战或者商业机会", 1),
                new PsychOption("D", "意志坚定：决心以自己的方式做事", 1)
        )));

        questions.add(new Question(4, "DISC-4", "使人认同：因人格魅力或性格使人认同；体贴：关心别人的感受与需要；竞争性：把一切当作竞赛，总是有强烈的赢的欲望；自控性：控制自己的情感，极少流露。", false, List.of(
                new PsychOption("I", "使人认同：因人格魅力或性格使人认同", 1),
                new PsychOption("C", "体贴：关心别人的感受与需要", 1),
                new PsychOption("D", "竞争性：把一切当作竞赛，总是有强烈的赢的欲望", 1),
                new PsychOption("S", "自控性：控制自己的情感，极少流露", 1)
        )));

        questions.add(new Question(5, "DISC-5", "使人振作：给他人清新振奋的刺激；尊重他人：对人诚实尊重；善于应变：对任何情况都能作出有效的反应；含蓄：自我约束情绪与热忱。", false, List.of(
                new PsychOption("I", "使人振作：给他人清新振奋的刺激", 1),
                new PsychOption("C", "尊重他人：对人诚实尊重", 1),
                new PsychOption("D", "善于应变：对任何情况都能作出有效的反应", 1),
                new PsychOption("S", "含蓄：自我约束情绪与热忱", 1)
        )));

        questions.add(new Question(6, "DISC-6", "生机勃勃：充满生命力与兴奋；满足：容易接受任何情况与环境；敏感：对周围的人事过分关心；自立：独立性强，只依靠自己的能力、判断、与才智。", false, List.of(
                new PsychOption("I", "生机勃勃：充满生命力与兴奋", 1),
                new PsychOption("S", "满足：容易接受任何情况与环境", 1),
                new PsychOption("C", "敏感：对周围的人事过分关心", 1),
                new PsychOption("D", "自立：独立性强，只依靠自己的能力、判断、与才智", 1)
        )));

        questions.add(new Question(7, "DISC-7", "计划者：先做详尽的计划，并严格要计划进行，不想改动；耐性：不因延误而懊恼，冷静且能容忍；积极：相信自己有转危为安的能力；推动者：动用性格魅力或鼓励别人参与。", false, List.of(
                new PsychOption("C", "计划者：先做详尽的计划，并严格要计划进行，不想改动", 1),
                new PsychOption("S", "耐性：不因延误而懊恼，冷静且能容忍", 1),
                new PsychOption("D", "积极：相信自己有转危为安的能力", 1),
                new PsychOption("I", "推动者：动用性格魅力或鼓励别人参与", 1)
        )));

        questions.add(new Question(8, "DISC-8", "肯定：自信，极少犹豫或者动摇；无拘无束：不喜欢预先计划，或者被计划牵制；羞涩：安静，不善于交谈；有时间性：生活处事依靠时间表，不喜欢计划被人干扰。", false, List.of(
                new PsychOption("D", "肯定：自信，极少犹豫或者动摇", 1),
                new PsychOption("I", "无拘无束：不喜欢预先计划，或者被计划牵制", 1),
                new PsychOption("S", "羞涩：安静，不善于交谈", 1),
                new PsychOption("C", "有时间性：生活处事依靠时间表，不喜欢计划被人干扰", 1)
        )));

        questions.add(new Question(9, "DISC-9", "迁就：改变自己以与他人协调，短时间内按他人要求行事；井井有条：有系统有条理安排事情的人；坦率：毫无保留，坦率发言；乐观：令他人和自己相信任何事情都会好转。", false, List.of(
                new PsychOption("S", "迁就：改变自己以与他人协调，短时间内按他人要求行事", 1),
                new PsychOption("C", "井井有条：有系统有条理安排事情的人", 1),
                new PsychOption("I", "坦率：毫无保留，坦率发言", 1),
                new PsychOption("D", "乐观：令他人和自己相信任何事情都会好转", 1)
        )));

        questions.add(new Question(10, "DISC-10", "强迫性：发号施令，强迫他人听从；忠诚：一贯可靠，忠心不移，有时毫无根据地奉献；有趣：风趣，幽默，把任何事物都能变成精彩的故事；友善：不主动交谈，不爱争论。", false, List.of(
                new PsychOption("D", "强迫性：发号施令，强迫他人听从", 1),
                new PsychOption("C", "忠诚：一贯可靠，忠心不移，有时毫无根据地奉献", 1),
                new PsychOption("I", "有趣：风趣，幽默，把任何事物都能变成精彩的故事", 1),
                new PsychOption("S", "友善：不主动交谈，不爱争论", 1)
        )));

        questions.add(new Question(11, "DISC-11", "勇敢：敢于冒险，无所畏惧；体贴：待人得体，有耐心；注意细节：观察入微，做事情有条不紊；可爱：开心，与他人相处充满乐趣。", false, List.of(
                new PsychOption("D", "勇敢：敢于冒险，无所畏惧", 1),
                new PsychOption("S", "体贴：待人得体，有耐心", 1),
                new PsychOption("C", "注意细节：观察入微，做事情有条不紊", 1),
                new PsychOption("I", "可爱：开心，与他人相处充满乐趣", 1)
        )));

        questions.add(new Question(12, "DISC-12", "令人开心：充满活力，并将快乐传于他人；文化修养：对艺术学术特别爱好，如戏剧、交响乐；自信：确信自己个人能力与成功；贯彻始终：情绪平稳，做事情坚持不懈。", false, List.of(
                new PsychOption("I", "令人开心：充满活力，并将快乐传于他人", 1),
                new PsychOption("C", "文化修养：对艺术学术特别爱好，如戏剧、交响乐", 1),
                new PsychOption("D", "自信：确信自己个人能力与成功", 1),
                new PsychOption("S", "贯彻始终：情绪平稳，做事情坚持不懈", 1)
        )));

        questions.add(new Question(13, "DISC-13", "理想主义：以自己完美的标准来设想衡量新事物；独立：自给自足，独立自信，不需要他人帮忙；无攻击性：不说或者做可能引起别人不满和反对的事情；富有激励：鼓励别人参与、加入，并把每件事情变得有趣。", false, List.of(
                new PsychOption("C", "理想主义：以自己完美的标准来设想衡量新事物", 1),
                new PsychOption("D", "独立：自给自足，独立自信，不需要他人帮忙", 1),
                new PsychOption("S", "无攻击性：不说或者做可能引起别人不满和反对的事情", 1),
                new PsychOption("I", "富有激励：鼓励别人参与、加入，并把每件事情变得有趣", 1)
        )));

        questions.add(new Question(14, "DISC-14", "感情外露：从不掩饰情感.喜好,交谈时常身不由己接触他人；深沉：深刻并常常内省，对肤浅的交谈、消遣会厌恶；果断：有很快做出判断与结论的能力；幽默：语气平和而有冷静的幽默。", false, List.of(
                new PsychOption("I", "感情外露：从不掩饰情感.喜好,交谈时常身不由己接触他人", 1),
                new PsychOption("C", "深沉：深刻并常常内省，对肤浅的交谈、消遣会厌恶", 1),
                new PsychOption("D", "果断：有很快做出判断与结论的能力", 1),
                new PsychOption("S", "幽默：语气平和而有冷静的幽默", 1)
        )));

        questions.add(new Question(15, "DISC-15", "调解者：经常居中调节不同的意见，以避免双方的冲突；音乐性：爱好参与并有较深的鉴赏能力，因音乐的艺术性,而不是因为表演的乐趣；发起人：高效率的推动者，是他人的领导者，闲不住；喜交朋友：喜欢周旋聚会中，善交新朋友不把任何人当陌生人。", false, List.of(
                new PsychOption("S", "调解者：经常居中调节不同的意见，以避免双方的冲突", 1),
                new PsychOption("C", "音乐性：爱好参与并有较深的鉴赏能力，因音乐的艺术性,而不是因为表演的乐趣", 1),
                new PsychOption("D", "发起人：高效率的推动者，是他人的领导者，闲不住", 1),
                new PsychOption("I", "喜交朋友：喜欢周旋聚会中，善交新朋友不把任何人当陌生人", 1)
        )));

        questions.add(new Question(16, "DISC-16", "考虑周到：善解人意，帮助别人，记住特别的日子；执着：不达目的，誓不罢休；多言：不断的说话、讲笑话以娱乐他人，觉得应该避免沉默而带来的的尴尬；容忍：易接受别人的想法和看法，不需要反对或改变他人。", false, List.of(
                new PsychOption("C", "考虑周到：善解人意，帮助别人，记住特别的日子", 1),
                new PsychOption("D", "执着：不达目的，誓不罢休", 1),
                new PsychOption("I", "多言：不断的说话、讲笑话以娱乐他人，觉得应该避免沉默而带来的的尴尬", 1),
                new PsychOption("S", "容忍：易接受别人的想法和看法，不需要反对或改变他人", 1)
        )));

        questions.add(new Question(17, "DISC-17", "聆听者：愿意听别人倾诉；忠心对自己的理想、朋友、工作都绝对忠实，有时甚至不需要理由；领导者：天生的领导，不相信别人的能力能比上自己；活力充沛：充满活力，精力充沛。", false, List.of(
                new PsychOption("S", "聆听者：愿意听别人倾诉", 1),
                new PsychOption("C", "忠心对自己的理想、朋友、工作都绝对忠实，有时甚至不需要理由", 1),
                new PsychOption("D", "领导者：天生的领导，不相信别人的能力能比上自己", 1),
                new PsychOption("I", "活力充沛：充满活力，精力充沛", 1)
        )));

        questions.add(new Question(18, "DISC-18", "知足：满足自己拥有的，很少羡慕别人；首领：要求领导地位及别人跟随；制图者：用图表数字来组织生活，解决问题；惹人喜爱：人们注意的中心，令人喜欢。", false, List.of(
                new PsychOption("S", "知足：满足自己拥有的，很少羡慕别人", 1),
                new PsychOption("D", "首领：要求领导地位及别人跟随", 1),
                new PsychOption("C", "制图者：用图表数字来组织生活，解决问题", 1),
                new PsychOption("I", "惹人喜爱：人们注意的中心，令人喜欢", 1)
        )));

        questions.add(new Question(19, "DISC-19", "完美主义者：对自己、对别人都高标准、一切事物有秩序；和气：易相处，易说话，易让人接近；勤劳：不停的工作，完成任务，不愿意休息；受欢迎：聚会时的灵魂人物，受欢迎的宾客。", false, List.of(
                new PsychOption("C", "完美主义者：对自己、对别人都高标准、一切事物有秩序", 1),
                new PsychOption("S", "和气：易相处，易说话，易让人接近", 1),
                new PsychOption("D", "勤劳：不停的工作，完成任务，不愿意休息", 1),
                new PsychOption("I", "受欢迎：聚会时的灵魂人物，受欢迎的宾客", 1)
        )));

        questions.add(new Question(20, "DISC-20", "跳跃性：充满活力和生气勃勃；无畏：大胆前进，不怕冒险；规范性：时时坚持自己的举止合乎认同的道德规范；平衡：稳定，走中间路线。", false, List.of(
                new PsychOption("I", "跳跃性：充满活力和生气勃勃", 1),
                new PsychOption("D", "无畏：大胆前进，不怕冒险", 1),
                new PsychOption("C", "规范性：时时坚持自己的举止合乎认同的道德规范", 1),
                new PsychOption("S", "平衡：稳定，走中间路线", 1)
        )));

        questions.add(new Question(21, "DISC-21", "乏味：死气沉沉，缺乏生气；忸怩：躲避别人的注意力，在众人注意下不自然；露骨：好表现，华而不实，声音大；专横：喜命令支配，有时略显傲慢。", false, List.of(
                new PsychOption("S", "乏味：死气沉沉，缺乏生气", 1),
                new PsychOption("C", "忸怩：躲避别人的注意力，在众人注意下不自然", 1),
                new PsychOption("I", "露骨：好表现，华而不实，声音大", 1),
                new PsychOption("D", "专横：喜命令支配，有时略显傲慢", 1)
        )));

        questions.add(new Question(22, "DISC-22", "散漫：生活任性无秩序；无同情心：不易理解别人的问题和麻烦；缺乏热情：不易兴奋，经常感到好事难做；不宽恕：不易宽恕和忘记别人对自己的伤害，易嫉妒。", false, List.of(
                new PsychOption("I", "散漫：生活任性无秩序", 1),
                new PsychOption("D", "无同情心：不易理解别人的问题和麻烦", 1),
                new PsychOption("S", "缺乏热情：不易兴奋，经常感到好事难做", 1),
                new PsychOption("C", "不宽恕：不易宽恕和忘记别人对自己的伤害，易嫉妒", 1)
        )));

        questions.add(new Question(23, "DISC-23", "保留：不愿意参与，尤其是当事情复杂时；怨恨：把实际或者自己想象的别人的冒犯经常放在心中；逆反：抗拒、或者拒不接受别人的方法，固执己见；唠叨：重复讲同一件事情或故事，忘记已经重复多次，总是不断找话题说话。", false, List.of(
                new PsychOption("S", "保留：不愿意参与，尤其是当事情复杂时", 1),
                new PsychOption("C", "怨恨：把实际或者自己想象的别人的冒犯经常放在心中", 1),
                new PsychOption("D", "逆反：抗拒、或者拒不接受别人的方法，固执己见", 1),
                new PsychOption("I", "唠叨：重复讲同一件事情或故事，忘记已经重复多次，总是不断找话题说话", 1)
        )));

        questions.add(new Question(24, "DISC-24", "挑剔：坚持琐事细节，总喜欢挑不足；胆小：经常感到强烈的担心焦虑、悲戚；健忘：缺乏自我约束，导致健忘，不愿意回忆无趣的事情；率直：直言不讳，直接表达自己的看法。", false, List.of(
                new PsychOption("C", "挑剔：坚持琐事细节，总喜欢挑不足", 1),
                new PsychOption("S", "胆小：经常感到强烈的担心焦虑、悲戚", 1),
                new PsychOption("I", "健忘：缺乏自我约束，导致健忘，不愿意回忆无趣的事情", 1),
                new PsychOption("D", "率直：直言不讳，直接表达自己的看法", 1)
        )));

        questions.add(new Question(25, "DISC-25", "没耐性：难以忍受等待别人；无安全感：感到担心且无自信心；优柔寡断：很难下决定；好插嘴：一个滔滔不绝的发言人，不是好听众，不注意别人的说话。", false, List.of(
                new PsychOption("D", "没耐性：难以忍受等待别人", 1),
                new PsychOption("S", "无安全感：感到担心且无自信心", 1),
                new PsychOption("C", "优柔寡断：很难下决定", 1),
                new PsychOption("I", "好插嘴：一个滔滔不绝的发言人，不是好听众，不注意别人的说话", 1)
        )));

        questions.add(new Question(26, "DISC-26", "不受欢迎：由于强烈要求完美，而拒人千里；不参与：不愿意加入，不参与，对别人生活不感兴趣；难预测：时而兴奋，时而低落，或总是不兑现诺言；缺同情心：很难当众表达对弱者或者受难者的情感。", false, List.of(
                new PsychOption("C", "不受欢迎：由于强烈要求完美，而拒人千里", 1),
                new PsychOption("S", "不参与：不愿意加入，不参与，对别人生活不感兴趣", 1),
                new PsychOption("I", "难预测：时而兴奋，时而低落，或总是不兑现诺言", 1),
                new PsychOption("D", "缺同情心：很难当众表达对弱者或者受难者的情感", 1)
        )));

        questions.add(new Question(27, "DISC-27", "固执：坚持照自己的意见行事，不听不同意见；随兴：做事情没有一贯性，随意做事情；难于取悦：因为要求太高而使别人很难取悦；行动迟缓：迟迟才行动，不易参与或者行动总是慢半拍。", false, List.of(
                new PsychOption("D", "固执：坚持照自己的意见行事，不听不同意见", 1),
                new PsychOption("I", "随兴：做事情没有一贯性，随意做事情", 1),
                new PsychOption("C", "难于取悦：因为要求太高而使别人很难取悦", 1),
                new PsychOption("S", "行动迟缓：迟迟才行动，不易参与或者行动总是慢半拍", 1)
        )));

        questions.add(new Question(28, "DISC-28", "平淡：平实淡漠，中间路线,无高低之分，很少表露情感；悲观：尽管期待最好但往往首先看到事物不利之处；自负：自我评价高，认为自己是最好的人选；放任:许别人做他喜欢做的事情，为的是讨好别人，令别人鼓吹自己。", false, List.of(
                new PsychOption("S", "平淡：平实淡漠，中间路线,无高低之分，很少表露情感", 1),
                new PsychOption("C", "悲观：尽管期待最好但往往首先看到事物不利之处", 1),
                new PsychOption("D", "自负：自我评价高，认为自己是最好的人选", 1),
                new PsychOption("I", "放任:许别人做他喜欢做的事情，为的是讨好别人，令别人鼓吹自己", 1)
        )));

        questions.add(new Question(29, "DISC-29", "易怒：善变，孩子性格，易激动，过后马上就忘了；无目标：不喜欢目标，也无意订目标；好争论：易与人争吵，不管对何事都觉得自己是对的；孤芳自赏：容易感到被疏离，经常没有安全感或担心别人不喜欢和自己相处。", false, List.of(
                new PsychOption("I", "易怒：善变，孩子性格，易激动，过后马上就忘了", 1),
                new PsychOption("S", "无目标：不喜欢目标，也无意订目标", 1),
                new PsychOption("D", "好争论：易与人争吵，不管对何事都觉得自己是对的", 1),
                new PsychOption("C", "孤芳自赏：容易感到被疏离，经常没有安全感或担心别人不喜欢和自己相处", 1)
        )));

        questions.add(new Question(30, "DISC-30", "天真：孩子般的单纯，不理解生命的真谛；消极：往往看到事物的消极面阴暗面，而少有积极的态度；鲁莽：充满自信有胆识但总是不恰当；冷漠：漠不关心，得过且过。", false, List.of(
                new PsychOption("I", "天真：孩子般的单纯，不理解生命的真谛", 1),
                new PsychOption("C", "消极：往往看到事物的消极面阴暗面，而少有积极的态度", 1),
                new PsychOption("D", "鲁莽：充满自信有胆识但总是不恰当", 1),
                new PsychOption("S", "冷漠：漠不关心，得过且过", 1)
        )));

        questions.add(new Question(31, "DISC-31", "担忧：时时感到不确定、焦虑、心烦；不善交际:总喜欢挑人毛病，不被人喜欢；工作狂:为了回报或者说成就感，而不是为了完美，因而设立雄伟目标不断工作，耻于休息；喜获认同：需要旁人认同赞赏，像演员。", false, List.of(
                new PsychOption("S", "担忧：时时感到不确定、焦虑、心烦", 1),
                new PsychOption("C", "不善交际:总喜欢挑人毛病，不被人喜欢", 1),
                new PsychOption("D", "工作狂:为了回报或者说成就感，而不是为了完美，因而设立雄伟目标不断工作，耻于休息", 1),
                new PsychOption("I", "喜获认同：需要旁人认同赞赏，像演员", 1)
        )));

        questions.add(new Question(32, "DISC-32", "过分敏感：对事物过分反应，被人误解时感到被冒犯；不圆滑老练：经常用冒犯或考虑不周的方式表达自己；胆怯：遇到困难退缩；喋喋不休：难以自控，滔滔不绝，不能倾听别人。", false, List.of(
                new PsychOption("C", "过分敏感：对事物过分反应，被人误解时感到被冒犯", 1),
                new PsychOption("D", "不圆滑老练：经常用冒犯或考虑不周的方式表达自己", 1),
                new PsychOption("S", "胆怯：遇到困难退缩", 1),
                new PsychOption("I", "喋喋不休：难以自控，滔滔不绝，不能倾听别人", 1)
        )));

        questions.add(new Question(33, "DISC-33", "腼腆：事事不确定，对所做的事情缺乏信心；生活紊乱：缺乏安排生活的能力；跋扈：冲动的控制事物和别人，指挥他人；抑郁：常常情绪低落。", false, List.of(
                new PsychOption("S", "腼腆：事事不确定，对所做的事情缺乏信心", 1),
                new PsychOption("I", "生活紊乱：缺乏安排生活的能力", 1),
                new PsychOption("D", "跋扈：冲动的控制事物和别人，指挥他人", 1),
                new PsychOption("C", "抑郁：常常情绪低落", 1)
        )));

        questions.add(new Question(34, "DISC-34", "缺乏毅力：反复无常，互相矛盾，情绪与行动不合逻辑；内向：活在自己的世界里，思想和兴趣放在心里；不容忍：不能忍受他人的观点、态度和做事的方式；无异议：对很多事情漠不关心。", false, List.of(
                new PsychOption("I", "缺乏毅力：反复无常，互相矛盾，情绪与行动不合逻辑", 1),
                new PsychOption("C", "内向：活在自己的世界里，思想和兴趣放在心里", 1),
                new PsychOption("D", "不容忍：不能忍受他人的观点、态度和做事的方式", 1),
                new PsychOption("S", "无异议：对很多事情漠不关心", 1)
        )));

        questions.add(new Question(35, "DISC-35", "杂乱无章：生活环境无秩序，经常找不到东西；情绪化：情绪不易高涨，感到不被欣赏时很容易低落；喃喃自语：低声说话，不在乎说不清楚；喜操纵：精明处事，操纵事情，使对自己有利。", false, List.of(
                new PsychOption("I", "杂乱无章：生活环境无秩序，经常找不到东西", 1),
                new PsychOption("C", "情绪化：情绪不易高涨，感到不被欣赏时很容易低落", 1),
                new PsychOption("S", "喃喃自语：低声说话，不在乎说不清楚", 1),
                new PsychOption("D", "喜操纵：精明处事，操纵事情，使对自己有利", 1)
        )));

        questions.add(new Question(36, "DISC-36", "缓慢：行动思想均比较慢，过分麻烦；顽固：决心依自己的意愿行事，不易被说服；好表现：要吸引人，需要自己成为被人注意的中心；有戒心：不易相信，对语言背后的真正的动机存在疑问。", false, List.of(
                new PsychOption("S", "缓慢：行动思想均比较慢，过分麻烦", 1),
                new PsychOption("D", "顽固：决心依自己的意愿行事，不易被说服", 1),
                new PsychOption("I", "好表现：要吸引人，需要自己成为被人注意的中心", 1),
                new PsychOption("C", "有戒心：不易相信，对语言背后的真正的动机存在疑问", 1)
        )));

        questions.add(new Question(37, "DISC-37", "孤僻：需要大量的时间独处，避开人群；统治欲：毫不犹豫地表示自己的正确或控制能力；懒惰：总是先估量事情要耗费多少精力，能不做最好；大嗓门：说话声和笑声总盖过他人。", false, List.of(
                new PsychOption("C", "孤僻：需要大量的时间独处，避开人群", 1),
                new PsychOption("D", "统治欲：毫不犹豫地表示自己的正确或控制能力", 1),
                new PsychOption("S", "懒惰：总是先估量事情要耗费多少精力，能不做最好", 1),
                new PsychOption("I", "大嗓门：说话声和笑声总盖过他人", 1)
        )));

        questions.add(new Question(38, "DISC-38", "拖延：凡事起步慢，需要推动力；多疑：凡事怀疑，不相信别人；易怒：对行动不快或不能完成指定工作时易烦躁和发怒；不专注：无法专心致志或者集中精力。", false, List.of(
                new PsychOption("S", "拖延：凡事起步慢，需要推动力", 1),
                new PsychOption("C", "多疑：凡事怀疑，不相信别人", 1),
                new PsychOption("D", "易怒：对行动不快或不能完成指定工作时易烦躁和发怒", 1),
                new PsychOption("I", "不专注：无法专心致志或者集中精力", 1)
        )));

        questions.add(new Question(39, "DISC-39", "报复性：记恨并惩罚冒犯自己的人；烦躁：喜新厌旧，不喜欢长时间做相同的事情；勉强：不愿意参与或者说投入；轻率：因没有耐心，不经思考，草率行动。", false, List.of(
                new PsychOption("C", "报复性：记恨并惩罚冒犯自己的人", 1),
                new PsychOption("I", "烦躁：喜新厌旧，不喜欢长时间做相同的事情", 1),
                new PsychOption("S", "勉强：不愿意参与或者说投入", 1),
                new PsychOption("D", "轻率：因没有耐心，不经思考，草率行动", 1)
        )));

        questions.add(new Question(40, "DISC-40", "妥协：为避免矛盾即使自己是对的也不惜放弃自己的立场；好批评：不断地衡量和下判断，经常考虑提出反对意见；狡猾：精明，总是有办法达到目的；善变：像孩子般注意力短暂，需要各种变化，怕无聊。", false, List.of(
                new PsychOption("S", "妥协：为避免矛盾即使自己是对的也不惜放弃自己的立场", 1),
                new PsychOption("C", "好批评：不断地衡量和下判断，经常考虑提出反对意见", 1),
                new PsychOption("D", "狡猾：精明，总是有办法达到目的", 1),
                new PsychOption("I", "善变：像孩子般注意力短暂，需要各种变化，怕无聊", 1)
        )));
    }

    @Override
    public PsychTestResult answer(PsychTestAnswer answer) {
        float dScore = 0, iScore = 0, sScore = 0, cScore = 0;
        int count = 0;

        for (PsychQuestion question : this.getQuestions()) {
            DISCResult questionResult = (DISCResult) question.answer(answer.get(count));

            // 根据选项的key累加对应维度的分数
            String selectedKey = questionResult.getSelectedKey();
            switch (selectedKey) {
                case "D":
                    dScore += questionResult.getScore();
                    break;
                case "I":
                    iScore += questionResult.getScore();
                    break;
                case "S":
                    sScore += questionResult.getScore();
                    break;
                case "C":
                    cScore += questionResult.getScore();
                    break;
            }
            count++;
        }

        DISCReport result = new DISCReport();
        result.setDScore(dScore);
        result.setIScore(iScore);
        result.setSScore(sScore);
        result.setCScore(cScore);

        // 生成结果报告
        StringBuilder message = new StringBuilder();
        message.append("您的DISC性格测试结果：\n");
        message.append(String.format("D（支配型）: %.0f分\n", dScore));
        message.append(String.format("I（影响型）: %.0f分\n", iScore));
        message.append(String.format("S（稳健型）: %.0f分\n", sScore));
        message.append(String.format("C（谨慎型）: %.0f分\n\n", cScore));

        // 显性因子判断（超过10分）
        message.append("显性因子分析：\n");
        if (dScore >= 10) {
            message.append("• D型特质显著：您是一个果断、自信、以结果为导向的人，天生的领导者。\n");
        }
        if (iScore >= 10) {
            message.append("• I型特质显著：您热情、乐观、善于交际，是团队的活力源泉。\n");
        }
        if (sScore >= 10) {
            message.append("• S型特质显著：您温和、耐心、可靠，是很好的支持者和倾听者。\n");
        }
        if (cScore >= 10) {
            message.append("• C型特质显著：您谨慎、细致、追求完美，注重质量和准确性。\n");
        }

        // 如果没有显性因子
        if (dScore < 10 && iScore < 10 && sScore < 10 && cScore < 10) {
            message.append("您的性格特质较为均衡，没有特别突出的显性因子。\n");
        }

        // 最高分特质描述
        float maxScore = Math.max(Math.max(dScore, iScore), Math.max(sScore, cScore));
        if (maxScore == dScore) {
            message.append("\n主要特质：支配型(D) - 果断、直接、结果导向");
        } else if (maxScore == iScore) {
            message.append("\n主要特质：影响型(I) - 热情、乐观、善于沟通");
        } else if (maxScore == sScore) {
            message.append("\n主要特质：稳健型(S) - 稳定、耐心、支持他人");
        } else {
            message.append("\n主要特质：谨慎型(C) - 精确、系统、注重质量");
        }

        result.setMessage(message.toString());
        return result;
    }

    /**
     * DISC测试问题类
     */
    public static class Question extends PsychQuestion {
        public Question(int id, String title, String content, boolean multiOptional, List<PsychOption> options) {
            super(id, title, content, multiOptional, options);
        }

        @Override
        public PsychQuestionResult answer(PsychQuestionAnswer answer) {
            DISCResult result = new DISCResult();

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
     * DISC问题结果类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class DISCResult extends PsychQuestionResult {
        private String selectedKey; // 选择的选项key（D/I/S/C）
        private float score;
    }

    /**
     * DISC测试报告类
     */
    @Data
    @EqualsAndHashCode(callSuper = true)
    public static class DISCReport extends PsychTestResult {
        private float dScore;
        private float iScore;
        private float sScore;
        private float cScore;
    }
}