package com.group.backend.service.implement;

import com.group.backend.dto.*;
import com.group.backend.entity.Laptop;
import com.group.backend.repository.LaptopFilterRepository;
import com.group.backend.repository.LaptopRepository;
import com.group.backend.service.LaptopService;
import com.group.backend.service.FormatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LaptopServiceImp implements LaptopService {

    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private LaptopRepository laptopRepo;
    @Autowired
    private LaptopFilterRepository laptopFilterRepo;
    @Autowired
    private FormatService formatService;
    @Autowired
    private SpecificationServiceImp specificationServiceImp;

    @Override
    public LaptopDTO getLaptopById(long id) {
        Laptop laptop = laptopRepo.findById(id).orElse(null);
        LaptopDTO laptopDTO = modelMapper.map(laptop, LaptopDTO.class);
        return laptopDTO;
    }

    @Override
    public Laptop getLastLaptop() {
        List<Laptop> laptops = laptopRepo.findLastLaptop();
        for(Laptop laptop : laptops){
            return laptop;
        }
        return null;
    }

    @Override
    public String addLaptop(LaptopDTO laptopDTO) {
        Laptop laptop = modelMapper.map(laptopDTO, Laptop.class);
        laptop.setSpecification(specificationServiceImp.getLastSpecification());
        laptop.setBrand(laptop.getBrand());
        laptop.setAvailable(true);
        laptopRepo.save(laptop);
        return "Laptop added successfully";
    }

    @Override
    public List<LaptopTableDTO> getAllLaptops() {
        List<Laptop> laptops = laptopRepo.findAll();
        return laptops.stream()
                .map(tmp -> modelMapper.map(tmp, LaptopTableDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<LaptopSummaryDTO> getLaptopByCategory(String category) {
        List<Laptop> laptops =laptopRepo.findByCategory(category);
        return laptops.stream()
                .map(l -> modelMapper.map(l, LaptopSummaryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<LaptopSummaryDTO> getLaptopByCriteria(Filter filter) {
        List<Laptop> laptops = laptopFilterRepo.findLaptopByCriteria(filter);
        return laptops.stream()
                .map(l -> modelMapper.map(l, LaptopSummaryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<LaptopSummaryDTO> searchLaptop(String keyword) {
        List<Laptop> laptops = laptopRepo.searchLaptop(keyword);
        List<LaptopSummaryDTO> laptopSummaryDTO = laptops.stream()
                .map(l -> modelMapper.map(l, LaptopSummaryDTO.class))
                .collect(Collectors.toList());
        return formatService.listOfFormattedLaptopSummary(laptopSummaryDTO);
    }

    @Override
    public String changeLaptopAvailable(ChangeLaptopAvailableDTO changeLaptopAvailableDTO) {
        for(long x : changeLaptopAvailableDTO.getLaptopIDs()) {
            Laptop laptop = laptopRepo.findById(x).orElseThrow(() -> new RuntimeException("Laptop with id: " + x + " not found"));
            laptop.setAvailable(changeLaptopAvailableDTO.isAvailable());
            laptopRepo.save(laptop);
        }
        return "changed successfully";
    }

    @Override
    public String deleteLaptops(List<Long> list) {
        for(long x : list) {
            laptopRepo.deleteById(x);
        }
        return "Deleted successfully";
    }
}
