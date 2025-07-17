package com.group.backend.dto;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class LaptopCategoryId {
    private long laptopId;
    private long categoryId;
}
