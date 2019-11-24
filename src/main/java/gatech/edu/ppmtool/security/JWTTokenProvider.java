package gatech.edu.ppmtool.security;

import gatech.edu.ppmtool.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTTokenProvider {
    private final long EXPIRATION_PERIOD = 300000;
    public String generateToken(Authentication auth) {
        Date issueAt = new Date(System.currentTimeMillis());
        User user = (User) auth.getPrincipal();
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("password", user.getPassword());
        claims.put("fullUserName", user.getFullUserName());
        return Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setClaims(claims)
                .setIssuedAt(issueAt)
                .setExpiration(new Date(issueAt.getTime() + EXPIRATION_PERIOD))
                .signWith(Keys.secretKeyFor(SignatureAlgorithm.HS512), SignatureAlgorithm.HS512)
                .compact();
    }
}
