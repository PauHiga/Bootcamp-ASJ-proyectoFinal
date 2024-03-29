package com.example.demo.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderCreateDTO;
import com.example.demo.dto.OrderUpdateDTO;
import com.example.demo.models.Order;
import com.example.demo.services.OrderService;

import jakarta.validation.Valid;

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
	
    @GetMapping("/count")
    public ResponseEntity<Long> countEntities(
    	@RequestParam(name = "deleted", required = false, defaultValue = "false") Boolean deleted) {
        long count;
        if (deleted != null && deleted) {
            count = orderService.countByDeletedTrue();
        } else if (deleted != null && !deleted) {
            count = orderService.countByDeletedFalse();
        } else {
            count = orderService.count();
        }
        return ResponseEntity.ok(count);
    }
	
	@PostMapping()
	public ResponseEntity<Object> createOrder(@Valid @RequestBody OrderCreateDTO orderCreateDTO, BindingResult bindingResult){
		if(bindingResult.hasErrors()) {
			Map<String, String> errors = new HashMap<>();
			bindingResult.getFieldErrors().forEach((error)->{
				String campo = error.getField();
				String errMsj = error.getDefaultMessage();
				errors.put(campo, errMsj);
			});
			System.out.println(errors);
			return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
		}
		List<OrderCreateDTO> orderCreateDTOList = List.of(orderCreateDTO);
		try {
			Order createdOrder = orderService.createOrders(orderCreateDTOList).get(0);
			return ResponseEntity.ok(createdOrder);
		} catch (DataIntegrityViolationException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating order: Duplicate order number");
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order: " + e.getMessage());			
		}
	}

	@PostMapping("/batch")
	public ResponseEntity<Object> createOrders(@RequestBody List<OrderCreateDTO> orderCreateDTOList) {
	    try {
	        return ResponseEntity.ok(orderService.createOrders(orderCreateDTOList));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error creating orders: " + e.getMessage());
	    }
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateOrder(@PathVariable Integer id, @RequestBody OrderUpdateDTO orderUpdateDTO) {
	    try {
	        Order updatedOrder = orderService.updateOrder(id, orderUpdateDTO);
	        return ResponseEntity.ok(updatedOrder);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found with ID: " + id);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order");
	    }
	}	
}
