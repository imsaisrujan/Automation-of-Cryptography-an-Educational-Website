import java.security.*;
import java.security.spec.*;
import java.util.Base64;
import java.util.Scanner;

public class ECCCipher {

    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter your choice (sign or verify):");
        String choice = scanner.nextLine().toLowerCase();

        // Generate ECC key pair
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("EC");
        keyGen.initialize(new ECGenParameterSpec("secp256r1"));
        KeyPair keyPair = keyGen.generateKeyPair();
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();

        System.out.println("Generated Public Key (Base64): " + Base64.getEncoder().encodeToString(publicKey.getEncoded()));
        System.out.println("Generated Private Key (Base64): " + Base64.getEncoder().encodeToString(privateKey.getEncoded()));

        if ("sign".equals(choice)) {
            System.out.println("Enter the text to be signed:");
            String text = scanner.nextLine();
            byte[] signature = sign(text, privateKey);
            String base64Signature = Base64.getEncoder().encodeToString(signature);
            System.out.println("Signature (Base64): " + base64Signature);
        } else if ("verify".equals(choice)) {
            System.out.println("Enter the text:");
            String text = scanner.nextLine();
            System.out.println("Enter the signature (Base64):");
            String signatureString = scanner.nextLine();
            byte[] signature = Base64.getDecoder().decode(signatureString);
            boolean isValid = verify(text, signature, publicKey);
            System.out.println("Signature is " + (isValid ? "valid" : "invalid"));
        } else {
            System.out.println("Invalid choice. Please choose either 'sign' or 'verify'.");
        }
    }

    public static byte[] sign(String text, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withECDSA");
        signature.initSign(privateKey);
        signature.update(text.getBytes());
        return signature.sign();
    }

    public static boolean verify(String text, byte[] signature, PublicKey publicKey) throws Exception {
        Signature sig = Signature.getInstance("SHA256withECDSA");
        sig.initVerify(publicKey);
        sig.update(text.getBytes());
        return sig.verify(signature);
    }
}
