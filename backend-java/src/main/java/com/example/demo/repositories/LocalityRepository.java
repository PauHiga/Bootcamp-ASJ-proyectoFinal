package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Locality;

public interface LocalityRepository extends JpaRepository<Locality, Integer> {
	Optional<Locality> findByName(String name);
}
