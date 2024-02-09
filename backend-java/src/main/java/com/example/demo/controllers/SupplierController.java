package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.SupplierCreateDTO;
import com.example.demo.dto.SupplierUpdateDTO;
import com.example.demo.models.Order;
import com.example.demo.models.Supplier;
import com.example.demo.services.SupplierService;

import jakarta.validation.Valid;

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
	public ResponseEntity<Supplier> getSectorById(@PathVariable Integer id){
		Optional<Supplier> optionalSupplier = supplierService.getSupplierById(id);
		if (optionalSupplier.isPresent()) {
			return ResponseEntity.ok(optionalSupplier.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
    @GetMapping("/count")
    public ResponseEntity<Long> countEntities(
    	@RequestParam(name = "deleted", required = false) Boolean deleted) {
        long count;
        if (deleted != null && deleted) {
            count = supplierService.countByDeletedTrue();
        } else if (deleted != null && !deleted) {
            count = supplierService.countByDeletedFalse();
        } else {
            count = supplierService.count();
        }
        return ResponseEntity.ok(count);
    }

	@PostMapping()
	public ResponseEntity<Object> createSupplier(@Valid @RequestBody SupplierCreateDTO supplierDTO, BindingResult bindingResult){
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new HashMap<>();
			bindingResult.getFieldErrors().forEach((error)->{
				String campo = error.getField();
				String errMsj = error.getDefaultMessage();
				errors.put(campo, errMsj);
			});
			System.out.println(errors);
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		List<SupplierCreateDTO> supplierCreateDTOList = List.of(supplierDTO);
		try {
			Supplier createdSupplier = supplierService.createSuppliers(supplierCreateDTOList).get(0);
			return ResponseEntity.ok(createdSupplier);
		} catch (DataIntegrityViolationException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating supplier");
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order: " + e.getMessage());			
		}
	}

	@PostMapping("/batch")
	public ResponseEntity<Object> createOrders(@RequestBody List<SupplierCreateDTO> supplierCreateDTOList) {
	    try {
	        return ResponseEntity.ok(supplierService.createSuppliers(supplierCreateDTOList));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error creating suppliers: " + e.getMessage());
	    }
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateSupplier(@PathVariable Integer id, @RequestBody SupplierUpdateDTO supplierUpdateDTO) {
	    try {
	        Supplier updatedSupplier = supplierService.updateSupplier(id, supplierUpdateDTO);
	        return ResponseEntity.ok(updatedSupplier);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: "+ e.getMessage());
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating supplier");
	    }
	}	
}
