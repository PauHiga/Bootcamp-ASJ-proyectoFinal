package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.models.Category;
import com.example.demo.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Category> getCategories(){
		return categoryRepository.findAll();
	}
	
	public Optional<Category> getCategoryById(int id) {
		return categoryRepository.findById(id);
	}
	
	public Category createCategory(CategoryDTO categoryDTO) {
			Category newCategory =  new Category();
			newCategory.setName(categoryDTO.getName());
			newCategory.setCreatedAt(LocalDate.now());
			newCategory.setDeleted(false);
			return categoryRepository.save(newCategory);
	}
	
	public Category editCategory(Integer id, CategoryDTO categoryDTO) {
		Category category = categoryRepository.findById(id).get();
		if (category != null) {
			category.setUpdatedAt(LocalDate.now());
			category.setDeleted(categoryDTO.getDeleted());
			category.setName(categoryDTO.getName());
			categoryRepository.save(category);
			return category;
		}
		return category;
	}
}

