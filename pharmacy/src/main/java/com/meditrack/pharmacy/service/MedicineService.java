package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.model.Medicine;

import java.util.List;

public interface MedicineService {

    Medicine addMedicine(Medicine medicine);

    Medicine getMedicineById(Long id);

    List<Medicine> getAllMedicines();

    Medicine updateMedicine(Long id, Medicine updateMedicine);

    boolean deleteMedicine(Long id);

    List<Medicine> getLowStockMedicines(int threshold);
    List<Medicine> getExpireWarningInMonth();

    List<Medicine> getExipreMedicineByMonth(int month);

    List<Medicine> getExpireMedicine();

    Medicine updateStock(Long id, int stock);
}
