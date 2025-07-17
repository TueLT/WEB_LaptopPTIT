package com.group.backend.controller;

import com.group.backend.dto.LaptopCategoryDTO;
import com.group.backend.service.LaptopCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/laptopCategory")
public class LaptopCategoryController {

    @Autowired
    private LaptopCategoryService laptopCategoryService;

    @PostMapping("/add")
    public String addLaptopCategory(@RequestBody List<LaptopCategoryDTO> laptopCategoryDTOList) {
        return laptopCategoryService.addLaptopCategory(laptopCategoryDTOList);
    }
}
