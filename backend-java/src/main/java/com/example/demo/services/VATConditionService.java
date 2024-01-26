package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.VATCondition;
import com.example.demo.repositories.VATConditionRepository;

@Service
public class VATConditionService {
	@Autowired
	VATConditionRepository vatConditionRepository;
	
	public List<String> getVATConditions(){
		List<VATCondition> listOfVAT = vatConditionRepository.findAll();
        List<String> namesList = listOfVAT.stream()
                .map(VATCondition::getName)
                .collect(Collectors.toList());
        return namesList;
	}
	
	public Optional<VATCondition> getVATConditionesById(int id) {
		return vatConditionRepository.findById(id);
	}
	
	public VATCondition createVATCondition(VATCondition vatCondition) {
		vatConditionRepository.save(vatCondition);
		return vatCondition;
	}
}
