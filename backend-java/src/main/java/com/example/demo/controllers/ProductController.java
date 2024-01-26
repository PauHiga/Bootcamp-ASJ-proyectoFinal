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
import com.example.demo.models.Product;
import com.example.demo.models.Supplier;
import com.example.demo.services.ProductService;
import com.example.demo.services.SupplierService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/products")
public class ProductController {
	@Autowired
	ProductService productService;

	@GetMapping()
	public ResponseEntity<List<Product>> getSupplier(){
		return ResponseEntity.ok(productService.getProductes());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> getSectorById(@PathVariable Integer id){
		Optional<Product> optionalSupplier = productService.getProductesById(id);
		if (optionalSupplier.isPresent()) {
			return ResponseEntity.ok(optionalSupplier.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

//	@PostMapping()
//	public ResponseEntity<Object> createSupplier(@RequestBody ProductDTO productDTO){
//		try {
//			return ResponseEntity.ok(productService.createProduct(productDTO));
//		}
//		catch(Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating supplier: " + e.getMessage());			
//		}
//	}

	
}
