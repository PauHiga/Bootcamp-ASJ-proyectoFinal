package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Vat_condition;

public interface VATConditionRepository extends JpaRepository<Vat_condition, Integer> {
	Optional<Vat_condition> findByName(String name);
}
