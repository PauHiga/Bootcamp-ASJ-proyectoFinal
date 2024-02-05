package com.example.demo.models;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean status;
    private String message;
    private String username;
    
    public LoginResponse(boolean status, String message, String username) {
		super();
		this.status = status;
		this.message = message;
		this.username = username;
	} 
}