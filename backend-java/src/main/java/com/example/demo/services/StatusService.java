package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Status;
import com.example.demo.repositories.StatusRepository;

@Service
public class StatusService {
	@Autowired
	StatusRepository statusRepository;
	
	public List<Status> getStatuses(){
		return statusRepository.findAll();
	}
	
	public Optional<Status> getStatusesById(int id) {
		return statusRepository.findById(id);
	}
	
	public Status createStatus(Status status) {
		statusRepository.save(status);
		return status;
	}
}
