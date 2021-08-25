package com.hc.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hc.api.model.Customer;
import com.hc.api.repository.customer.CustomerRepositoryQuery;

public interface CustomerRepository extends JpaRepository<Customer, Long>, CustomerRepositoryQuery {

	
	
	
}
