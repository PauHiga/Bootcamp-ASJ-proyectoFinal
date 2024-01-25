package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.SupplierDTO;
import com.example.demo.models.Supplier;
import com.example.demo.services.SupplierService;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin(origins = "http://localhost:4200")
public class SupplierController {
	
	@Autowired
	SupplierService supplierService;

	@GetMapping()
	public ResponseEntity<List<Supplier>> getSupplier(){
		return ResponseEntity.ok(supplierService.getSupplieres());
	}
	
	@PostMapping()
	public ResponseEntity<Object> createSupplier(@RequestBody SupplierDTO supplierDTO){
		try {
			return ResponseEntity.ok(supplierService.createSupplier(supplierDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating supplier: " + e.getMessage());			
		}
	}
	
}
