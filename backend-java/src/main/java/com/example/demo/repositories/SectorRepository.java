package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.models.Sector;

public interface SectorRepository extends JpaRepository<Sector, Integer> {
    @Query("SELECT s FROM Sector s WHERE s.name = :name AND s.deleted = false")
    Optional<Sector> findActiveSectorByName(@Param("name") String name);
}
