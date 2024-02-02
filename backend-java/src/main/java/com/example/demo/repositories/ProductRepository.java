package com.example.demo.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findBySupplierId(Integer supplier_id);
	int countByDeletedFalse();
	int countByDeletedTrue();
	long count();
}
