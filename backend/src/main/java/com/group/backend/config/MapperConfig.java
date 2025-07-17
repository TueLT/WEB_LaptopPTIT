package com.group.backend.config;

import com.group.backend.dto.LaptopCategoryDTO;
import com.group.backend.entity.Laptop_Category;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.addMappings(new PropertyMap<LaptopCategoryDTO, Laptop_Category>() {
            @Override
            protected void configure() {
                map().getLaptopCategoryId().setLaptopId(source.getLaptop().getId());
                map().getLaptopCategoryId().setCategoryId(source.getCategory().getId());
            }
        });

        return modelMapper;
    }
}
