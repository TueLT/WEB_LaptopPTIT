package com.group.backend.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class SpecificationDTO {
    private long id;
    private String cpu;
    private String ram;
    private String rom;
    private String screen;
    private String graphicsCard;
    private String battery;
    private String weight;
    private String webcam;
    private String operatingSystem;
    private String connectionPort;
    private boolean muxSwitch;
}
