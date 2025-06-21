import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.Cipher;
import java.util.Base64;
import java.util.Scanner;

public class RSACipher {

    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter your choice (encrypt or decrypt):");
        String choice = scanner.nextLine().toLowerCase();

        // Generate RSA key pair
        KeyPairGenerator keyPairGen = KeyPairGenerator.getInstance("RSA");
        keyPairGen.initialize(2048);
        KeyPair keyPair = keyPairGen.generateKeyPair();
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();

        System.out.println("Generated Public Key (Base64): " + Base64.getEncoder().encodeToString(publicKey.getEncoded()));
        System.out.println("Generated Private Key (Base64): " + Base64.getEncoder().encodeToString(privateKey.getEncoded()));

        if ("encrypt".equals(choice)) {
            System.out.println("Enter the text to be encrypted:");
            String text = scanner.nextLine();
            byte[] encryptedText = encrypt(text, publicKey);
            String base64Ciphertext = Base64.getEncoder().encodeToString(encryptedText);
            System.out.println("Ciphertext (Base64): " + base64Ciphertext);
        } else if ("decrypt".equals(choice)) {
            System.out.println("Enter the text to be decrypted (Base64):");
            String text = scanner.nextLine();
            byte[] encryptedText = Base64.getDecoder().decode(text);
            String decryptedText = decrypt(encryptedText, privateKey);
            System.out.println("Decrypted Text: " + decryptedText);
        } else {
            System.out.println("Invalid choice. Please choose either 'encrypt' or 'decrypt'.");
        }
    }

    public static byte[] encrypt(String plainText, PublicKey publicKey) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(plainText.getBytes());
    }

    public static String decrypt(byte[] encryptedText, PrivateKey privateKey) throws Exception {
        Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] decryptedBytes = cipher.doFinal(encryptedText);
        return new String(decryptedBytes);
    }
}
