package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.OrderDetailDTO;
import com.example.demo.models.Order;
import com.example.demo.models.OrderDetail;
import com.example.demo.models.Product;
import com.example.demo.repositories.OrderDetailRepository;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.ProductRepository;

@Service
public class OrderDetailService {
	@Autowired
	OrderDetailRepository orderDetailRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	OrderRepository orderRepository;
	
	public List<OrderDetail> getOrderDetails(){
		return orderDetailRepository.findAll();
	}
	
	public Optional<OrderDetail> getOrderDetailById(int id) {
		return orderDetailRepository.findById(id);
	}
	
	public OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) {
			
	    OrderDetail newOrderDetail = new OrderDetail();
		
		Integer quantity = orderDetailDTO.getQuantity();
		newOrderDetail.setQuantity(quantity);
		
		Float unit_price = orderDetailDTO.getUnit_price();
		newOrderDetail.setUnit_price(unit_price);
		
		Product product;
		Optional<Product> optionalProduct = productRepository.findById(orderDetailDTO.getProduct_id());
	    if (optionalProduct.isEmpty()) {
	        throw new RuntimeException("Product not found with id: " + orderDetailDTO.getProduct_id());
	    } else {
	    	product = optionalProduct.get();
	    }
	    newOrderDetail.setProduct(product);
		
	    Order order;
		Optional<Order> optionalOrder = orderRepository.findById(orderDetailDTO.getOrder_id());
	    if (optionalOrder.isEmpty()) {
	        throw new RuntimeException("Order not found with id: " + orderDetailDTO.getOrder_id());
	    } else {
	    	order = optionalOrder.get();
	    }
	    newOrderDetail.setOrder(order);
		
		orderDetailRepository.save(newOrderDetail);
		return newOrderDetail;
	}
}
