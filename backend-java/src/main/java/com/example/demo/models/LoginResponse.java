package com.example.demo.models;

public class LoginResponse {
    private boolean status;

    public LoginResponse(boolean status) {
        this.status = status;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}