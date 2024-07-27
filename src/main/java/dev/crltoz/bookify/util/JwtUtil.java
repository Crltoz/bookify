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

    private String getStringFromToken(String token) {
        // split token into parts
        String[] parts = token.split(" ");
        if (parts.length != 2) {
            return null;
        }

        return parts[1];
    }

    private DecodedJWT extractClaims(String token) {
        try {
            String tokenString = getStringFromToken(token);
            if (tokenString == null) {
                return null;
            }

            return verifier.verify(tokenString);
        } catch (Exception e) {
            return null;
        }
    }

    private boolean isTokenExpired(String token) {
        DecodedJWT claims = extractClaims(token);
        if (claims == null) {
            return true;
        }
        return claims.getExpiresAt().before(new Date());
    }

    public boolean isValidToken(String token) {
        String tokenString = getStringFromToken(token);
        if (tokenString == null) {
            return false;
        }

        return !isTokenExpired(token);
    }

    public boolean isAdmin(String token) {
        if (!isValidToken(token)) return false;

        DecodedJWT claims = extractClaims(token);
        return claims.getClaim("isAdmin").asBoolean();
    }
}