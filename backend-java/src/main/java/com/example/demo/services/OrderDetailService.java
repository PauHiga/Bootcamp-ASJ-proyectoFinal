package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.OrderDetail;
import com.example.demo.repositories.OrderDetailRepository;

@Service
public class OrderDetailService {
	@Autowired
	OrderDetailRepository orderDetailRepository;
	
	public List<OrderDetail> getOrderDetailes(){
		return orderDetailRepository.findAll();
	}
	
	public Optional<OrderDetail> getOrderDetailesById(int id) {
		return orderDetailRepository.findById(id);
	}
	
	public OrderDetail createOrderDetail(OrderDetail orderDetail) {
		orderDetailRepository.save(orderDetail);
		return orderDetail;
	}
}
