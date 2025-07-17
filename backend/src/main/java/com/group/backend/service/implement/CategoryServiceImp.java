package com.group.backend.service.implement;

import com.group.backend.dto.CategoryDTO;
import com.group.backend.dto.LaptopSummaryDTO;
import com.group.backend.dto.Filter;
import com.group.backend.entity.Category;
import com.group.backend.repository.CategoryRepository;
import com.group.backend.service.CategoryService;
import com.group.backend.service.LaptopService;
import com.group.backend.service.FormatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private LaptopService laptopService;
    @Autowired
    private FormatService formatService;
    @Autowired
    private CategoryRepository categoryRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepo.findAll();
        return categories.stream()
                .map(tmp -> modelMapper.map(tmp, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<LaptopSummaryDTO> getLaptopByCategory(String category) {
        List<LaptopSummaryDTO> laptops = laptopService.getLaptopByCategory(category);
        return formatService.listOfFormattedLaptopSummary(laptops);
    }

    @Override
    public List<LaptopSummaryDTO> getLaptopByCriteria(Filter filter) {
        List<LaptopSummaryDTO> laptops = laptopService.getLaptopByCriteria(filter);
        return formatService.listOfFormattedLaptopSummary(laptops);
    }
 
    @Override
    public String addCategory(List<CategoryDTO> categoryDTOS) {
        List<Category> categories = categoryDTOS.stream()
                .map(tmp -> {
                    Category category = modelMapper.map(tmp, Category.class);
                    category.setName(formatService.removeSignFromTextFormat(category.getName()));
                    return category;
                })
                .collect(Collectors.toList());
        categoryRepo.saveAll(categories);
        return "Category added successfully";
    }

    @Override
    public String removeCategory(List<CategoryDTO> categoryDTOS) {
        categoryDTOS.stream()
                .peek(tmp -> tmp.setName(formatService.removeSignFromTextFormat(tmp.getName())))
                .collect(Collectors.toList());
        for(CategoryDTO category : categoryDTOS) {
            Category tmp = categoryRepo.findByName(category.getName()).orElseThrow(() -> new RuntimeException("Category with name: " + category.getName() + " not found"));
            categoryRepo.deleteById(tmp.getId());
        }
        return "Category removed";
    }
}
