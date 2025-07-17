package com.group.backend.controller;

import com.group.backend.dto.CartDetailDTO;
import com.group.backend.entity.Laptop;
import com.group.backend.entity.User;
import com.group.backend.repository.CartDetailRepository;
import com.group.backend.security.CurrentUser;
import com.group.backend.service.CartDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-detail")
public class CartDetailController {

    @Autowired
    private CartDetailService cartDetailService;
    @Autowired
    private CurrentUser currentUser;
    @Autowired
    private CartDetailRepository cartDetailRepo;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public ResponseEntity<List<CartDetailDTO>> getUserCartDetail(){
        return ResponseEntity.ok(cartDetailService.getUserCartDetail());
    }

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartDetailDTO cartDetailDTO){
        User user = currentUser.getCurrentUser();
        Laptop laptop = modelMapper.map(cartDetailDTO.getLaptop(), Laptop.class);
        if(cartDetailRepo.findByLaptopAndUser(laptop, user).isPresent()){
            return ResponseEntity.badRequest().body("Laptop is already in cart");
        }
        cartDetailService.addToCart(cartDetailDTO);
        return ResponseEntity.ok().body("Laptop added successfully");
    }

    @PutMapping("/update")
    public ResponseEntity<Void> updateCart(@RequestBody CartDetailDTO cartDetailDTO){
        cartDetailService.adjustQuantity(cartDetailDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteFromCart(@PathVariable long id){
        cartDetailService.deleteFromCart(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deleteUserCart")
    public ResponseEntity<Void> deleteAllFromCart(){
        cartDetailService.deleteAllFromCart();
        return ResponseEntity.ok().build();
    }
}
