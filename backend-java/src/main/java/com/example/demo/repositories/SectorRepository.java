package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Sector;

public interface SectorRepository extends JpaRepository<Sector, Integer> {
	Optional<Sector> findByName(String name);
}
