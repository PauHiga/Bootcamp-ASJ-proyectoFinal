package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Order;
import com.example.demo.repositories.OrderRepository;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepository;
	
	public List<Order> getOrderes(){
		return orderRepository.findAll();
	}
	
	public Optional<Order> getOrderesById(int id) {
		return orderRepository.findById(id);
	}
	
	public Order createOrder(Order order) {
		orderRepository.save(order);
		return order;
	}
}
