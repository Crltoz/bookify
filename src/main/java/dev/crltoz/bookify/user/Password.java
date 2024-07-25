package dev.crltoz.bookify.user;

import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import static org.junit.Assert.*;

public class Password {

    private static final Logger LOGGER = LoggerFactory.getLogger(Password.class);

    public static byte[] hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        return md.digest(password.getBytes());
    }

    public static boolean verifyPassword(String password, byte[] storedHash) throws NoSuchAlgorithmException {
        byte[] newHash = hashPassword(password);
        return Arrays.equals(newHash, storedHash);
    }

    @Test
    public void testCorrectPassword() {
        try {
            String password = "safePassword4321";
            byte[] hash = hashPassword(password);

            assertTrue(verifyPassword("safePassword4321", hash));
        } catch (NoSuchAlgorithmException e) {
            LOGGER.error("NoSuchAlgorithmException was thrown in testCorrectPassword", e);
            fail("NoSuchAlgorithmException was thrown in testCorrectPassword");
        }
    }

    @Test
    public void testIncorrectPassword() {
        try {
            String password = "safePassword4321";
            byte[] hash = hashPassword(password);

            assertFalse(verifyPassword("incorrectPassword4321", hash));
        } catch (NoSuchAlgorithmException e) {
            LOGGER.error("NoSuchAlgorithmException was thrown in testIncorrectPassword", e);
            fail("NoSuchAlgorithmException was thrown in testIncorrectPassword");
        }
    }
}
