package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.model.Company;
import com.meditrack.pharmacy.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/company")
@CrossOrigin
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @PostMapping("/add")
    public ResponseEntity<Company> addCompany(@RequestBody Company company){
        return ResponseEntity.ok(companyService.addCompany(company));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        Company company = companyService.getCompanyById(id);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(company);
    }

    @GetMapping
    public ResponseEntity<List<Company>> getCompanys(){
        return ResponseEntity.ok(companyService.getAllCompanys());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company updateCompany){
        Company modifiedCompany = companyService.updateCompany(id, updateCompany);
        if(modifiedCompany == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modifiedCompany);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id){
        if(companyService.deleteCompany(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
