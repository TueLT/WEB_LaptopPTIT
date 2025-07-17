package com.group.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.group.backend.dto.LaptopCategoryId;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Data
@Table(name = "LaptopCategory")
@ToString
public class Laptop_Category {

    @EmbeddedId
    private LaptopCategoryId laptopCategoryId;

    @MapsId("laptopId")
    @ManyToOne
    @JoinColumn(name = "LaptopID")
    @JsonIgnore
    private Laptop laptop;

    @MapsId("categoryId")
    @ManyToOne
    @JoinColumn(name = "CateID")
    @JsonIgnore
    private Category category;

}
