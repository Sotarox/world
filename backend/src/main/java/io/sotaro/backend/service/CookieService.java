package io.sotaro.backend.service;

import io.sotaro.backend.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    private final JwtUtil jwtUtil;

    public CookieService(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Value("${custom.cookie.secure:true}")
    private boolean isCookieSecure;

    public Cookie createJwtCookie(String token) {
        Cookie cookie = new Cookie("jwtToken", token);
        cookie.setHttpOnly(true);
        if (isCookieSecure) { cookie.setSecure(true);}
        cookie.setPath("/");
        // Align cookie max age with JWT expiration time (in seconds)
        cookie.setMaxAge(jwtUtil.getExpirationInSecond());
        return cookie;
    }

    public Cookie createLogoutJwtCookie(){
        return createLogoutCookie("jwtToken");
    }

    public Cookie createLogoutCSRFTokenCookie(){
        return createLogoutCookie("XSRF-TOKEN");
    }

    public Cookie createLogoutCookie(String cookieName) {
        Cookie cookie = new Cookie(cookieName, "");
        cookie.setHttpOnly(true);
        if (isCookieSecure) { cookie.setSecure(true); }
        cookie.setPath("/");
        cookie.setMaxAge(0);
        return cookie;
    }

}
