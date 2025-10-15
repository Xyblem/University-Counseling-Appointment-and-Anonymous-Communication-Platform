package com.ucaacp.backend.utils.return_object;

import java.io.Serial;
import java.util.HashMap;

/**
 * 返回的数据
 * 返回数据的一般格式：
 * code:返回代码
 * status:返回状态
 * message:返回信息
 * data:数据
 * timestamp:时间戳
 */
public class ReturnObject extends HashMap<String, Object> {
    @Serial
    private static final long serialVersionUID = 1L;


    /**
     * 构造函数
     */
    public ReturnObject(int code,String status) {
        this.put("code", code);
        this.put("status", status);
        this.put("timestamp", System.currentTimeMillis());
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
     * 获取值
     * @param key key with which the specified value is to be associated
     * @return 值
     */
    public Object get(String key) {
        return super.get(key);
    }


    // 便捷方法
    public boolean isSuccess() {
        return ReturnStatus.SUCCESS.getStatus().equals(this.get("status"));
    }

    public boolean isFail() {
        return ReturnStatus.FAIL.getStatus().equals(this.get("status"));
    }

    public boolean isError() {
        return ReturnStatus.ERROR.getStatus().equals(this.get("status"));
    }

    // Getter 和 Setter 方法
    public String getStatus() {
        return (String)this.get("status");
    }

    public void setStatus(String status) {
        this.put("status", status);
    }

    public int getCode() {
        return (int)this.get("code");
    }

    public void setCode(int code) {
        this.put("code", code);
    }

    public String getMessage() {
        return (String)this.get("message");
    }

    public void setMessage(String message) {
        this.put("message", message);
    }

    public Object getData() {
        return this.get("data");
    }

    public void setData(Object data) {
        this.put("data", data);
    }

    public long getTimestamp() {
        return (long)this.get("timestamp");
    }

    public void setTimestamp(long timestamp) {
        this.put("timestamp", timestamp);
    }


    /*成功返回的静态方法*/

    public static ReturnObject success() {
        return new ReturnObject(ReturnCode.SUCCESS.getCode(), ReturnStatus.SUCCESS.getStatus());
    }

    public static ReturnObject success(Object data) {
        ReturnObject returnObject = ReturnObject.success();
        returnObject.put("data", data);
        return returnObject;
    }

    public static ReturnObject success(String message) {
        ReturnObject returnObject = ReturnObject.success();
        returnObject.put("message", message);
        return returnObject;
    }

    public static ReturnObject success(String message, Object data) {
        ReturnObject returnObject = ReturnObject.success();
        returnObject.put("message", message);
        returnObject.put("data", data);
        return returnObject;
    }


    /*失败返回的静态方法*/

    public static ReturnObject fail() {
        return ReturnObject.fail(ReturnCode.BAD_REQUEST.getCode());
    }

    public static ReturnObject fail(int code) {
        return new ReturnObject(code, ReturnStatus.FAIL.getStatus());
    }

    public static ReturnObject fail(String message) {
        ReturnObject returnObject = ReturnObject.fail();
        returnObject.put("message", message);
        return returnObject;
    }

    public static ReturnObject fail(int code,String message) {
        ReturnObject returnObject = ReturnObject.fail(code);
        returnObject.put("message", message);
        return returnObject;
    }

    /*错误返回的静态方法*/

    public static ReturnObject error() {
        return ReturnObject.error(ReturnCode.INTERNAL_SERVER_ERROR.getCode());
    }

    public static ReturnObject error(int code) {
        return new ReturnObject(code, ReturnStatus.ERROR.getStatus());
    }

    public static ReturnObject error(String message) {
        ReturnObject returnObject = ReturnObject.error();
        returnObject.put("message", message);
        return returnObject;
    }

    public static ReturnObject error(int code,String message) {
        ReturnObject returnObject = ReturnObject.error(code);
        returnObject.put("message", message);
        return returnObject;
    }

    // 业务异常返回的静态方法
    public static ReturnObject businessError(String message) {
        ReturnObject returnObject =new ReturnObject(ReturnCode.BUSINESS_ERROR.getCode(),ReturnStatus.BUSINESS_ERROR.getStatus());
        returnObject.put("message", message);
        return returnObject;
    }

    // 参数验证失败返回的静态方法
    public static ReturnObject validationError(String message) {
        ReturnObject returnObject =new ReturnObject(ReturnCode.VALIDATION_ERROR.getCode(),ReturnStatus.VALIDATION_ERROR.getStatus());
        returnObject.put("message", message);
        return returnObject;
    }

}
