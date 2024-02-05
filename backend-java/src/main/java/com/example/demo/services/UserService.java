package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserDTO;
import com.example.demo.models.User;
import com.example.demo.models.Vat_condition;
import com.example.demo.repositories.UserRepository;
import com.example.demo.repositories.VATConditionRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userRepository;
	
	public List<User> getUsers(){
		List<User> users = userRepository.findAll();
        return users;
	}
	
//	public Optional<User> getUserById(int id) {
//		return userRepository.findById(id);
//	}
	
	public String createUser(UserDTO userDTO) {
		User newUser = new User();
		newUser.setName(userDTO.getName());
		newUser.setPassword(userDTO.getPassword());
		return userRepository.save(newUser).getName();
	}

}
