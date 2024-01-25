package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {
	Optional<Country> findByName(String name);
}
