package com.group.backend.service.implement;

import com.group.backend.dto.CartDetailDTO;
import com.group.backend.dto.LaptopSummaryDTO;
import com.group.backend.entity.Cart_Detail;
import com.group.backend.entity.Laptop;
import com.group.backend.entity.User;
import com.group.backend.repository.CartDetailRepository;
import com.group.backend.repository.LaptopRepository;
import com.group.backend.security.CurrentUser;
import com.group.backend.service.CartDetailService;
import com.group.backend.service.FormatService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartDetailServiceImp implements CartDetailService {

    @Autowired
    private LaptopRepository laptopRepo;
    @Autowired
    private CartDetailRepository cartDetailRepo;
    @Autowired
    private CurrentUser currentUser;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FormatService formatService;

    @Override
    public List<CartDetailDTO> getUserCartDetail() {
        User user = currentUser.getCurrentUser();
        List<Cart_Detail> userCartDetail = cartDetailRepo.findByUser(user);
        return userCartDetail.stream()
                .map(tmp -> {
                    CartDetailDTO cartDetailDTO = modelMapper.map(tmp, CartDetailDTO.class);
                    cartDetailDTO.setLaptop(formatService.formattedLaptopSummary(modelMapper.map(tmp.getLaptop(), LaptopSummaryDTO.class)));
                    return cartDetailDTO;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void addToCart(CartDetailDTO cartDetailDTO) {
        Laptop laptop = laptopRepo.findById(cartDetailDTO.getLaptop().getId()).orElse(null);
        User user = currentUser.getCurrentUser();
        cartDetailDTO.setUnitPrice(formatService.priceFormat(laptop.getDiscountedPrice()));
        Cart_Detail cartDetail = modelMapper.map(cartDetailDTO, Cart_Detail.class);
        cartDetail.setUser(user);
        cartDetail.setLaptop(laptop);
        cartDetailRepo.save(cartDetail);
    }

    @Override
    public void adjustQuantity(CartDetailDTO cartDetailDTO) {
        Cart_Detail cartDetail = cartDetailRepo.findById(cartDetailDTO.getId()).orElse(null);
        cartDetail.setQuantity(cartDetailDTO.getQuantity());
        cartDetailRepo.save(cartDetail);
    }

    @Override
    public void deleteFromCart(long id) {
        cartDetailRepo.deleteById(id);
    }

    @Override
    @Transactional
    public void deleteAllFromCart() {
        User user = currentUser.getCurrentUser();
        cartDetailRepo.deleteByUser(user);
    }
}
