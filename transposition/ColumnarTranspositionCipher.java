import java.util.*;

public class ColumnarTranspositionCipher 
{
    static String key;
    static Map<Character, Integer> keyMap = new HashMap<>();

    static void setPermutationOrder() 
    {
        for (int i = 0; i < key.length(); i++) 
        {
            keyMap.put(key.charAt(i), i);
        }
    }

    static String encryptMessage(String msg) 
    {
        int row, col;
        StringBuilder cipher = new StringBuilder();

        col = key.length();
        row = (int) Math.ceil((double) msg.length() / col);

        char[][] matrix = new char[row][col];

        for (int i = 0, k = 0; i < row; i++) 
        {
            for (int j = 0; j < col; ) 
            {
                if (k < msg.length()) 
                {
                    char ch = msg.charAt(k);
                    if (Character.isLetter(ch) || ch == ' ') 
                    {
                        matrix[i][j] = ch;
                        j++;
                    }
                    k++;
                } 
                else 
                {
                    matrix[i][j] = '_';
                    j++;
                }
            }
        }

        for (Map.Entry<Character, Integer> entry : keyMap.entrySet()) 
        {
            int columnIndex = entry.getValue();

            for (int i = 0; i < row; i++) 
            {
                cipher.append(matrix[i][columnIndex]);
            }
        }
        return cipher.toString();
    }

    static String decryptMessage(String cipher) 
    {
        int col = key.length();
        int row = (int) Math.ceil((double) cipher.length() / col);
        char[][] cipherMat = new char[row][col];

        int k = 0;
        for (Map.Entry<Character, Integer> entry : keyMap.entrySet()) 
        {
            int columnIndex = entry.getValue();
            for (int i = 0; i < row; i++) 
            {
                cipherMat[i][columnIndex] = cipher.charAt(k++);
            }
        }

        StringBuilder msg = new StringBuilder();
        for (int i = 0; i < row; i++) 
        {
            for (int j = 0; j < col; j++) 
            {
                if (cipherMat[i][j] != '_') 
                {
                    msg.append(cipherMat[i][j]);
                }
            }
        }

        return msg.toString();
    }

    public static void main(String[] args) {
        System.out.println("Enter your choice (encrypt or decrypt):");
        Scanner sc = new Scanner(System.in);
        String choice = (sc.nextLine()).toLowerCase();
        System.out.println("Enter the key:");
        key = sc.nextLine();
        setPermutationOrder();
        if ("encrypt".equals(choice)) 
        {
            System.out.println("Enter the plain text");
            String msg = sc.nextLine();
            String cipher = encryptMessage(msg);
            System.out.println("Encrypted Message: " + cipher);
        }
        else if ("decrypt".equals(choice))
        {
            System.out.println("Enter the cipher text");
            String msg = sc.nextLine();
            System.out.println("Decrypted Message: " + decryptMessage(msg));
        }
    }
}
