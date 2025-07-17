package com.group.backend.repository;

import com.group.backend.entity.Order;
import com.group.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findById(long id);
    List<Order> findByUserId(long customerId);
    List<Order> findAll();
    @Transactional
    void deleteByUser(User user);
    @Query("""
        select o 
        from Order o
        where o.user = :user
        order by o.id desc
    """)
    List<Order> reverseSortedOrderByUser(User user);
    @Query("""
    select sum(o.totalPrice) 
    from Order o
    where month(o.orderDate) = month(:today)
    """)
    long getThisMonthRevenue(LocalDate today);
    @Query("""
    select count(o) 
    from Order o
    where month(o.orderDate) = month(:today)
    """)
    long countThisMonthOrder(LocalDate today);
}
