package com.ucaacp.backend.entity.attribute_converter;

import com.ucaacp.backend.entity.enums.UserPosition;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) // autoApply = true 可自动应用于所有UserRole类型字段
public class UserPositionConverter implements AttributeConverter<UserPosition,String>{
    @Override
    public String convertToDatabaseColumn(UserPosition userPosition) {
        if(userPosition == null){
            return null;
        }
        return userPosition.getValue();
    }

    @Override
    public UserPosition convertToEntityAttribute(String value) {
        if(value == null){
            return null;
        }
        return UserPosition.getFromValue(value);
    }
}
