package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.MedicineBuy;
import jdk.dynalink.linker.LinkerServices;

import java.util.List;

public interface MedicineBuyService {
    List<MedicineBuy> getAllBuyedMedicines();

    MedicineBuy addMedicinePurchase(MedicineBuy medicineBuy);
}
