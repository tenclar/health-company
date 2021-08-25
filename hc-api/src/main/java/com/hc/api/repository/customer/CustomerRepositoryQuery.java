package com.hc.api.repository.customer;

import java.util.List;

import com.hc.api.model.Customer;
import com.hc.api.repository.filter.EntityFilter;

public interface CustomerRepositoryQuery  {
 public List<Customer> filter(EntityFilter customerFilter);
}
