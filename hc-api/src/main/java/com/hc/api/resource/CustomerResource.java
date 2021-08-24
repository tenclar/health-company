package com.hc.api.resource;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.hc.api.model.Customer;
import com.hc.api.repository.CustomerRepository;



@RestController
@RequestMapping("/customer")
public class CustomerResource {
	
	private CustomerRepository customerRepository;
	
	@GetMapping
	public List<Customer> list(){
		return customerRepository.findAll();
	}
}
