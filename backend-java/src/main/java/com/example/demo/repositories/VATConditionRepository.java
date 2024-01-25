package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.VATCondition;

public interface VATConditionRepository extends JpaRepository<VATCondition, Integer> {
	Optional<VATCondition> findByName(String name);
}
