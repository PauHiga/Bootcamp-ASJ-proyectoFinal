package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserDTO;
import com.example.demo.repositories.UserRepository;

@Service
public class LoginService {
	
	@Autowired
	UserRepository userRepository;
	
	public Boolean login(UserDTO userDTO) {
		return userRepository.findByPassword(userDTO.getPassword()).isPresent();
	}
}
