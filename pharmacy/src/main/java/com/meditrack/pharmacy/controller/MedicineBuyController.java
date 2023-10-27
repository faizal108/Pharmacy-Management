package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.model.MedicineBuy;
import com.meditrack.pharmacy.model.Company;
import com.meditrack.pharmacy.service.MedicineBuyService;
import com.meditrack.pharmacy.service.MedicineService;
import com.meditrack.pharmacy.service.CompanyService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase")
@CrossOrigin
public class MedicineBuyController {

    @Autowired
    MedicineBuyService medicineBuyService;
    @Autowired
    MedicineService medicineService;
    @Autowired
    CompanyService companyService;

    @GetMapping("/all")
    public ResponseEntity<List<MedicineBuy>> getAllPurchase(){
        return ResponseEntity.ok(medicineBuyService.getAllBuyedMedicines());
    }

    @PostMapping("/add")
    public ResponseEntity<MedicineBuy> addPurchase(@RequestBody MedicineBuy medicineBuy){
        Company company = companyService.getCompanyById(medicineBuy.getCompany().getCompanyID());

        if(company == null){
            throw new EntityNotFoundException("Company Not Found!!");
        }
        medicineBuy.setCompany(company);
        MedicineBuy newPurchase = medicineBuyService.addMedicinePurchase(medicineBuy);

        return ResponseEntity.ok(newPurchase);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineBuy> getRecordById(@PathVariable Long id){
        return ResponseEntity.ok(medicineBuyService.getRecordById(id));
    }

    @GetMapping("/paidRecord")
    public ResponseEntity<List<MedicineBuy>> getAllPaidRecord(){
        return ResponseEntity.ok(medicineBuyService.getAllPaidRecord());
    }

    @GetMapping("/notPaidRecord")
    public ResponseEntity<List<MedicineBuy>> getAllNotPaidRecord(){
        return ResponseEntity.ok(medicineBuyService.getAllNotPaidRecord());
    }
}
