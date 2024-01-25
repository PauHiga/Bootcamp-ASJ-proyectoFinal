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
	private Integer unit_price;

	@ManyToOne
	@JoinColumn(name = "product_id", referencedColumnName = "id", insertable = false, updatable = false, nullable=false)
	@NotNull(message = "The product cannot be null")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "id", insertable = false, updatable = false, nullable=false)
	@NotNull(message = "The order cannot be null")
	private Order order;

	public OrderDetail(Integer id, @NotNull(message = "The product id cannot be null") Integer product_id,
			@NotNull(message = "The quantity cannot be null") Integer quantity,
			@NotNull(message = "The order id cannot be null") Integer order_id,
			@NotNull(message = "The unit price cannot be null") Integer unit_price, Product product,
			Order order) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.unit_price = unit_price;
		this.product = product;
		this.order = order;
	}

	public OrderDetail() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getUnit_price() {
		return unit_price;
	}

	public void setUnit_price(Integer unit_price) {
		this.unit_price = unit_price;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
    
    
}
