package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.InputModels.UserLoginModel;
import com.meditrack.pharmacy.InputModels.UserRegisterModel;
import com.meditrack.pharmacy.model.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    User registerUser(UserRegisterModel userRegisterModel);

    ResponseEntity<User> loginUser(UserLoginModel userLoginModel);

    ResponseEntity<User> sendOtp(String phone);
}
