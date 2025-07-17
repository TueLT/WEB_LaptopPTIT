package com.group.backend.controller;

import com.group.backend.dto.ChangeLaptopAvailableDTO;
import com.group.backend.dto.LaptopDTO;
import com.group.backend.dto.LaptopSummaryDTO;
import com.group.backend.dto.LaptopTableDTO;
import com.group.backend.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
    @RequestMapping("/laptop")
public class LaptopController {

    @Autowired
    private LaptopService laptopService;

    @GetMapping("/{id}")
    public ResponseEntity<LaptopDTO> getLaptopById(@PathVariable long id) {
        return ResponseEntity.ok(laptopService.getLaptopById(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<LaptopSummaryDTO>> searchLaptop(@RequestParam String keyword) {
        if(keyword.length() <= 1) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(laptopService.searchLaptop(keyword));
    }

    @GetMapping("/admin/getAllLaptops")
    public ResponseEntity<List<LaptopTableDTO>> getAllLaptops() {
        return ResponseEntity.ok(laptopService.getAllLaptops());
    }

    @PostMapping("/admin/add")
    public ResponseEntity<String> addLaptop(@RequestBody LaptopDTO laptopDTO) {
        return ResponseEntity.ok(laptopService.addLaptop(laptopDTO));
    }

    @PutMapping("/admin/changeAvailable")
    public ResponseEntity<String> changeLaptopAvailable(@RequestBody ChangeLaptopAvailableDTO changeLaptopAvailableDTO) {
        return ResponseEntity.ok(laptopService.changeLaptopAvailable(changeLaptopAvailableDTO));
    }

    @DeleteMapping("/admin/deleteLaptops")
    public ResponseEntity<String> deleteLaptops(@RequestBody List<Long> list) {
        System.out.println(list);
        return ResponseEntity.ok(laptopService.deleteLaptops(list));
    }
}
