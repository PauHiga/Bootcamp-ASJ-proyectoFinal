package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.models.Category;
import com.example.demo.services.CategoryService;

import jakarta.validation.Valid;

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
	public ResponseEntity<Category> getCategoryById(@PathVariable Integer id){
		Optional<Category> optionalCategory = categoryService.getCategoryById(id);
		if (optionalCategory.isPresent()) {
			return ResponseEntity.ok(optionalCategory.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createCategory(@Valid @RequestBody CategoryDTO categoryDTO, BindingResult bindingResult){
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
		try {
			return ResponseEntity.ok(categoryService.createCategory(categoryDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating sector: " + e.getMessage());			
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Object> updateCategory(@Valid @PathVariable Integer id, @RequestBody CategoryDTO categoryDTO, BindingResult bindingResult){
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
		try {
			return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error editing sector: " + e.getMessage());			
		}
	}

	
}
