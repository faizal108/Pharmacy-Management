package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.model.Medicine;
import com.meditrack.pharmacy.model.MedicineSell;
import com.meditrack.pharmacy.service.MedicineSellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sell")
@CrossOrigin
public class MedicineSellController {

    @Autowired
    MedicineSellService medicineSellService;

    @GetMapping("/getall")
    public ResponseEntity<List<MedicineSell>> getAllSells(){
        return ResponseEntity.ok(medicineSellService.getAllSells());
    }

    @PostMapping("/add")
    public ResponseEntity<MedicineSell> addSellingRecord(@RequestBody MedicineSell medicineSell){
        return ResponseEntity.ok(medicineSellService.addSellRecord(medicineSell));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineSell> findSellReccordById(@PathVariable Long id){
        return ResponseEntity.ok(medicineSellService.findSellRecordById(id));
    }
}
