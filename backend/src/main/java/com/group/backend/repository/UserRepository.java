package com.group.backend.repository;

import com.group.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String username);
    @Query("""
       select count(u) 
       from User u
       where month(u.registrationDate) = month(:today)
    """)
    Long findThisMonthUsers(LocalDate today);
}
