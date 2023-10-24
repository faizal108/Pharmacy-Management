package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.MedicineBuy;
import com.meditrack.pharmacy.repository.MedicineBuyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
        medicineBuy.setSupplyDate(LocalDate.now());
        return medicineBuyRepository.save(medicineBuy);
    }
}
