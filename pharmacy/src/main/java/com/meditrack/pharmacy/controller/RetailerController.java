package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.model.Retailer;
import com.meditrack.pharmacy.service.RetailerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/retailers")
public class RetailerController {
    @Autowired
    private RetailerService retailerService;

    @PostMapping("/add")
    public ResponseEntity<Retailer> addRetailer(@RequestBody Retailer retailer){
        return ResponseEntity.ok(retailerService.addRetailer(retailer));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Retailer> getRetailerById(@PathVariable Long id) {
        Retailer retailer = retailerService.getRetailerById(id);
        if (retailer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(retailer);
    }

    @GetMapping
    public ResponseEntity<List<Retailer>> getRetailers(){
        return ResponseEntity.ok(retailerService.getAllRetailers());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Retailer> updateRetailer(@PathVariable Long id,@RequestBody Retailer updateRetailer){
        Retailer modifiedRetailer = retailerService.updateRetailer(id,updateRetailer);
        if(modifiedRetailer == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(modifiedRetailer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRetailer(@PathVariable Long id){
        if(retailerService.deleteRetailer(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
