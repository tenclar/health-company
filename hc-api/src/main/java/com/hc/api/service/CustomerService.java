package com.hc.api.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hc.api.model.Customer;
import com.hc.api.repository.CustomerRepository;


@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;

	public Customer update(Long id, Customer customer) {
		Customer customerSalva = customerRepository.findById(id).orElse(null);			
		
		BeanUtils.copyProperties(customer, customerSalva, "id");
		return customerRepository.save(customerSalva);
	}
	
}

