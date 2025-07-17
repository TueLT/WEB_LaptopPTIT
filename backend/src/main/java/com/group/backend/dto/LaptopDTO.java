package com.group.backend.dto;

import com.group.backend.entity.Image;
import lombok.Data;

import java.util.List;

@Data
public class LaptopDTO {
    private long id;
    private String name;
    private int price;
    private int sale;
    private boolean available;
    private String state;
    private SpecificationDTO specification;
    private List<Image> images;
    private List<CommentDTO> comments;
}
