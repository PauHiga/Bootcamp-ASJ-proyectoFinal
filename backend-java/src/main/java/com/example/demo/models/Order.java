package com.example.demo.models;

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
	private LocalDate issue_date;
    
	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	@NotNull(message = "The delivery date cannot be null")
	private LocalDate delivery_date;
	
	@Column(length = 500)
	private String details;
	
	@Column(length = 500)
	private Float total;
    
	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;
  
	@Column(name = "updated_at")
	private LocalDate updatedAt;
    
	@ManyToOne
	@JoinColumn(name = "supplier_id", referencedColumnName = "id", nullable = false)
	@NotNull(message = "The supplier cannot be null")
	private Supplier supplier;
    
	@ManyToOne
	@JoinColumn(name = "status_id", referencedColumnName = "id", nullable = false)
	@NotNull(message = "The status cannot be null")
	private Status status;
	
	@Column(nullable = false)
	@NotNull(message = "The deletion field cannot be null")
	private Boolean deleted;
    
//	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
//	private List<OrderDetail> orderDetail;

	public Order(@NotNull(message = "The order number cannot be null") Integer order_number,
			@NotNull(message = "The issue date cannot be null") LocalDate issue_date,
			@NotNull(message = "The delivery date cannot be null") LocalDate delivery_date, String details, Float total,
			LocalDate createdAt, LocalDate updatedAt,
			@NotNull(message = "The supplier cannot be null") Supplier supplier,
			@NotNull(message = "The status cannot be null") Status status,
			@NotNull(message = "The deletion field cannot be null") Boolean deleted) {
		super();
		this.order_number = order_number;
		this.issue_date = issue_date;
		this.delivery_date = delivery_date;
		this.details = details;
		this.total = total;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.supplier = supplier;
		this.status = status;
		this.deleted = deleted;
	}
	

	
	
	
}
