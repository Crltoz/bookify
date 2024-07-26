package dev.crltoz.bookify.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public JwtUtil(@Value("${JWT_SECRET_KEY}") String secretKey) {
        this.algorithm = Algorithm.HMAC256(secretKey);
        this.verifier = JWT.require(algorithm).build();
    }

    public String generateToken(String username, boolean isAdmin) {
        return JWT.create()
                .withSubject(username)
                .withClaim("isAdmin", isAdmin)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 24 hours
                .sign(algorithm);
    }

    public DecodedJWT extractClaims(String token) {
        try {
            return verifier.verify(token);
        } catch (Exception e) {
            return null;
        }
    }

    public boolean isTokenExpired(String token) {
        DecodedJWT claims = extractClaims(token);
        if (claims == null) {
            return true;
        }
        return claims.getExpiresAt().before(new Date());
    }

    public boolean isValidToken(String token) {
        return !isTokenExpired(token);
    }

    public boolean isAdmin(String token) {
        DecodedJWT claims = extractClaims(token);
        return isValidToken(token) && claims.getClaim("isAdmin").asBoolean();
    }
}