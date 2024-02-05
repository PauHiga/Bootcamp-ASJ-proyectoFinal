package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CategoryDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.models.LoginResponse;
import com.example.demo.services.CategoryService;
import com.example.demo.services.LoginService;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	LoginService loginService;
	
	@PostMapping
	public ResponseEntity<Object> login(@RequestBody UserDTO userDTO) {
	    try {
	        if (loginService.login(userDTO)) {
	            return ResponseEntity.ok(new LoginResponse(true));
	        }
	        return ResponseEntity.status(403).body(new LoginResponse(false));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in login: " + e.getMessage());
	    }
	}
}
