package com.ucaacp.backend.entity.attribute_converter;


import com.ucaacp.backend.entity.enums.ProvinceCN;
import jakarta.persistence.*;

@Converter(autoApply = true) // autoApply = true 可自动应用于所有ProvinceCN类型字段
public class ProvinceCN_Converter implements AttributeConverter<ProvinceCN, Long> {
    @Override
    public Long convertToDatabaseColumn(ProvinceCN province) {
        if (province == null) {
            return null;
        }
        return province.getCode();
    }

    @Override
    public ProvinceCN convertToEntityAttribute(Long databaseValue) {
        if (databaseValue == null) {
            return null;
        }
        return ProvinceCN.getByCode(databaseValue);
    }
}
