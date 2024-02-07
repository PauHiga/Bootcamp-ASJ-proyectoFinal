package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Status;
import com.example.demo.repositories.StatusRepository;

import jakarta.transaction.Transactional;

@Service
public class StatusService {
	@Autowired
	StatusRepository statusRepository;
	
	public List<Status> getStatus(){
		return statusRepository.findAll();
	}

	public Status getStatusById(int statusId){
        return statusRepository.findById(statusId)
                .orElseThrow(() -> new RuntimeException("Status not found with id: " + statusId));
	}

	
	public Status getStatusByName(String name){
		Optional<Status> optionalStatus = statusRepository.findByName(name);
	    if (optionalStatus.isEmpty()) {
	        throw new RuntimeException("Status not found");
	    } else {
	    	return optionalStatus.get();
	    }
	}
	
	public Status getDefaultStatus(){
		Optional<List<Status>> optionalStatus = statusRepository.findDefaultState();
	    if (optionalStatus.isEmpty()) {
	        return this.getStatusById(1);
	    } else {
	    	return optionalStatus.get().get(0);
	    }
	}
    
    @Transactional	
	public Status updateDefaultStatus(int statusId) {
    	Status newDefaultStatus = this.getStatusById(statusId);
        newDefaultStatus.setDefault_status(true);
        statusRepository.save(newDefaultStatus);

        List<Status> allStatuses = statusRepository.findAll();
        for (Status status : allStatuses) {
            if (!status.getId().equals(statusId)) {
                status.setDefault_status(false);
                statusRepository.save(status);
            }
        }
        return newDefaultStatus;
	}
}
