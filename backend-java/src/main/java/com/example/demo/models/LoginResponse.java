package com.example.demo.models;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean status;
    private String message;
    
    public LoginResponse(boolean status, String message) {
		super();
		this.status = status;
		this.message = message;
	}

    public void setStatusMessage(boolean status, String message) {
        this.status = status;
		this.message = message;
    }
    
    
}