package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.Status;
import com.example.demo.services.StatusService;

@RestController
@RequestMapping("/status")
public class StatusController {
	
	@Autowired
	StatusService statusService;

	@GetMapping()
	public ResponseEntity<List<Status>> getSectors(){
		return ResponseEntity.ok(statusService.getStatus());
	}
}
