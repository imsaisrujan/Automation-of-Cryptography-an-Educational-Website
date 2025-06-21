import java.util.*;
import java.math.BigInteger;

class Determinant 
{
    static int determinant(int[][] matrix) 
    {
        int determinant = 0;
        if (matrix.length == 1) 
        {
            return matrix[0][0];
        } 
        else if (matrix.length == 2) 
        {
            return (matrix[0][0] * matrix[1][1]) - (matrix[0][1] * matrix[1][0]);
        } 
        else {
            for (int i = 0; i < matrix[0].length; i++) 
            {
                int[][] subMatrix = new int[matrix.length - 1][matrix[0].length - 1];
                for (int m = 1; m < matrix.length; m++) 
                {
                    for (int n = 0; n < matrix[m].length; n++) 
                    {
                        if (n < i) 
                        {
                            subMatrix[m - 1][n] = matrix[m][n];
                        } 
                        else if (n > i) 
                        {
                            subMatrix[m - 1][n - 1] = matrix[m][n];
                        }
                    }
                }
                determinant += Math.pow(-1.0, 1.0 + i + 1.0) * matrix[0][i] * determinant(subMatrix);
            }
        }
        return determinant;
    }
}

class InverseMatrix 
{
    static int[][] inverse(int[][] matrix) 
    {
        int determinant = Determinant.determinant(matrix);
        int determinantMod26 = Math.floorMod(determinant, 26);
        int inverseDeterminant = BigInteger.valueOf(determinantMod26).modInverse(BigInteger.valueOf(26)).intValue();

        int[][] adjoint = new int[matrix.length][matrix[0].length];
        for (int i = 0; i < matrix.length; i++) 
        {
            for (int j = 0; j < matrix[0].length; j++) 
            {
                int[][] subMatrix = new int[matrix.length - 1][matrix[0].length - 1];
                for (int m = 0; m < matrix.length; m++) 
                {
                    for (int n = 0; n < matrix[m].length; n++) 
                    {
                        if (m != i && n != j) 
                        {
                            subMatrix[m < i ? m : m - 1][n < j ? n : n - 1] = matrix[m][n];
                        }
                    }
                }
                adjoint[i][j] = (int) Math.pow(-1.0, i + j) * Determinant.determinant(subMatrix);
            }
        }

        int[][] inverse = new int[matrix.length][matrix[0].length];
        for (int i = 0; i < matrix.length; i++) 
        {
            for (int j = 0; j < matrix[0].length; j++) 
            {
                inverse[i][j] = Math.floorMod(adjoint[j][i] * inverseDeterminant, 26);
            }
        }

        return inverse;
    }
}

