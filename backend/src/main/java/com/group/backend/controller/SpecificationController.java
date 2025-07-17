package com.group.backend.controller;

import com.group.backend.dto.SpecificationDTO;
import com.group.backend.service.SpecificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/specification")
public class SpecificationController {

    @Autowired
    private SpecificationService specificationService;

    @PostMapping("/add")
    public ResponseEntity<String> addSpecification(@RequestBody SpecificationDTO specificationDTO) {
        return ResponseEntity.ok(specificationService.addSpecification(specificationDTO));
    }
}
