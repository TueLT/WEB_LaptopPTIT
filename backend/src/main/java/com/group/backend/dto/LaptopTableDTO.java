package com.group.backend.dto;

import lombok.Data;

@Data
public class LaptopTableDTO {
    private long id;
    private String name;
    private int price;
    private int sale;
    private boolean available;
    private String state;
}
