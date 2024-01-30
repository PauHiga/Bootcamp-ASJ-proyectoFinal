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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderCreateDTO;
import com.example.demo.dto.OrderDetailDTO;
import com.example.demo.dto.SupplierDTO;
import com.example.demo.dto.SupplierUpdateDTO;
import com.example.demo.models.Order;
import com.example.demo.models.OrderDetail;
import com.example.demo.models.Supplier;
import com.example.demo.services.OrderDetailService;
import com.example.demo.services.OrderService;
import com.example.demo.services.SupplierService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/order-details")
public class OrderDetailController {
	
	@Autowired
	OrderDetailService orderDetailService;

	@GetMapping()
	public ResponseEntity<List<OrderDetail>> getSupplier(){
		return ResponseEntity.ok(orderDetailService.getOrderDetails());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Integer id){
		Optional<OrderDetail> optionalOrderDetail = orderDetailService.getOrderDetailById(id);
		if (optionalOrderDetail.isPresent()) {
			return ResponseEntity.ok(optionalOrderDetail.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
//	@PostMapping()
//	public ResponseEntity<Object> createOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO){
//		try {
//			return ResponseEntity.ok(orderDetailService.createOrderDetail(orderDetailDTO));
//		}
//		catch(Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order detail: " + e.getMessage());			
//		}
//	}
	
	@PostMapping("/batch")
	public ResponseEntity<Object> createOrderDetails(@RequestBody List<OrderDetailDTO> orderDetailDTOList){
		try {
			return ResponseEntity.ok(orderDetailService.createOrderDetails(orderDetailDTOList));
		}
		catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating order details: " + e.getMessage());			
		}
	}

}
