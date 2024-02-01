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
	
	public Category updateCategory(Integer id, CategoryDTO categoryDTO) {
	    Optional<Category> existingCategory = categoryRepository.findById(id);
	    if(existingCategory.isEmpty()) {
	    	throw new RuntimeException("Category not found with ID: " + id);
	    };
	    
	    Category updatedCategory = existingCategory.get();
    	updatedCategory.setUpdatedAt(LocalDate.now());

        if (categoryDTO.getDeleted() != null) {
        	updatedCategory.setDeleted(categoryDTO.getDeleted());
        }

        if (categoryDTO.getName() != null) {
        	updatedCategory.setName(categoryDTO.getName());
        }

        categoryRepository.save(updatedCategory);
        return updatedCategory;
    }
}



