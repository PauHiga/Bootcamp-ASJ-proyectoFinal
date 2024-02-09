package com.example.demo.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserDTO;
import com.example.demo.models.LoginResponse;
import com.example.demo.services.LoginService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	LoginService loginService;
	
	@PostMapping
	public ResponseEntity<?> login(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) {
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
	    try {
	        if (loginService.login(userDTO)) {
	            return ResponseEntity.ok(new LoginResponse(true, "Login Successful", "Admin"));
	        }
	        return ResponseEntity.status(403).body(new LoginResponse(false, "Wrong email or password", "Unauthorized user"));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new LoginResponse(false, "Error in login: " + e.getMessage(), "Unauthorized user"));
	    }
	}
}
