package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.services.VATConditionService;

@RestController
@RequestMapping("/vat-conditions")
public class VATConditionController {
	
	@Autowired
	VATConditionService vatConditionService;

	@GetMapping()
	public ResponseEntity<List<String>> getSectors(){
		return ResponseEntity.ok(vatConditionService.getVATConditions());
	}
	
}