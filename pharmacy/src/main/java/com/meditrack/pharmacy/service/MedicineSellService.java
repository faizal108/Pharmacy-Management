package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.MedicineSell;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MedicineSellService {
    List<MedicineSell> getAllSells();

    MedicineSell addSellRecord(MedicineSell medicineSell);

    MedicineSell findSellRecordById(Long id);
}
