package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.dto.SectorDTO;
import com.example.demo.models.Category;
import com.example.demo.models.Sector;
import com.example.demo.services.CategoryService;
import com.example.demo.services.SectorService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	CategoryService categoryService;

	@GetMapping()
	public ResponseEntity<List<Category>> getSectors(){
		return ResponseEntity.ok(categoryService.getCategories());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Category>> getSectorById(@PathVariable Integer id){
		return ResponseEntity.ok(categoryService.getCategoryById(id));
	}
	
	@PostMapping()
	public ResponseEntity<Object> createSector(@RequestBody CategoryDTO categoryDTO){
		try {
			return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating sector: " + e.getMessage());			
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> editSector(@PathVariable Integer id, @RequestBody CategoryDTO categoryDTO){
		try {
			return ResponseEntity.ok(categoryService.editSector(id, categoryDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing sector: " + e.getMessage());			
		}
	}

	
}
