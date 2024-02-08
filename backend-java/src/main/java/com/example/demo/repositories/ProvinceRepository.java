package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Province;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
	Optional<Province> findByName(String name);
    Optional<Province> findByNameAndCountry_id(String name, int countryId);
}
