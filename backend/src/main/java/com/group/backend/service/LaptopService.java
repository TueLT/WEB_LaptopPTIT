package com.group.backend.service;

import com.group.backend.dto.*;
import com.group.backend.entity.Laptop;

import java.util.List;

public interface LaptopService {
    LaptopDTO getLaptopById(long id);
    Laptop getLastLaptop();
    String addLaptop(LaptopDTO laptopDTO);
    List<LaptopTableDTO> getAllLaptops();
    List<LaptopSummaryDTO> getLaptopByCategory(String category);
    List<LaptopSummaryDTO> getLaptopByCriteria(Filter filter);
    List<LaptopSummaryDTO> searchLaptop(String keyword);
    String changeLaptopAvailable(ChangeLaptopAvailableDTO changeLaptopAvailableDTO);
    String deleteLaptops(List<Long> list);
}