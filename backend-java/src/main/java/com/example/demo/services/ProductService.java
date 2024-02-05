package com.example.demo.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductUpdateDTO;
import com.example.demo.models.Category;
import com.example.demo.models.Product;
import com.example.demo.models.Product;
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
	
	private List<Product> batchProductList = new ArrayList<>();
	
	public List<Product> getProducts(){
		return productRepository.findAll();
	}
	
	public Optional<Product> getProductById(int id) {
		return productRepository.findById(id);
	}
	
	public long count() {
		return productRepository.count();
	}
	
	public long countByDeletedTrue() {
		return productRepository.countByDeletedTrue();
	}
	
	public long countByDeletedFalse() {
		return productRepository.countByDeletedFalse();
	}
	
	
    public List<Product> createProducts(List<ProductDTO> productDTOList) {
    	batchProductList.clear();
        List<Product> createdProducts = new ArrayList<>();

        for (ProductDTO productDTO : productDTOList) {
            Product createdProduct = createProduct(productDTO);
            createdProducts.add(createdProduct);
        }

        saveBatchOrders(batchProductList);

        return createdProducts;
    }
	
    // Add a new method for batch insert
    private void saveBatchOrders(List<Product> productList) {
    	productRepository.saveAll(productList);
        
        // Clear the list after batch insert
        batchProductList.clear();
    }
	
	
	private Product createProduct(ProductDTO productDTO) {
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
	
    public Product updateSupplier(Integer id, ProductUpdateDTO productUpdateDTO) {
    	System.out.println(id);
    	System.out.println(productUpdateDTO.getId());
    	Optional<Product> existingProduct = productRepository.findById(id);
        	if(existingProduct.isEmpty()) {
        		throw new RuntimeException("Product not found with ID: " + id);
        	} 
       	Product updatedProduct = existingProduct.get();
        
        if (productUpdateDTO.getSku() != null) {
        	updatedProduct.setSku(productUpdateDTO.getSku());
        }

        if (productUpdateDTO.getName() != null) {
        	updatedProduct.setName(productUpdateDTO.getName());
        }
        if (productUpdateDTO.getDescription() != null) {
        	updatedProduct.setDescription(productUpdateDTO.getDescription());
        }
        if (productUpdateDTO.getPrice() != null) {
        	updatedProduct.setPrice(productUpdateDTO.getPrice());
        }
        
        if (productUpdateDTO.getUrl_image() != null) {
        	updatedProduct.setUrl_image(productUpdateDTO.getUrl_image());
        }
        
        if (productUpdateDTO.getDeleted() != null) {
        	updatedProduct.setDeleted(productUpdateDTO.getDeleted());
        }
        
        updatedProduct.setUpdatedAt(LocalDate.now());

		if(productUpdateDTO.getSupplier_id() != null) {
			Optional<Supplier> supplier = supplierRepository.findById(productUpdateDTO.getSupplier_id());
		    if (supplier.isEmpty()) {
		        throw new RuntimeException("Supplier not found with id: " + productUpdateDTO.getSupplier_id());
		    }			
			updatedProduct.setSupplier(supplier.get());
		}

		
		if(productUpdateDTO.getCategory() != null) {
		Category category = categoryRepository.findActiveCategoryByName(productUpdateDTO.getCategory())
			.orElseGet(()->{
			Category newCategory =  new Category();
			newCategory.setName(productUpdateDTO.getCategory());
			newCategory.setCreatedAt(LocalDate.now());
			newCategory.setDeleted(false);
			return categoryRepository.save(newCategory);
		});
		updatedProduct.setCategory(category);
		}
		
		productRepository.save(updatedProduct);
		return updatedProduct;
    }
        
        

	
}
