package com.group.backend.service;

import com.group.backend.dto.LaptopCategoryDTO;

import java.util.List;

public interface LaptopCategoryService {
    String addLaptopCategory(List<LaptopCategoryDTO> laptopCategoryDTOList);
}
