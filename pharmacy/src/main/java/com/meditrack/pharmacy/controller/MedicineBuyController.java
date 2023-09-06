package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.model.MedicineBuy;
import com.meditrack.pharmacy.model.Retailer;
import com.meditrack.pharmacy.service.MedicineBuyService;
import com.meditrack.pharmacy.service.MedicineService;
import com.meditrack.pharmacy.service.RetailerService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase")
public class MedicineBuyController {

    @Autowired
    MedicineBuyService medicineBuyService;
    @Autowired
    MedicineService medicineService;
    @Autowired
    RetailerService retailerService;

    @GetMapping("/all")
    public ResponseEntity<List<MedicineBuy>> getAllPurchase(){
        return ResponseEntity.ok(medicineBuyService.getAllBuyedMedicines());
    }

    @PostMapping("/add")
    public ResponseEntity<MedicineBuy> addPurchase(@RequestBody MedicineBuy medicineBuy){
        Medicine medicine = medicineService.getMedicineById(medicineBuy.getMedicine().getMedicineID());
        Retailer retailer = retailerService.getRetailerById(medicineBuy.getRetailer().getRetailerID());

        if(medicine == null || retailer == null){
            throw new EntityNotFoundException("medicine or retailer not found!!");
        }
        medicineBuy.setMedicine(medicine);
        medicineBuy.setRetailer(retailer);
        MedicineBuy newPurchase = medicineBuyService.addMedicinePurchase(medicineBuy);

        return ResponseEntity.ok(newPurchase);
    }
}
