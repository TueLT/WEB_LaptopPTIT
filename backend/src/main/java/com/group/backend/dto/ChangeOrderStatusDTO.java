package com.group.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class ChangeOrderStatusDTO {
    private List<Long> orderIds;
    private Long statusId;
}
