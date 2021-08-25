package com.hc.api.repository.customer;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import com.hc.api.model.Customer;
import com.hc.api.repository.filter.EntityFilter;

public class CustomerRepositoryImpl implements CustomerRepositoryQuery {

	@PersistenceContext
	private EntityManager manager;

	@Override
	public List<Customer> filter(EntityFilter customerFilter) {
		CriteriaBuilder builder = manager.getCriteriaBuilder();
		CriteriaQuery<Customer> criteria = builder.createQuery(Customer.class);

		Root<Customer> root = criteria.from(Customer.class);

		Predicate[] predicates = createWhere(customerFilter, builder, root);
		criteria.where(predicates);

		TypedQuery<Customer> query = manager.createQuery(criteria);
		return query.getResultList();
	}

	private Predicate[] createWhere(EntityFilter customerFilter, CriteriaBuilder builder, Root<Customer> root) {

		List<Predicate> predicates = new ArrayList<>();

		if (customerFilter.getNome() != null) {
			predicates.add(
					builder.like(builder.lower(root.get("nome")), "%" + customerFilter.getNome().toLowerCase() + "%"));
		}

		return predicates.toArray(new Predicate[predicates.size()]);
	}

}
