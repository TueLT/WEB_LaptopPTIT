package com.group.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImageService {
    String uploadImages(List<MultipartFile> images) throws IOException;
}
