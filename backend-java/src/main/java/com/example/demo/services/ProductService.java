package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import com.example.demo.controllers.ProductDTO;
import com.example.demo.models.Product;
import com.example.demo.repositories.ProductRepository;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	
	public List<Product> getProductes(){
		return productRepository.findAll();
	}
	
	public Optional<Product> getProductesById(int id) {
		return productRepository.findById(id);
	}
	
//	public Product createProduct(ProductDTO productDTO) {
//		productRepository.save(productDTO);
//		return product;
//	}
}
