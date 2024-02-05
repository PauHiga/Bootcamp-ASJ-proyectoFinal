package com.example.demo.services;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserDTO;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepository;

@Service
public class LoginService {
	
	@Autowired
	UserRepository userRepository;
	
	public boolean login(UserDTO userDTO) {
		Optional<User> user = userRepository.findByPassword(userDTO.getPassword());
		if(user.isPresent()) {
			return true;
		} else {
			return false;		
		}
	}
}
