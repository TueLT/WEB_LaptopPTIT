package com.group.backend.service;

import com.group.backend.dto.CartDetailDTO;
import java.util.List;

public interface CartDetailService {
    List<CartDetailDTO> getUserCartDetail();
    void addToCart(CartDetailDTO cartDetailDTO);
    void adjustQuantity(CartDetailDTO cartDetailDTO);
    void deleteFromCart(long id);
    void deleteAllFromCart();
}
