package com.example.demo.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.OrderCreateDTO;
import com.example.demo.dto.OrderUpdateDTO;
import com.example.demo.models.Order;
import com.example.demo.models.Status;
import com.example.demo.models.Supplier;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.StatusRepository;
import com.example.demo.repositories.SupplierRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	SupplierRepository supplierRepository;
	
	@Autowired
	StatusRepository statusRepository;
	
	@Autowired
	OrderDetailService orderDetailService;
		
	public List<Order> getOrders(){
		return orderRepository.findAll();
	}
	
	public Optional<Order> getOrderById(int id) {
		return orderRepository.findById(id);
	}
	
	public long count() {
		return orderRepository.count();
	}
	
	public long countByDeletedTrue() {
		return orderRepository.countByDeletedTrue();
	}
	
	public long countByDeletedFalse() {
		return orderRepository.countByDeletedFalse();
	}
	
	@Transactional
    public List<Order> createOrders(List<OrderCreateDTO> orderCreateDTOList) {
        List<Order> createdOrders = new ArrayList<>();

        for (OrderCreateDTO orderCreateDTO : orderCreateDTOList) {
            Order createdOrder = createOrder(orderCreateDTO);
            createdOrders.add(createdOrder);
        }

        return createdOrders;
    }
    
	public Order createOrder(OrderCreateDTO orderCreateDTO) {
		
		Integer order_number = orderCreateDTO.getOrder_number();
		LocalDate issue_date = LocalDate.parse(orderCreateDTO.getIssue_date());
		LocalDate delivery_date = LocalDate.parse(orderCreateDTO.getDelivery_date());
		String details = orderCreateDTO.getDetails();
		Float total = orderCreateDTO.getTotal();
		LocalDate createdAt = LocalDate.now();
		LocalDate updatedAt = null;

		Supplier supplier;
		Optional<Supplier> optionalSupplier = supplierRepository.findById(orderCreateDTO.getSupplier_id());
	    if (optionalSupplier.isEmpty()) {
	        throw new RuntimeException("Supplier not found with id: " + orderCreateDTO.getSupplier_id());
	    } else {
	    	supplier = optionalSupplier.get();
	    }
	    
	    Status status;
		Optional<Status> optionalStatus = statusRepository.findById(2);
	    if (optionalStatus.isEmpty()) {
	        throw new RuntimeException("Default status (id: 1) not found");
	    } else {
	    	status = optionalStatus.get();
	    }
  
		Boolean deleted = false;
		
		Order newOrder = new Order(order_number, issue_date, delivery_date, details, total, createdAt, updatedAt, supplier, status, deleted);

		Order SavedOrder = orderRepository.save(newOrder);
		
		orderDetailService.createOrderDetails(orderCreateDTO.getOrderDetails(), SavedOrder.getId());
        
		
		return newOrder;
	}

	
	public Order updateOrder(Integer id, OrderUpdateDTO orderUpdateDTO) {
        Optional<Order> existingOrder = orderRepository.findById(id);
    	if(existingOrder.isEmpty()) {
    		throw new RuntimeException("Order not found with ID: " + id);
    	} 
    	Order updatedOrder = existingOrder.get();
    	
		if(orderUpdateDTO.getOrder_number() != null) {
			updatedOrder.setOrder_number(orderUpdateDTO.getOrder_number());		
		}
		if(orderUpdateDTO.getIssue_date() != null) {
			updatedOrder.setIssue_date(LocalDate.parse(orderUpdateDTO.getIssue_date()));		
		}
		if(orderUpdateDTO.getDelivery_date() != null) {
			updatedOrder.setDelivery_date(LocalDate.parse(orderUpdateDTO.getDelivery_date()));		
		}
		if(orderUpdateDTO.getDetails() != null) {
			updatedOrder.setDetails(orderUpdateDTO.getDetails());		
		}
		if(orderUpdateDTO.getTotal() != null) {
			updatedOrder.setTotal(orderUpdateDTO.getTotal());		
		}
		if(orderUpdateDTO.getSupplier_id() != null) {
			Supplier supplier;
			Optional<Supplier> optionalSupplier = supplierRepository.findById(orderUpdateDTO.getSupplier_id());
		    if (optionalSupplier.isEmpty()) {
		        throw new RuntimeException("Supplier not found with id: " + orderUpdateDTO.getSupplier_id());
		    } else {
		    	supplier = optionalSupplier.get();
		    }	
		    updatedOrder.setSupplier(supplier);	
		}
		if(orderUpdateDTO.getStatus() != null) {
			Status status = statusRepository.findByName(orderUpdateDTO.getStatus())
			.orElseGet(()->{
				Status newStatus =  new Status();
				newStatus.setName(orderUpdateDTO.getStatus());
			return statusRepository.save(newStatus);
		});
			updatedOrder.setStatus(status);	
		}
		if(orderUpdateDTO.getDeleted() != null) {
			updatedOrder.setDeleted(orderUpdateDTO.getDeleted());		
		}
		updatedOrder.setUpdatedAt(LocalDate.now());
		orderRepository.save(updatedOrder);
		return updatedOrder;
	}
}
