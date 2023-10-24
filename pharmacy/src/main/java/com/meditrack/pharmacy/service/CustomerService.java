package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Customer;

import java.util.List;

public interface CustomerService {
    Customer addCustomer(Customer customer);

    Customer getCustomerById(Long id);

    List<Customer> getAllCustomers();

    Customer updateCustomer(Long id, Customer updatedCustomer);

    boolean deleteCustomer(Long id);
}
