package com.group.backend.service.implement;

import com.group.backend.dto.SpecificationDTO;
import com.group.backend.entity.Specification;
import com.group.backend.repository.SpecificationRepository;
import com.group.backend.service.SpecificationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecificationServiceImp implements SpecificationService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private SpecificationRepository specificationRepo;

    public SpecificationServiceImp(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public Specification getLastSpecification() {
        List<Specification> specifications = specificationRepo.reverseSortedSpecification();
        for(Specification specification : specifications) {
            return specification;
        }
        return null;
    }

    @Override
    public String addSpecification(SpecificationDTO specificationDTO) {
        Specification specification = modelMapper.map(specificationDTO, Specification.class);
        specificationRepo.save(specification);
        return "Specification added successfully";
    }
}
