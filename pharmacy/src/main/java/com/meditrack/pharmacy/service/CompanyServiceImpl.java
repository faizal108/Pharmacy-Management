package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.exception.EntityAlreadyExist;
import com.meditrack.pharmacy.model.Company;
import com.meditrack.pharmacy.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    @Override
    public Company addCompany(Company company) {
        if(companyRepository.existsByCompanyNameAndPhone(company.getCompanyName(), company.getPhone())){
            throw new EntityAlreadyExist("Company Already Exist!!");
        }
        return companyRepository.save(company);
    }

    @Override
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElse(null);
    }

    @Override
    public List<Company> getAllCompanys() {
        return companyRepository.findAll();
    }

    @Override
    public Company updateCompany(Long id, Company updatedCompany) {
        Company currentCompany = companyRepository.findById(id).orElse(null);
        if(currentCompany != null){
            currentCompany.setCompanyName(updatedCompany.getCompanyName());
            currentCompany.setPhone(updatedCompany.getPhone());
            currentCompany.setEmail(updatedCompany.getEmail());
            currentCompany.setAddress(updatedCompany.getAddress());
            currentCompany.setStatus(updatedCompany.getStatus());
            currentCompany.setModifiedDate(LocalDate.now());
            return companyRepository.save(currentCompany);
        }
        return null;
    }

    @Override
    public boolean deleteCompany(Long id) {
        if(companyRepository.existsById(id)){
            companyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

