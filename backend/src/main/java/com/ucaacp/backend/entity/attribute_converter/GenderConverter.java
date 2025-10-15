package com.ucaacp.backend.entity.attribute_converter;

import com.ucaacp.backend.entity.enums.Gender;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) // autoApply = true 可自动应用于所有Gender类型字段
public class GenderConverter implements AttributeConverter<Gender, Integer> {

    @Override
    public Integer convertToDatabaseColumn(Gender gender) {
        if (gender == null) {
            return null;
        }
        return gender.getCode();
    }

    @Override
    public Gender convertToEntityAttribute(Integer genderCode) {
        if (genderCode == null) {
            return null;
        }
        return Gender.getByCode(genderCode);
    }
}
