package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;


    @Override
    public Medicine addMedicine(Medicine medicine) {
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
            currentMedicine.setPrice(updatedMedicine.getPrice());
            currentMedicine.setStockQuantity(updatedMedicine.getStockQuantity());
            currentMedicine.setExpirationDate(updatedMedicine.getExpirationDate());
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
}

