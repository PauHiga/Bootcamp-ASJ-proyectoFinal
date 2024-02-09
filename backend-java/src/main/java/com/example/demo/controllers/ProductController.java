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

import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductDTO;
import com.example.demo.dto.ProductUpdateDTO;
import com.example.demo.models.Order;
import com.example.demo.models.Product;
import com.example.demo.services.ProductService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/products")
public class ProductController {
	@Autowired
	ProductService productService;

	@GetMapping()
	public ResponseEntity<List<Product>> getSupplier(){
		return ResponseEntity.ok(productService.getProducts());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Integer id){
		Optional<Product> optionalProduct = productService.getProductById(id);
		if (optionalProduct.isPresent()) {
			return ResponseEntity.ok(optionalProduct.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}

    @GetMapping("/count")
    public ResponseEntity<Long> countEntities(
    	@RequestParam(name = "deleted", required = false, defaultValue = "false") Boolean deleted) {
        long count;
        if (deleted != null && deleted) {
            count = productService.countByDeletedTrue();
        } else if (deleted != null && !deleted) {
            count = productService.countByDeletedFalse();
        } else {
            count = productService.count();
        }
        return ResponseEntity.ok(count);
    }
	
	@PostMapping()
	public ResponseEntity<Object> createProduct(@RequestBody ProductDTO ProductDTO){
		List<ProductDTO> productDTOList = List.of(ProductDTO);
		try {
			Product createdProduct = productService.createProducts(productDTOList).get(0);
			return ResponseEntity.ok(createdProduct);
		} catch (DataIntegrityViolationException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating product");
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating product: " + e.getMessage());			
		}
	}

	@PostMapping("/batch")
	public ResponseEntity<Object> createProducts(@Valid @RequestBody List<ProductDTO> productDTOList, BindingResult bindingResult) {
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
	        return ResponseEntity.ok(productService.createProducts(productDTOList));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error creating products: " + e.getMessage());
	    }
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody ProductUpdateDTO productUpdateDTO) {
	    try {
	        Product updatedProduct = productService.updateSupplier(id, productUpdateDTO);
	        return ResponseEntity.ok(updatedProduct);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with ID: " + id);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating product");
	    }
	}	

	
}
