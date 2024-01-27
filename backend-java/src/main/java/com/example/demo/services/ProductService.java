package com.example.demo.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.models.Category;
import com.example.demo.models.Product;
import com.example.demo.models.Sector;
import com.example.demo.repositories.CategoryRepository;
import com.example.demo.repositories.ProductRepository;
import com.example.demo.repositories.SupplierRepository;
import com.example.demo.models.Supplier;

@Service
public class ProductService {
	@Autowired
	ProductRepository productRepository;
	@Autowired
	SupplierRepository supplierRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Product> getProductes(){
		return productRepository.findAll();
	}
	
	public Optional<Product> getProductesById(int id) {
		return productRepository.findById(id);
	}
	
	public Product createProduct(ProductDTO productDTO) {
		String SKU = productDTO.getSku();
		String name = productDTO.getName();
		String description = productDTO.getDescription();
		float price = productDTO.getPrice();
		String url_image = productDTO.getUrl_image();
		boolean deleted = false;
		LocalDate createdAt = LocalDate.now();
		LocalDate updatedAt = null;

		
		Optional<Supplier> supplier = supplierRepository.findById(productDTO.getSupplier_id());
	    if (supplier.isEmpty()) {
	        throw new RuntimeException("Supplier not found with id: " + productDTO.getSupplier_id());
	    }
		
		Category category = categoryRepository.findActiveCategoryByName(productDTO.getCategory())
			.orElseGet(()->{
			Category newCategory =  new Category();
			newCategory.setName(productDTO.getCategory());
			newCategory.setCreatedAt(LocalDate.now());
			newCategory.setDeleted(false);
			return categoryRepository.save(newCategory);
		});
		
		Product newProduct = new Product(null, SKU, name, description, price, url_image, deleted, createdAt, updatedAt, supplier.get(), category);
		productRepository.save(newProduct);
		return newProduct;
	}
}
