package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.models.Category;
import com.example.demo.models.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {
	Optional<Status> findByName(String name);
	
    @Query("SELECT s FROM Status s WHERE s.default_status = true")
    Optional<List<Status>> findDefaultState();
}
