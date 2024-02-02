package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c WHERE c.name = :name AND c.deleted = false")
    Optional<Category> findActiveCategoryByName(@Param("name") String name);
	int countByDeletedFalse();
	int countByDeletedTrue();
	long count();

}