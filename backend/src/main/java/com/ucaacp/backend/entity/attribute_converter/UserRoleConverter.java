package com.ucaacp.backend.entity.attribute_converter;

import com.ucaacp.backend.entity.enums.UserRole;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) // autoApply = true 可自动应用于所有UserRole类型字段
public class UserRoleConverter implements AttributeConverter<UserRole, Integer> {
    @Override
    public Integer convertToDatabaseColumn(UserRole userRole) {
        if (userRole == null) {
            return null;
        }
        return userRole.getCode();
    }

    @Override
    public UserRole convertToEntityAttribute(Integer code) {
        if(code == null) {
            return null;
        }
        return UserRole.getByCode(code);
    }
}
