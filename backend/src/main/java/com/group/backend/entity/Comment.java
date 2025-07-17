package com.group.backend.entity;

import com.fasterxml.jackson.annotation.*;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "Laptop_Comment")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime postAt;
    private LocalDateTime updateAt;

    @ManyToOne
    @JoinColumn(name = "UserID")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "LaptopID")
    @JsonIgnore
    private Laptop laptop;
}
