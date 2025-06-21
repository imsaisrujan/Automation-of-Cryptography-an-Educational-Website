import java.util.Random;
import java.util.Scanner;

public class OneTImePadCipher 
{

    public static String generateKey(int length) 
    {
        Random random = new Random();
        StringBuilder key = new StringBuilder(length);
        for (int i = 0; i < length; i++) 
        {
            char randomChar = (char) (random.nextInt(26) + 'A');
            key.append(randomChar);
        }
        return key.toString();
    }

    public static String encrypt(String plaintext, String key) 
    {
        StringBuilder ciphertext = new StringBuilder(plaintext.length());
        for (int i = 0; i < plaintext.length(); i++) 
        {
            char encryptedChar = (char) (((plaintext.charAt(i) - 'A') + (key.charAt(i) - 'A')) % 26 + 'A');
            ciphertext.append(encryptedChar);
        }
        return ciphertext.toString();
    }

    public static String decrypt(String ciphertext, String key) 
    {
        StringBuilder plaintext = new StringBuilder(ciphertext.length());
        for (int i = 0; i < ciphertext.length(); i++) 
        {
            char decryptedChar = (char) (((ciphertext.charAt(i) - 'A') - (key.charAt(i) - 'A') + 26) % 26 + 'A');
            plaintext.append(decryptedChar);
        }
        return plaintext.toString();
    }

    public static void main(String[] args) 
    {
        Scanner sc = new Scanner(System.in);

        System.out.println("Enter your choice (encrypt or decrypt):");
        String choice = sc.nextLine().toLowerCase();
        if ("encrypt".equals(choice))
        {
            System.out.println("Enter the plaintext:");
            String plaintext = sc.nextLine().toUpperCase();

            String key = generateKey(plaintext.length());
            System.out.println("Generated Key: " + key);

            String ciphertext = encrypt(plaintext, key);
            System.out.println("Encrypted Text: " + ciphertext);
        }
        else if ("decrypt".equals(choice))
        {
            System.out.println("Enter the ciphertext:");
            String plaintext = sc.nextLine().toUpperCase();

            System.out.println("Enter the Key:");
            String key = sc.nextLine().toUpperCase();

            String decryptedText = decrypt(plaintext, key);
            System.out.println("Decrypted Text: " + decryptedText);
        }

    }
}

