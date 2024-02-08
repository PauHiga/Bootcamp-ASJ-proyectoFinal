package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.models.Locality;
import com.example.demo.models.Province;

public interface LocalityRepository extends JpaRepository<Locality, Integer> {
	Optional<Locality> findByName(String name);
	Optional<Locality> findByNameAndProvince_id(String name, int provinceId);

	
//    @Query("SELECT l FROM Locality l WHERE l.name = :name AND l.province_id = :provinceId")
//	Optional<Locality> findByNameAndProvince(@Param("name") String name, @Param("provinceId") int provinceId);


}

