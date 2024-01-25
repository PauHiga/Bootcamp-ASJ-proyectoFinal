package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Locality;

public interface LocalityRepository extends JpaRepository<Locality, Integer> {

}
