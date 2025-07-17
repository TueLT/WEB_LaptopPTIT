package com.group.backend.service;

import com.group.backend.dto.CategoryDTO;
import com.group.backend.dto.LaptopSummaryDTO;
import com.group.backend.dto.Filter;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();
    List<LaptopSummaryDTO> getLaptopByCategory(String category);
    List<LaptopSummaryDTO> getLaptopByCriteria(Filter filter);
    String addCategory(List<CategoryDTO> categoryDTOS);
    String removeCategory(List<CategoryDTO> categoryDTOS);
}
