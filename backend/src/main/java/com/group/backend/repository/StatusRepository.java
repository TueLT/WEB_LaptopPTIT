package com.group.backend.repository;

import com.group.backend.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
    Status findById(long id);
}
