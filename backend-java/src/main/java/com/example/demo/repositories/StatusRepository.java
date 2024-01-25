package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Status;

public interface StatusRepository extends JpaRepository<Status, Integer> {

}
