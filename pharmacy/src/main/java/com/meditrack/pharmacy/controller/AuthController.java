package com.meditrack.pharmacy.controller;

import com.meditrack.pharmacy.InputModels.UserLoginModel;
import com.meditrack.pharmacy.InputModels.UserRegisterModel;
import com.meditrack.pharmacy.model.User;
import com.meditrack.pharmacy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @RequestMapping("/register")
    public ResponseEntity<UserRegisterModel> register(@RequestBody UserRegisterModel userRegisterModel){
        if(userService.registerUser(userRegisterModel) != null){
            return ResponseEntity.status(200).build();
        }else{
            return ResponseEntity.noContent().build();
        }
    }

    @RequestMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserLoginModel userLoginModel){
        return userService.loginUser(userLoginModel);
    }

    @RequestMapping("/sendotp")
    public ResponseEntity<User> sendOtp(@PathVariable String phone){
        return userService.sendOtp(phone);
    }

}
