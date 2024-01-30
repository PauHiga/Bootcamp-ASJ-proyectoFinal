package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {
	Optional<Status> findByName(String name);
}
