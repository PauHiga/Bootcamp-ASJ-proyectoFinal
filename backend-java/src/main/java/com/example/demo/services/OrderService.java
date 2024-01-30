package com.example.demo.services;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.OrderCreateDTO;
import com.example.demo.dto.OrderUpdateDTO;
import com.example.demo.models.Category;
import com.example.demo.models.Order;
import com.example.demo.models.Status;
import com.example.demo.models.Supplier;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.StatusRepository;
import com.example.demo.repositories.SupplierRepository;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	SupplierRepository supplierRepository;
	
	@Autowired
	StatusRepository statusRepository;
	
	public List<Order> getOrders(){
		return orderRepository.findAll();
	}
	
	public Optional<Order> getOrderById(int id) {
		return orderRepository.findById(id);
	}
	
	public Order createOrder(OrderCreateDTO orderCreateDTO) {
		Integer order_number = orderCreateDTO.getOrder_number();
		LocalDate issue_date = orderCreateDTO.getIssue_date();
		LocalDate delivery_date = orderCreateDTO.getDelivery_date();
		String details = orderCreateDTO.getDetails();
		LocalDate createdAt = LocalDate.now();
		LocalDate updatedAt = null;

		Supplier supplier;
		Optional<Supplier> optionalSupplier = supplierRepository.findById(orderCreateDTO.getSupplier_id());
	    if (optionalSupplier.isEmpty()) {
	        throw new RuntimeException("Supplier not found with id: " + orderCreateDTO.getSupplier_id());
	    } else {
	    	supplier = optionalSupplier.get();
	    }

		Status status = statusRepository.findByName(orderCreateDTO.getStatus())
				.orElseGet(()->{
					Status newStatus =  new Status();
					newStatus.setName(orderCreateDTO.getStatus());
				return statusRepository.save(newStatus);
			});
	    
		Boolean deleted = false;
		
		Order newOrder = new Order(order_number, issue_date, delivery_date, details, createdAt, updatedAt, supplier, status, deleted);
		
		orderRepository.save(newOrder);
		return newOrder;
	}
	
//	public Order updateOrder(Integer id, OrderCreateDTO orderCreateDTO) {
//		orderRepository.save(order);
//		return order;
//	}
}
