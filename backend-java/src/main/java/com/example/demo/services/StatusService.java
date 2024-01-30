package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Status;
import com.example.demo.repositories.StatusRepository;

@Service
public class StatusService {
	@Autowired
	StatusRepository statusRepository;
	
	public List<String> getStatus(){
		List<Status> listOfStatus = statusRepository.findAll();
        List<String> namesList = listOfStatus.stream()
                .map(Status::getName)
                .collect(Collectors.toList());
        return namesList;
	}
}
