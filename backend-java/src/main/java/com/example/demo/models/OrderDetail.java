package com.example.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "order_details")
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false)
	@NotNull(message = "The quantity cannot be null")
	private Integer quantity;
	
	@Column(columnDefinition = "DECIMAL(10,2)", nullable = false)
	@NotNull(message = "The unit price cannot be null")
	private Float unit_price;

	@ManyToOne
	@JoinColumn(name = "product_id", referencedColumnName = "id", nullable=false)
	@NotNull(message = "The product cannot be null")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "id", nullable=false)
	@NotNull(message = "The order cannot be null")
	private Order order;
}
