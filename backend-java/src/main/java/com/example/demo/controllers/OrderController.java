package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderCreateDTO;
import com.example.demo.models.Order;
import com.example.demo.services.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	OrderService orderService;

	@GetMapping()
	public ResponseEntity<List<Order>> getSupplier(){
		return ResponseEntity.ok(orderService.getOrders());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Order> getSectorById(@PathVariable Integer id){
		Optional<Order> optionalOrder = orderService.getOrderById(id);
		if (optionalOrder.isPresent()) {
			return ResponseEntity.ok(optionalOrder.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping()
	public ResponseEntity<Object> createSupplier(@RequestBody OrderCreateDTO orderCreateDTO){
		try {
			return ResponseEntity.ok(orderService.createOrder(orderCreateDTO));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order: " + e.getMessage());			
		}
	}

//	@PutMapping("/{id}")
//	public ResponseEntity<?> updateOrder(@PathVariable Integer id, @RequestBody OrderUpdateDTO orderUpdateDTO) {
//	    try {
//	        Supplier updatedOrder = orderService.updateOrder(id, orderUpdateDTO);
//	        return ResponseEntity.ok(updatedOrder);
//	    } catch (RuntimeException e) {
//	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found with ID: " + id);
//	    } catch (Exception e) {
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order");
//	    }
//	}	
}
