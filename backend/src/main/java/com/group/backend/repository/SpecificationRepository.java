package com.group.backend.repository;

import com.group.backend.entity.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpecificationRepository extends JpaRepository<Specification, Long> {
    @Query("""
        select s 
        from Specification s
        order by s.id desc
    """)
    List<Specification> reverseSortedSpecification();
}
