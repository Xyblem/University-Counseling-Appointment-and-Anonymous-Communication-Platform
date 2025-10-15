package com.ucaacp.backend.utils;


import java.io.Serial;
import java.util.HashMap;


/**
 * 返回的数据
 * 返回数据的一般格式：
 * code:返回代码
 * status:返回状态
 * msg/data:返回信息或数据
 */
public class ReturnObject extends HashMap<String, Object> {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 构造函数
     */
    public ReturnObject() {
        put("code", 0);
    }

    /**
     * 添加键值对
     * @param key key with which the specified value is to be associated
     * @param value value to be associated with the specified key
     * @return 返回对象
     */
    public ReturnObject put(String key, Object value) {
        super.put(key, value);
        return this;
    }

    /**
     * 返回错误，无其他内容
     * @return 返回对象
     */
    public static ReturnObject error() {
        return error(500, "Unknown error,Please contact administrator");
    }

    /**
     * 返回错误，提供错误信息
     * @param msg 信息
     * @return 返回对象
     */
    public static ReturnObject error(String msg) {
        return error(500, msg);
    }

    /**
     * 返回错误，提供错误码和错误信息
     * @param code 错误码
     * @param msg 信息
     * @return 返回对象
     */
    public static ReturnObject error(int code, String msg) {
        ReturnObject r = new ReturnObject();
        r.put("status", "error");
        r.put("code", code);
        r.put("msg", msg);
        return r;
    }

    /**
     * 返回成功，提供返回信息
     * @param msg 信息
     * @return 返回对象
     */
    public static ReturnObject success(String msg) {
        ReturnObject r = new ReturnObject();
        r.put("status", "success");
        r.put("msg", msg);
        return r;
    }

    /**
     * 返回成功，提供返回数据
     * @param data 数据
     * @return 返回对象
     */
    public static ReturnObject success(Object data) {
        ReturnObject r = new ReturnObject();
        r.put("status", "success");
        r.put("data",data);
        return r;
    }

    /**
     * 返回成功，无其他内容
     * @return 返回对象
     */
    public static ReturnObject success() {
        ReturnObject r = new ReturnObject();
        r.put("status", "success");
        return r;
    }

    /**
     * 返回失败，提供返回信息
     * @param msg 信息
     * @return 返回对象
     */
    public static ReturnObject failed(String msg) {
        ReturnObject r = new ReturnObject();
        r.put("status", "failed");
        r.put("msg", msg);
        return r;
    }

    /**
     * 返回失败，提供返回数据
     * @param data 数据
     * @return 返回对象
     */
    public static ReturnObject failed(Object data) {
        ReturnObject r = new ReturnObject();
        r.put("status", "failed");
        r.put("data",data);
        return r;
    }

    /**
     * 返回失败，无其他内容
     * @return 返回对象
     */
    public static ReturnObject failed() {
        ReturnObject r = new ReturnObject();
        r.put("status", "failed");
        return r;
    }
}