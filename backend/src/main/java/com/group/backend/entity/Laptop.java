package com.group.backend.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "Laptop")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ID")
public class Laptop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private int price;
    private short sale;
    @Column(nullable = false)
    private boolean available;
    @Column(nullable = false)
    private String state;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "SpecID", nullable = false)
    private Specification specification;

    @OneToMany(mappedBy = "laptop")
    private List<Cart_Detail> cartDetails;

    @OneToMany(mappedBy = "laptop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "laptop", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images;

    @OneToMany(mappedBy = "laptop")
    @JsonIgnore
    private List<Order_Detail> orderDetails;

    @OneToMany(mappedBy = "laptop", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Laptop_Category> laptopCategories;

    public int getDiscountedPrice(){
        double discount = 1 - sale/100.0;
        return (int) (price * discount);
    }

    public String getBrand(){
        String tmp[] = name.split(" ");
        if(tmp[0].length() > 2){
            tmp[0] = tmp[0].toLowerCase();
            tmp[0] = Character.toUpperCase(tmp[0].charAt(0)) + tmp[0].substring(1);
        }
        return tmp[0];
    }
}
