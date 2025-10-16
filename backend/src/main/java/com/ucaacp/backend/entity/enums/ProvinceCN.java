package com.ucaacp.backend.entity.enums;

/**
 * 中国省级行政区枚举
 * 包含编码、中文名称及英文名称
 * 编码参考行政区域名标准，英文名称遵循国家规定的汉语拼音拼写规范
 * 符合国家标准【中华人民共和国行政区划代码(GB/T2260-2007)】
 * @see <a href="https://www.thepaper.cn/newsDetail_forward_14168547">民政部关于行政区划英文拼写的答复</a>
 */
public enum ProvinceCN {
    BEIJING(110000L, "北京市", "Beijing Municipality"),
    TIANJIN(120000L, "天津市", "Tianjin Municipality"),
    HEBEI(130000L, "河北省", "Hebei Province"),
    SHANXI_14(140000L, "山西省", "Shanxi Province"),
    INNER_MONGOLIA(150000L, "内蒙古自治区", "Inner Mongolia Autonomous Region"),
    LIAONING(210000L, "辽宁省", "Liaoning Province"),
    JILIN(220000L, "吉林省", "Jilin Province"),
    HEILONGJIANG(230000L, "黑龙江省", "Heilongjiang Province"),
    SHANGHAI(310000L, "上海市", "Shanghai Municipality"),
    JIANGSU(320000L, "江苏省", "Jiangsu Province"),
    ZHEJIANG(330000L, "浙江省", "Zhejiang Province"),
    ANHUI(340000L, "安徽省", "Anhui Province"),
    FUJIAN(350000L, "福建省", "Fujian Province"),
    JIANGXI(360000L, "江西省", "Jiangxi Province"),
    SHANDONG(370000L, "山东省", "Shandong Province"),
    HENAN(410000L, "河南省", "Henan Province"),
    HUBEI(420000L, "湖北省", "Hubei Province"),
    HUNAN(430000L, "湖南省", "Hunan Province"),
    GUANGDONG(440000L, "广东省", "Guangdong Province"),
    GUANGXI(450000L, "广西壮族自治区", "Guangxi Zhuang Autonomous Region"),
    HAINAN(460000L, "海南省", "Hainan Province"),
    CHONGQING(500000L, "重庆市", "Chongqing Municipality"),
    SICHUAN(510000L, "四川省", "Sichuan Province"),
    GUIZHOU(520000L, "贵州省", "Guizhou Province"),
    YUNNAN(530000L, "云南省", "Yunnan Province"),
    TIBET(540000L, "西藏自治区", "Tibet Autonomous Region"),
    SHAANXI(610000L, "陕西省", "Shaanxi Province"),
    GANSU(620000L, "甘肃省", "Gansu Province"),
    QINGHAI(630000L, "青海省", "Qinghai Province"),
    NINGXIA(640000L, "宁夏回族自治区", "Ningxia Hui Autonomous Region"),
    XINJIANG(650000L, "新疆维吾尔自治区", "Xinjiang Uygur Autonomous Region"),
    TAIPEI(710000L, "台湾省", "Taiwan Province"),
    HONG_KONG(810000L, "香港特别行政区", "Hong Kong Special Administrative Region"),
    MACAO(820000L, "澳门特别行政区", "Macao Special Administrative Region");

    private final Long code;
    private final String chineseName;
    private final String englishName;

    ProvinceCN(Long code, String chineseName, String englishName) {
        this.code = code;
        this.chineseName = chineseName;
        this.englishName = englishName;
    }

    public Long getCode() {
        return code;
    }

    public String getChineseName() {
        return chineseName;
    }

    public String getEnglishName() {
        return englishName;
    }

    /**
     * 根据编码查找对应的省级行政区枚举
     * @param code 编码
     * @return 对应的省级行政区枚举，未找到时返回null
     */
    public static ProvinceCN getByCode(Long code) {
        for (ProvinceCN province : values()) {
            if (province.code.equals(code)) {
                return province;
            }
        }
        return null;
    }

    /**
     * 根据中文名称查找对应的省级行政区枚举
     * @param chineseName 中文名称
     * @return 对应的省级行政区枚举，未找到时返回null
     */
    public static ProvinceCN getByChineseName(String chineseName) {
        for (ProvinceCN province : values()) {
            if (province.chineseName.equals(chineseName)) {
                return province;
            }
        }
        return null;
    }

    /**
     * 根据英文名称查找对应的省级行政区枚举
     * @param englishName 英文名称
     * @return 对应的省级行政区枚举，未找到时返回null
     */
    public static ProvinceCN getByEnglishName(String englishName){
        for (ProvinceCN province : values()) {
            if (province.englishName.equals(englishName)) {
                return province;
            }
        }
        return null;
    }

    @Override
    public String toString() {
        return this.code.toString();
    }
}