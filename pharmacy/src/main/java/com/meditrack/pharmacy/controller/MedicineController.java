package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    private int threshold = 5;

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }

    @PostMapping("/add")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine){
        return ResponseEntity.ok(medicineService.addMedicine(medicine));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable Long id) {
        Medicine medicine = medicineService.getMedicineById(id);
        if (medicine == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(medicine);
    }

    @GetMapping
    public ResponseEntity<List<Medicine>> getMedicines(){
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable Long id,@RequestBody Medicine updatedMedicine){
        Medicine modifiedMedicine = medicineService.updateMedicine(id,updatedMedicine);
        if(modifiedMedicine == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modifiedMedicine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable Long id){
        if(medicineService.deleteMedicine(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Set the stock limit if stock below this it shows in low stock section
    @PostMapping("/threshold/{threshold}")
    public ResponseEntity<Integer> updateThreshold(@PathVariable int threshold){
        setThreshold(threshold);
        return ResponseEntity.ok(getThreshold());
    }

    @GetMapping("/low-stock-medicines")
    public ResponseEntity<List<Medicine>> getLowStockMedicines(){
        return ResponseEntity.ok(medicineService.getLowStockMedicines(threshold));
    }

    @GetMapping("/expire-in-month")
    public ResponseEntity<List<Medicine>> getExpireInMonthMedicines(){
        return ResponseEntity.ok(medicineService.getExpireWarningInMonth());
    }

    @GetMapping("/expire-in/{month}")
    public ResponseEntity<List<Medicine>> getExpireMedicinesByMonth(@PathVariable int month){
        return ResponseEntity.ok(medicineService.getExipreMedicineByMonth(month));
    }

    @GetMapping("/expired")
    public ResponseEntity<List<Medicine>> getExpiredMedicine(){
        return ResponseEntity.ok(medicineService.getExpireMedicine());
    }
}
