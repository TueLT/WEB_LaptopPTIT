package com.group.backend.repository;

import com.group.backend.entity.Cart_Detail;
import com.group.backend.entity.Laptop;
import com.group.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartDetailRepository extends JpaRepository<Cart_Detail, Long> {
    List<Cart_Detail> findByUser(User user);
    Optional<Cart_Detail> findByLaptopAndUser(Laptop laptop, User user);

    @Transactional
    void deleteByUser(User user);
}
