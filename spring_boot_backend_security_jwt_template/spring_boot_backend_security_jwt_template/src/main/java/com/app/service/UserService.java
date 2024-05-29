 package com.app.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.model.AuthToken;
import com.app.model.User;
import com.app.repository.AuthTokenRepository;
import com.app.repository.UserRepository;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthTokenRepository authTokenRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String username, String password, String email) throws Exception {
        if (userRepository.findByUsername(username).isPresent() || userRepository.findByEmail(email).isPresent()) {
            throw new Exception("User already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);

        return userRepository.save(user);
    }

    public String loginUser(String username, String password) throws Exception {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            throw new Exception("Invalid username or password");
        }

        User user = userOpt.get();
        String token = generateToken();
        AuthToken authToken = new AuthToken();
        authToken.setUserId(user.getId());
        authToken.setToken(token);
        authToken.setCreatedAt(new Date());

        authTokenRepository.save(authToken);

        return token;
    }

    public Optional<User> getUserByToken(String token) {
        Optional<AuthToken> authTokenOpt = authTokenRepository.findByToken(token);
        if (authTokenOpt.isEmpty()) {
            return Optional.empty();
        }

        Long userId = authTokenOpt.get().getUserId();
        return userRepository.findById(userId);
    }

    private String generateToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[24];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getEncoder().encodeToString(tokenBytes);
    }
}

