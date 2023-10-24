package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.service.MedicineSellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medicine-sell")
public class MedicineSellController {

    @Autowired
    MedicineSellService medicineSellService;
}
