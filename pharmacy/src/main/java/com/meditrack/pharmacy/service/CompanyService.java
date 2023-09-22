package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Company;

import java.util.List;

public interface CompanyService {
    Company addCompany(Company company);

    Company getCompanyById(Long id);

    List<Company> getAllCompanys();

    Company updateCompany(Long id, Company updateCompany);

    boolean deleteCompany(Long id);
}

