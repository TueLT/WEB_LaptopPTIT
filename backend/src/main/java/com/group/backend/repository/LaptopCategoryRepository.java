package com.group.backend.repository;

import com.group.backend.dto.LaptopCategoryId;
import com.group.backend.entity.Laptop_Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaptopCategoryRepository extends JpaRepository<Laptop_Category, LaptopCategoryId> {
}
