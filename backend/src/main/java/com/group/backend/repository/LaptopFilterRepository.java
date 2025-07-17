package com.group.backend.repository;

import com.group.backend.dto.Filter;
import com.group.backend.entity.Category;
import com.group.backend.entity.Laptop;
import com.group.backend.entity.Laptop_Category;
import com.group.backend.entity.Specification;
import com.group.backend.service.FormatService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class LaptopFilterRepository {

    @Autowired
    private FormatService formatService;

    private final EntityManager em;

    public LaptopFilterRepository(EntityManager em) {
        this.em = em;
    }

    public List<Laptop> findLaptopByCriteria(Filter filter){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Laptop> cq = cb.createQuery(Laptop.class);
        List<Predicate> predicates = new ArrayList<>();

        Root<Laptop> laptop = cq.from(Laptop.class);
        Join<Laptop, Specification> specification = laptop.join("specification", JoinType.INNER);
        Join<Laptop, Laptop_Category> laptopCategory = laptop.join("laptopCategories", JoinType.INNER);
        Join<Laptop_Category, Category> category = laptopCategory.join("category", JoinType.INNER);

        if(!filter.getCategory().isEmpty()) {
            Predicate newPredicate = cb.equal(category.get("name"), filter.getCategory());
            predicates.add(newPredicate);
        }
        if(!filter.getBrand().isEmpty()){
            Predicate newPredicate = cb.equal(laptop.get("brand"), filter.getBrand());
            predicates.add(newPredicate);
        }
        if(!filter.getState().isEmpty()){
            Predicate newPredicate = cb.equal(laptop.get("state"), filter.getState());
            predicates.add(newPredicate);
        }
        if(!filter.getRam().isEmpty()){
            Predicate newPredicate = cb.like(specification.get("ram"), "%" + filter.getRam() + "%");
            predicates.add(newPredicate);
        }
        if(!filter.getCpu().isEmpty()){
            Predicate newPredicate = cb.like(specification.get("cpu"), "%" + formatService.filterConditionFormat(filter.getCpu()) + "%");
            predicates.add(newPredicate);
        }
        if(!filter.getVga().isEmpty()){
            Predicate newPredicate = cb.like(specification.get("graphicsCard"), "%" + formatService.filterConditionFormat(filter.getVga()) + "%");
            predicates.add(newPredicate);
        }
        if(!filter.getSsd().isEmpty()){
            Predicate newPredicate = cb.like(specification.get("rom"), "%" + filter.getSsd() + "%");
            predicates.add(newPredicate);
        }
        if(!filter.getScreenSize().isEmpty()){
            Predicate newPredicate = cb.like(specification.get("screen"), "%" + filter.getScreenSize() + "%");
            predicates.add(newPredicate);
        }
        if(filter.getMinPrice() > 0){
            Predicate newPredicate = cb.greaterThanOrEqualTo(laptop.get("price"), filter.getMinPrice());
            predicates.add(newPredicate);
        }
        if(filter.getMaxPrice() > 0){
            Predicate newPredicate = cb.lessThanOrEqualTo(laptop.get("price"), filter.getMaxPrice());
            predicates.add(newPredicate);
        }

        Predicate newPredicate = cb.equal(laptop.get("available"), true);
        predicates.add(newPredicate);

        cq.where(predicates.toArray(new Predicate[0]));

        if("name".equals(filter.getSortBy())){
            cq.orderBy("asc".equals(filter.getSortOrder()) ? cb.asc(laptop.get("name")) : cb.desc(laptop.get("name")));
        }else if("price".equals(filter.getSortBy())){
            Expression<Double> price = laptop.get("price").as(Double.class);
            Expression<Double> salePercent = laptop.get("sale").as(Double.class);
            Expression<Number> salePrice = cb.diff(1, cb.quot(salePercent, 100));
            Expression<Number> res =  cb.prod(price, salePrice);
            cq.orderBy("asc".equals(filter.getSortOrder()) ? cb.asc(res) : cb.desc(res));
        }

        TypedQuery<Laptop> query = em.createQuery(cq);
        return query.getResultList();
    }
}
