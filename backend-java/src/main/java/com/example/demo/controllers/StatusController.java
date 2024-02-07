package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateDefaultStatus(@PathVariable Integer id){
		try {
			Status updatedStatus = statusService.updateDefaultStatus(id);
			return ResponseEntity.ok(updatedStatus);
		} catch(Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating supplier");
		}
	}
	
}
