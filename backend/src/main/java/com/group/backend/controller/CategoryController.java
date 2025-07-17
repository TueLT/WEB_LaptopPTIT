package com.group.backend.controller;

import com.group.backend.dto.CategoryDTO;
import com.group.backend.dto.LaptopSummaryDTO;
import com.group.backend.dto.Filter;
import com.group.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/collections")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/laptops-category/{category}")
    public ResponseEntity<List<LaptopSummaryDTO>> getLaptopByCategory(@PathVariable("category") String category) {
        return ResponseEntity.ok(categoryService.getLaptopByCategory(category));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<LaptopSummaryDTO>> getLaptopByFilter(@ModelAttribute Filter filter) {
        return ResponseEntity.ok(categoryService.getLaptopByCriteria(filter));
    }

    @GetMapping("/admin/getAllCategories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping("/admin/add")
    public ResponseEntity<String> addLaptop(@RequestBody List<CategoryDTO> categoryDTOList){
        return ResponseEntity.ok(categoryService.addCategory(categoryDTOList));
    }

    @DeleteMapping("/admin/delete")
    public ResponseEntity<String> deleteLaptop(@RequestBody List<CategoryDTO> categoryDTOList){
        return ResponseEntity.ok(categoryService.removeCategory(categoryDTOList));
    }
}