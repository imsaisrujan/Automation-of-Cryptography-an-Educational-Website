import java.util.Arrays;
import java.util.Scanner;

public class DoubleColumnarTranspositionCipher {

    private static String columnarTransposition(String text, String key) {
        int numRows = (int) Math.ceil((double) text.length() / key.length());
        char[][] grid = new char[numRows][key.length()];


        int k = 0;
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < key.length(); j++) {
                if (k < text.length()) {
                    grid[i][j] = text.charAt(k++);
                } else {
                    grid[i][j] = 'X'; 
                }
            }
        }

        char[] sortedKey = key.toCharArray();
        Arrays.sort(sortedKey);

        StringBuilder cipherText = new StringBuilder();
        for (char c : sortedKey) {
            int col = key.indexOf(c);
            for (int i = 0; i < numRows; i++) {
                cipherText.append(grid[i][col]);
            }
        }

        return cipherText.toString();
    }

    private static String columnarTranspositionDecrypt(String cipherText, String key) {
        int numRows = (int) Math.ceil((double) cipherText.length() / key.length());
        char[][] grid = new char[numRows][key.length()];

        char[] sortedKey = key.toCharArray();
        Arrays.sort(sortedKey);

        int k = 0;
        for (char c : sortedKey) {
            int col = key.indexOf(c);
            for (int i = 0; i < numRows; i++) {
                grid[i][col] = cipherText.charAt(k++);
            }
        }

        StringBuilder plainText = new StringBuilder();
        for (int i = 0; i < numRows; i++) {
            for (int j = 0; j < key.length(); j++) {
                plainText.append(grid[i][j]);
            }
        }

        return plainText.toString();
    }

    public static String doubleColumnarTranspositionEncrypt(String text, String key1, String key2) {
 
        String firstPass = columnarTransposition(text, key1);

        return columnarTransposition(firstPass, key2);
    }

 
    public static String doubleColumnarTranspositionDecrypt(String cipherText, String key1, String key2) {
 
        String firstPass = columnarTranspositionDecrypt(cipherText, key2);

        return columnarTranspositionDecrypt(firstPass, key1);
    }

    public static void main(String[] args) {
        System.out.println("Enter your choice (encrypt or decrypt):");
        Scanner sc = new Scanner(System.in);
        String keychoice = (sc.nextLine()).toLowerCase();

        System.out.println("Enter the text :");
        String text = sc.nextLine();

        System.out.println("Enter the first key:");
        String key1 = sc.nextLine();

        System.out.println("Enter the second key:");
        String key2 = sc.nextLine();

        if ("encrypt".equals(keychoice)) 
        {
            String encrypted = doubleColumnarTranspositionEncrypt(text, key1, key2);
            System.out.println("Encrypted Text: " + encrypted);
        }

        else if ("decrypt".equals(keychoice)) 
        {
        String decrypted = doubleColumnarTranspositionDecrypt(text, key1, key2);
        System.out.println("Decrypted Text: " + decrypted);
        }

    }
}
