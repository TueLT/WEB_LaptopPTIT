package com.group.backend.service.implement;

import com.group.backend.dto.StatusDTO;
import com.group.backend.repository.StatusRepository;
import com.group.backend.service.StatusService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusServiceImp implements StatusService {

    @Autowired
    private StatusRepository statusRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public StatusDTO getStatusById(long id) {
        return modelMapper.map(statusRepo.findById(id), StatusDTO.class);
    }
}
