package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Category;
import com.example.demo.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Category> getAddresses(){
		return categoryRepository.findAll();
	}
	
	public Optional<Category> getAddressesById(int id) {
		return categoryRepository.findById(id);
	}
	
	public Category createAddress(Category category) {
		categoryRepository.save(category);
		return category;
	}	
	
}
