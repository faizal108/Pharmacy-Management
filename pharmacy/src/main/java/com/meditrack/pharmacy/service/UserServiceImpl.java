package com.meditrack.pharmacy.service;

import com.meditrack.pharmacy.InputModels.UserLoginModel;
import com.meditrack.pharmacy.InputModels.UserRegisterModel;
import com.meditrack.pharmacy.model.User;
import com.meditrack.pharmacy.repository.UserRepository;
import org.apache.shiro.crypto.hash.Sha256Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(UserRegisterModel userRegisterModel) {
        if(userRepository.existsByPhone(userRegisterModel.getPhone())){
            return null;
        }
        else{
            User user = new User();
            user.setUserName(userRegisterModel.getUsername());
            user.setPassword(userRegisterModel.getPassword());
            user.setPhone(userRegisterModel.getPhone());
            user.setRole(userRegisterModel.getRole());
            return userRepository.save(user);
        }
    }

    @Override
    public ResponseEntity<User> loginUser(UserLoginModel userLoginModel) {
        User existingUser = userRepository.findByPhone(userLoginModel.getPhone()).orElse(null);

        if (existingUser != null) {
            String salt = existingUser.getSalt();
            String userProvidedPassword = userLoginModel.getPassword();
            String hashedPassword = hashPassword(userProvidedPassword, salt);
            if (hashedPassword.equals(existingUser.getPassword()) && userLoginModel.getRole().equals(existingUser.getRole())) {
                return ResponseEntity.status(200).build();
            }
        }

        // Authentication failed
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<User> sendOtp(String phone) {
        return null;
    }


    /*-----------Private Area---------------*/
    private String hashPassword(String password, String salt) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String passwordWithSalt = password + salt;
            byte[] hash = digest.digest(passwordWithSalt.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                hexString.append(String.format("%02x", b));
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // Handle the exception appropriately
            return ""; // Return an empty string on error for security reasons
        }
    }



}
