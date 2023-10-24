package com.meditrack.pharmacy.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Retailer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long retailerID;
    private String retailerName;
    private String phone;
    private String address;
    private Integer amountPending;

    public Long getRetailerID() {
        return retailerID;
    }

    public void setRetailerID(Long retailerID) {
        this.retailerID = retailerID;
    }

    public String getRetailerName() {
        return retailerName;
    }

    public void setRetailerName(String retailerName) {
        this.retailerName = retailerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getAmountPending() {
        return amountPending;
    }

    public void setAmountPending(Integer amountPending) {
        this.amountPending = amountPending;
    }
}
