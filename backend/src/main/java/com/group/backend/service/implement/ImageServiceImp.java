package com.group.backend.service.implement;

import com.group.backend.dto.LaptopDTO;
import com.group.backend.entity.Image;
import com.group.backend.entity.Laptop;
import com.group.backend.repository.ImageRepository;
import com.group.backend.service.ImageService;
import com.group.backend.service.FormatService;
import com.group.backend.service.LaptopService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class ImageServiceImp implements ImageService {

    @Autowired
    private ImageRepository imageRepo;
    @Autowired
    private LaptopService laptopService;
    @Autowired
    private FormatService formatService;

    @Override
    public String uploadImages(List<MultipartFile> images) throws IOException {
        Laptop laptop = laptopService.getLastLaptop();
        for(int i = 0; i < images.size(); i++){
            String folderPath = "D:\\OOP_MajorAssignment\\frontend\\";
            String imageType = formatService.imgTypeFormat(images.get(i).getContentType());
            String filePath = "image/laptop/" + formatService.laptopNameFormat(laptop.getName()) + "_" + (i + 1) + imageType;
            folderPath = folderPath + filePath.replace("/", "\\");
            imageRepo.save(new Image(filePath, laptop));
            images.get(i).transferTo(new File(folderPath));
        }
        return "Image uploaded successfully";
    }
}
