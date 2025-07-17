package com.group.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class ChangeLaptopAvailableDTO {
    List<Long> laptopIDs;
    boolean available;
}
