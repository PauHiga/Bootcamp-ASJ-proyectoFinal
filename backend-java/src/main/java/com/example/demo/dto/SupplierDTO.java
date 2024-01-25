package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {
    private Integer id;
    private String code;
    private String businessName;
    private String sectorName;
    private String urlLogo;
    private String cuit;
    private String vatConditionName;
    private String email;
    private String phone;
    private String web;
    private String addressStreet;
    private String addressNumber;
    private String addressPostalCode;
    private String countryCountry;
    private String provinceProvince;
    private String localityLocality;
    private String contactFirstName;
    private String contactLastName;
    private String contactEmail;
    private String contactPhone;
    private String contactRole;
    private boolean deleted;

    
}
