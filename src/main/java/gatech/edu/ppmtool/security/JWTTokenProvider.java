package gatech.edu.ppmtool.security;

import gatech.edu.ppmtool.domain.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JWTTokenProvider {
    private final long EXPIRATION_PERIOD = 300000;
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public String generateToken(Authentication auth) {
        Date issueAt = new Date(System.currentTimeMillis());
        User user = (User) auth.getPrincipal();
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());
        claims.put("password", user.getPassword());
        claims.put("fullUserName", user.getFullUserName());
        return Jwts.builder()
                .setSubject(String.valueOf(user.getId()))
                .setClaims(claims)
                .setIssuedAt(issueAt)
                .setExpiration(new Date(issueAt.getTime() + EXPIRATION_PERIOD))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJwt(token);
            return true;
        } catch (SignatureException e1) {
            System.out.println("Invalid signature");
        } catch (MalformedJwtException e2) {
            System.out.println("Malformed JWT token");
        } catch (ExpiredJwtException e3) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException e4) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException e5) {
            System.out.println("JWT token should not be empty");
        }
        return false;
    }

    public Long getUserId(String token) {
        Jwt jwt = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJwt(token);
        Claims claims = (Claims) jwt.getBody();
        String idStr = (String) claims.get("id");
        return Long.parseLong(idStr);
    }
}
