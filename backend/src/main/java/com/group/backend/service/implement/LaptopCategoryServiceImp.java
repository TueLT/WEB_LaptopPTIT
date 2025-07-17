package com.group.backend.service.implement;

import com.group.backend.dto.LaptopCategoryDTO;
import com.group.backend.entity.Category;
import com.group.backend.entity.Laptop;
import com.group.backend.entity.Laptop_Category;
import com.group.backend.repository.CategoryRepository;
import com.group.backend.repository.LaptopCategoryRepository;
import com.group.backend.repository.LaptopRepository;
import com.group.backend.service.LaptopCategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LaptopCategoryServiceImp implements LaptopCategoryService {

    @Autowired
    private LaptopRepository laptopRepo;
    @Autowired
    private CategoryRepository categoryRepo;
    @Autowired
    private LaptopCategoryRepository laptopCategoryRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String addLaptopCategory(List<LaptopCategoryDTO> laptopCategoryDTOList) {
        List<Laptop_Category> laptopCategories = laptopCategoryDTOList.stream()
                .map(tmp -> {
                    Laptop_Category laptopCategory = modelMapper.map(tmp, Laptop_Category.class);
                    Laptop laptop = laptopRepo.findByName(laptopCategory.getLaptop().getName());
                    Category category = categoryRepo.findByName(laptopCategory.getCategory().getName()).orElseThrow(() -> new RuntimeException("Category not found"));
                    laptopCategory.setLaptop(laptop);
                    laptopCategory.setCategory(category);
                    return laptopCategory;
                })
                .collect(Collectors.toList());
        laptopCategoryRepo.saveAll(laptopCategories);
        return "Laptop Category added successfully";
    }
}
