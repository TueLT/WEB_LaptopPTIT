package com.group.backend.service;

import com.group.backend.dto.SpecificationDTO;
import com.group.backend.entity.Specification;

public interface SpecificationService {
    Specification getLastSpecification();
    String addSpecification(SpecificationDTO specificationDTO);
}
