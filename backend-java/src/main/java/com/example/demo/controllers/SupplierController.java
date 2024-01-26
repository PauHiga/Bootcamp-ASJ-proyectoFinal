package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.SupplierDTO;
import com.example.demo.models.Supplier;
import com.example.demo.services.SupplierService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/suppliers")

public class SupplierController {
	
	@Autowired
	SupplierService supplierService;

	@GetMapping()
	public ResponseEntity<List<Supplier>> getSupplier(){
		return ResponseEntity.ok(supplierService.getSupplieres());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Supplier>> getSupplier(@PathVariable Integer id){
		return ResponseEntity.ok(supplierService.getSupplierById(id));
	}
	
//	@PostMapping("/dto")
//	public ResponseEntity<SupplierDTO> returnSupplier(@RequestBody SupplierDTO supplierDTO){
//		return ResponseEntity.ok(supplierService.returnSupplier(supplierDTO));
//	}
	
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
