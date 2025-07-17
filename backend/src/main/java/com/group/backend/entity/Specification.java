package com.group.backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "specification")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Specification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String cpu;
    @Column(nullable = false)
    private String ram;
    @Column(nullable = false)
    private String rom;
    @Column(nullable = false)
    private String screen;
    @Column(nullable = false)
    private String graphicsCard;
    @Column(nullable = false)
    private String battery;
    @Column(nullable = false)
    private String weight;
    @Column(nullable = false)
    private String webcam;
    @Column(nullable = false)
    private String operatingSystem;

    @Column(length = 500, nullable = false)
    private String connectionPort;
    @Column(nullable = false)
    private boolean muxSwitch;
}
