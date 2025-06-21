import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.util.Scanner;

public class DESCipher {

    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter your choice (encrypt or decrypt):");
        String choice = scanner.nextLine().toLowerCase();

        System.out.println("Enter the key (leave blank to generate a new key):");
        String keyInput = scanner.nextLine();

        byte[] key;
        if (keyInput.isEmpty()) {
            KeyGenerator keyGen = KeyGenerator.getInstance("DES");
            keyGen.init(56); 
            SecretKey secretKey = keyGen.generateKey();
            key = secretKey.getEncoded();
            System.out.println("Generated Key (Hex): " + bytesToHex(key));
        } else {
            key = hexStringToByteArray(keyInput);
            System.out.println("Using provided Key (Hex): " + bytesToHex(key));
        }

        if ("encrypt".equals(choice)) {
            System.out.println("Enter the text to be encrypted:");
            String text = scanner.nextLine();
            byte[] encryptedText = encrypt(text, key);
            String hexCiphertext = bytesToHex(encryptedText);
            String base64Ciphertext = Base64.getEncoder().encodeToString(encryptedText);
            System.out.println("Ciphertext (Hex): " + hexCiphertext);
            System.out.println("Ciphertext (Base64): " + base64Ciphertext);
        } else if ("decrypt".equals(choice)) {
            System.out.println("Enter the text to be decrypted (Base64):");
            String text = scanner.nextLine();
            byte[] encryptedText = Base64.getDecoder().decode(text);
            String decryptedText = decrypt(encryptedText, key);
            System.out.println("Decrypted Text: " + decryptedText);
        } else {
            System.out.println("Invalid choice. Please choose either 'encrypt' or 'decrypt'.");
        }
    }

    public static byte[] encrypt(String plainText, byte[] key) throws Exception {
        Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
        SecretKeySpec keySpec = new SecretKeySpec(key, "DES");
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);
        return cipher.doFinal(plainText.getBytes());
    }

    public static String decrypt(byte[] encryptedText, byte[] key) throws Exception {
        Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
        SecretKeySpec keySpec = new SecretKeySpec(key, "DES");
        cipher.init(Cipher.DECRYPT_MODE, keySpec);
        byte[] decryptedBytes = cipher.doFinal(encryptedText);
        return new String(decryptedBytes);
    }

    public static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02X", b));
        }
        return sb.toString();
    }

    public static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                                 + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }
}
