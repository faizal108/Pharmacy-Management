package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Company;
import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.repository.CompanyRepository;
import com.meditrack.pharmacy.repository.MedicineRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.Integer.parseInt;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private CompanyRepository companyRepository;


    @Override
    public Medicine addMedicine(Medicine medicine) {

        Company company = companyRepository.findById((long) (medicine.getCompany().getCompanyID())).orElse(null);
        if(company == null){
            throw new EntityNotFoundException("Company Not Found");
        }
        medicine.setCompany(company);
        return medicineRepository.save(medicine);
    }

    @Override
    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id).orElse(null);
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {
        Medicine currentMedicine = medicineRepository.findById(id).orElse(null);
        if(currentMedicine != null){
            currentMedicine.setMedicineName(updatedMedicine.getMedicineName());
            currentMedicine.setCategory(updatedMedicine.getCategory());
            currentMedicine.setQuantity(updatedMedicine.getQuantity());
            currentMedicine.setBuyingPrice(updatedMedicine.getBuyingPrice());
            currentMedicine.setSellingPrice(updatedMedicine.getSellingPrice());
            currentMedicine.setExpirationDate(updatedMedicine.getExpirationDate());
            currentMedicine.setCompany(updatedMedicine.getCompany());
            return medicineRepository.save(currentMedicine);
        }
        return null;
    }

    @Override
    public boolean deleteMedicine(Long id) {
        if(medicineRepository.existsById(id)){
            medicineRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public List<Medicine> getLowStockMedicines(int threshold) {
        return medicineRepository.findMedicineByThreshold(threshold);
    }

    @Override
    public List<Medicine> getExpireWarningInMonth() {
        return medicineRepository.findMedicineNearToExpireInMonth();
    }

    @Override
    public List<Medicine> getExipreMedicineByMonth(int month) {
        return medicineRepository.getExpireMedicinesInMonth(month);
    }

    @Override
    public List<Medicine> getExpireMedicine() {
        return medicineRepository.findExpireMedicine();
    }

    @Override
    public Medicine updateStock(Long id, int stock) {
        Medicine medicine = medicineRepository.findById(id).orElse(null);
        if(medicine != null){
            medicine.setQuantity(medicine.getQuantity() + stock);
            updateMedicine(id, medicine);
        }
        return medicine;
    }
}

