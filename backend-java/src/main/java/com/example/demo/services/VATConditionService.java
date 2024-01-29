package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.models.Vat_condition;
import com.example.demo.repositories.VATConditionRepository;

@Service
public class VATConditionService {
	@Autowired
	VATConditionRepository vatConditionRepository;
	
	public List<String> getVATConditions(){
		List<Vat_condition> listOfVAT = vatConditionRepository.findAll();
        List<String> namesList = listOfVAT.stream()
                .map(Vat_condition::getName)
                .collect(Collectors.toList());
        return namesList;
	}
	
	public Optional<Vat_condition> getVATConditionesById(int id) {
		return vatConditionRepository.findById(id);
	}
	
	public Vat_condition createVATCondition(Vat_condition vatCondition) {
		vatConditionRepository.save(vatCondition);
		return vatCondition;
	}
}