class Key {
    static int[][] create() {
        Random r = new Random();
        int[][] a = new int[3][3];

        boolean validKey = false;
        while (!validKey) {
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    a[i][j] = r.nextInt(26);
                }
            }
            int d = Determinant.determinant(a);
            if (BigInteger.valueOf(d).gcd(BigInteger.valueOf(26)).intValue() == 1) {
                if (Determinant.determinant(InverseMatrix.inverse(a)) != 0) {
                    validKey = true;
                }
            }
        }
        return a;
    }
}
class Cryptography 
{
    static char[] Alphabets = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};

    static int[][] encrypt(int b[][]) 
    {
        System.out.println("Enter the Plain Text:");
        Scanner sc = new Scanner(System.in);
        String plain_text = sc.nextLine().toLowerCase().replaceAll("[^a-z]", "");
        char[] plain_text_Array = plain_text.toCharArray();

        int x = plain_text_Array.length;
        int remainder = x % 3;
        int padding_count = (remainder == 0) ? 0 : (3 - remainder);
        char padding_char = 'z'; 

        char[] padded_text_Array = new char[x + padding_count];
        int padded_text_index = 0;
        for (int i = 0; i < x; i++) 
        {
            padded_text_Array[padded_text_index++] = plain_text_Array[i];
        }
        for (int i = 0; i < padding_count; i++) 
        {
            padded_text_Array[padded_text_index++] = padding_char; 
        }

        int y = x + padding_count;
        int[] v = new int[y];
        for (int i = 0; i < y; i++) 
        {
            v[i] = padded_text_Array[i] - 'a';
        }

        int cipher_text_Array[] = new int[y];
        int index = 0;
        for (int k = 0; k < y; k += 3) 
        {
            for (int i = 0; i < 3; i++) 
            {
                int sum = 0;
                for (int j = 0; j < 3; j++) 
                {
                    sum += b[i][j] * v[j + k];
                }
                cipher_text_Array[index++] = Math.floorMod(sum, 26);
            }
        }

        System.out.println("The Cipher Text is:");
        for (int i = 0; i < y; i++) 
        {
            System.out.print(Alphabets[cipher_text_Array[i]]);
        }
        System.out.println();

        return new int[][]{cipher_text_Array, {padding_count}};
    }

    static void decrypt(int b[][]) 
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the Cipher Text:");
        String cipher_text = sc.nextLine().toLowerCase().replaceAll("[^a-z]", "");
        char[] cipher_text_Array = cipher_text.toCharArray();
        int x = cipher_text_Array.length;
    
        int inverseKey[][] = InverseMatrix.inverse(b); 
    
        if (inverseKey == null) 
        {
            System.out.println("The key is not invertible. Decryption is not possible.");
            return;
        }
    
        int decrypted_text_Array[] = new int[x];
        for (int k = 0; k < x; k += 3) 
        {
            for (int i = 0; i < 3; i++) 
            {
                int sum = 0;
                for (int j = 0; j < 3; j++) 
                {
                    if (j + k < x) 
                    {
                        sum += inverseKey[i][j] * (cipher_text_Array[j + k] - 'a');
                    }
                }
                decrypted_text_Array[i + k] = Math.floorMod(sum, 26); 
            }
        }
        int message_length = x; 
    
        if (decrypted_text_Array[message_length - 1] == 'z' - 'a') 
        {
            if (message_length == 1 || decrypted_text_Array[message_length - 2] != 'z' - 'a') 
            {
                message_length--; 
            } 
            else 
            {
                int numPaddingChars = 1; 
    
                while (message_length - 1 - numPaddingChars >= 0 && decrypted_text_Array[message_length - 1 - numPaddingChars] == 'z' - 'a') 
                {
                    numPaddingChars++;
                }
    
                if (numPaddingChars > 1) 
                {
                    message_length -= numPaddingChars;
                }
            }
        }
    
        System.out.println("The Decrypted Text is:");
        for (int i = 0; i < message_length; i++) {
            System.out.print(Alphabets[decrypted_text_Array[i]]);
        }
    
        System.out.println();
    }
    
}

public class HillCipher 
{
    public static void main(String args[]) 
    {
        System.out.println("Enter your choice (encrypt or decrypt):");
        Scanner sc = new Scanner(System.in);
        String choice = (sc.nextLine()).toLowerCase();
        if ("encrypt".equals(choice)) 
        {
            System.out.println("Do you have the key for encryption? (yes or no)");
            String keyChoice = sc.nextLine();
            if ("yes".equals(keyChoice)) 
            {
                System.out.println("Enter a 3x3 matrix key in alphabetical form:");
                int[][] c = new int[3][3];
        
                for (int i = 0; i < 3; i++) 
                {
                    for (int j = 0; j < 3; j++) 
                    {
                        char ch = sc.next().charAt(0);
                        c[i][j] = ch - 'a';
                    }
                }
                sc.nextLine();  // consume the newline character
        
                int[][] encryptedData = Cryptography.encrypt(c);
            }
            else 
            {
                int[][] a = Key.create();
                System.out.println("Randomly Generated Key is:");
                for (int i = 0; i < 3; i++) 
                {
                    for (int j = 0; j < 3; j++) 
                    {
                        System.out.print((char)(a[i][j] + 'a') + " ");
                    }
                    System.out.println();
                }
                int[][] encryptedData = Cryptography.encrypt(a);
            }
        }
        
        if ("decrypt".equals(choice)) 
        {
            System.out.println("Do you have the key for decryption? (yes or no)");
            String keyChoice = sc.nextLine();

            if ("yes".equals(keyChoice)) 
            {
                System.out.println("Enter the key as a 3x3 matrix in alphabetical form:");
                int[][] c = new int[3][3];
                
                for (int i = 0; i < 3; i++) {
                    for (int j = 0; j < 3; j++) {
                        char ch = sc.next().charAt(0);
                        c[i][j] = ch - 'a';
                    }
                }
                sc.nextLine();  // consume the newline character
                
                Cryptography.decrypt(c);
            }
        }
    }
}