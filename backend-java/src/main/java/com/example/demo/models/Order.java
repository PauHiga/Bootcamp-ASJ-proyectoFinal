package com.example.demo.models;

import java.sql.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, nullable = false)
	@NotNull(message = "The order number cannot be null")
	private Integer order_number;
	
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	@NotNull(message = "The issue date cannot be null")
	private Timestamp issue_date;
    
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	@NotNull(message = "The delivery date cannot be null")
	private Timestamp delivery_date;
	
	@Column(unique = true, length = 500)
	private String details;
    
	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;
  
	@Column(name = "updated_at")
	private LocalDate updatedAt;
    
	@ManyToOne
	@JoinColumn(name = "supplier_id", referencedColumnName = "id", insertable = false, updatable = false, nullable = false)
	@NotNull(message = "The supplier cannot be null")
	private Supplier supplier;
    
	@ManyToOne
	@JoinColumn(name = "status_id", referencedColumnName = "id", nullable = false)
	@NotNull(message = "The status cannot be null")
	private Status status;
    
}
