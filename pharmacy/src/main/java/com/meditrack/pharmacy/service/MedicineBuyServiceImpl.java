package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.MedicineBuy;
import com.meditrack.pharmacy.repository.MedicineBuyRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineBuyServiceImpl implements MedicineBuyService{

    @Autowired
    private MedicineBuyRepository medicineBuyRepository;

    @Override
    public List<MedicineBuy> getAllBuyedMedicines() {
        return medicineBuyRepository.findAll();
    }

    @Override
    public MedicineBuy addMedicinePurchase(MedicineBuy medicineBuy) {
        return medicineBuyRepository.save(medicineBuy);
    }

    @Override
    public MedicineBuy getRecordById(Long id) {
        MedicineBuy medicineBuy = medicineBuyRepository.findById(id).orElse(null);
        if(medicineBuy == null){
            throw new EntityNotFoundException("Record Not Found");
        }
        return medicineBuy;
    }

    @Override
    public List<MedicineBuy> getAllPaidRecord() {
        return medicineBuyRepository.findPaidRecord();
    }

    @Override
    public List<MedicineBuy> getAllNotPaidRecord() {
        return medicineBuyRepository.getAllNotPaidRecord();
    }
}
