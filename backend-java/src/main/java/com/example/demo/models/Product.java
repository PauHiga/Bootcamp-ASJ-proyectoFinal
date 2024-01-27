package com.example.demo.models;

import java.time.LocalDate;
import java.util.Optional;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, length = 20, nullable = false)
	@NotNull(message = "The SKU cannot be null")
	private String SKU;
	
	@Column(length = 50, nullable = false)
	@NotNull(message = "The name cannot be null")
	private String name;
	
	@Column(length = 1000)
	private String description;
	
	@Column(columnDefinition = "DECIMAL(10,2)", nullable = false)
	@NotNull(message = "The price cannot be null")
	private float price;
	
	@Column(length = 1500)
	private String url_image;
	
	@Column(nullable = false)
	@NotNull(message = "The deletion field cannot be null")
	private Boolean deleted;
    
	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;
  
	@Column(name = "updated_at")
	private LocalDate updatedAt;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "supplier_id", referencedColumnName = "id", nullable=false)
	@NotNull(message = "The supplier cannot be null")
	private Supplier supplier;
    
	@ManyToOne
	@JoinColumn(name = "category_id", referencedColumnName = "id", nullable=false)
	@NotNull(message = "The category cannot be null")
	private Category category;

}
