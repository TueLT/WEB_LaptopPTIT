package com.group.backend.repository;

import com.group.backend.entity.Order_Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<Order_Detail, Long> {
    List<Order_Detail> findByOrderId(Long id);
}
