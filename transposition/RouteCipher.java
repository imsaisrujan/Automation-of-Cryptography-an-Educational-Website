import java.util.Scanner;

public class RouteCipher 
{

    static char[][] fillGrid(String msg, int rows, int cols) 
    {
        char[][] grid = new char[rows][cols];
        int k = 0;

        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                if (k < msg.length()) 
                {
                    grid[i][j] = msg.charAt(k);
                    k++;
                } 
                else 
                {
                    grid[i][j] = '_';  
                }
            }
        }
        return grid;
    }

    static String encryptSideToSideRow(char[][] grid, int rows, int cols) 
    {
        StringBuilder cipher = new StringBuilder();
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                cipher.append(grid[i][j]);
            }
        }
        return cipher.toString();
    }

    static String encryptUpAndDownColumn(char[][] grid, int rows, int cols) 
    {
        StringBuilder cipher = new StringBuilder();
        for (int j = 0; j < cols; j++) 
        {
            for (int i = 0; i < rows; i++) 
            {
                cipher.append(grid[i][j]);
            }
        }
        return cipher.toString();
    }

    static String encryptSpiralRow(char[][] grid, int rows, int cols) 
    {
        StringBuilder cipher = new StringBuilder();
        int top = 0, bottom = rows - 1, left = 0, right = cols - 1;

        while (top <= bottom && left <= right) 
        {
            for (int i = left; i <= right; i++) 
            {
                cipher.append(grid[top][i]);
            }
            top++;

            for (int i = top; i <= bottom; i++) 
            {
                cipher.append(grid[i][right]);
            }
            right--;

            if (top <= bottom) 
            {
                for (int i = right; i >= left; i--) 
                {
                    cipher.append(grid[bottom][i]);
                }
                bottom--;
            }

            if (left <= right) 
            {
                for (int i = bottom; i >= top; i--) 
                {
                    cipher.append(grid[i][left]);
                }
                left++;
            }
        }
        return cipher.toString();
    }

    static String encryptSideToSideColumn(char[][] grid, int rows, int cols) 
    {
        StringBuilder cipher = new StringBuilder();
        for (int j = 0; j < cols; j++) 
        {
            for (int i = 0; i < rows; i++) 
            {
                cipher.append(grid[i][j]);
            }
        }
        return cipher.toString();
    }

    static String encryptUpAndDownRow(char[][] grid, int rows, int cols) 
    {
        StringBuilder cipher = new StringBuilder();
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                cipher.append(grid[i][j]);
            }
        }
        return cipher.toString();
    }

    static String encryptSpiralColumn(char[][] grid, int rows, int cols) 
    {
        StringBuilder cipher = new StringBuilder();
        int top = 0, bottom = rows - 1, left = 0, right = cols - 1;

        while (top <= bottom && left <= right) 
        {
            for (int i = top; i <= bottom; i++) 
            {
                cipher.append(grid[i][left]);
            }
            left++;

            for (int i = left; i <= right; i++) 
            {
                cipher.append(grid[bottom][i]);
            }
            bottom--;

            if (left <= right) 
            {
                for (int i = bottom; i >= top; i--) 
                {
                    cipher.append(grid[i][right]);
                }
                right--;
            }

            if (top <= bottom) 
            {
                for (int i = right; i >= left; i--) 
                {
                    cipher.append(grid[top][i]);
                }
                top++;
            }
        }
        return cipher.toString();
    }

    static String decryptSideToSideRow(String cipher, int rows, int cols) 
    {
        char[][] grid = new char[rows][cols];
        int k = 0;

        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                grid[i][j] = cipher.charAt(k);
                k++;
            }
        }

        StringBuilder msg = new StringBuilder();
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                if (grid[i][j] != '_') 
                {
                    msg.append(grid[i][j]);
                }
            }
        }
        return msg.toString();
    }

    static String decryptUpAndDownColumn(String cipher, int rows, int cols) 
    {
        char[][] grid = new char[rows][cols];
        int k = 0;

        for (int j = 0; j < cols; j++) 
        {
            for (int i = 0; i < rows; i++) 
            {
                grid[i][j] = cipher.charAt(k);
                k++;
            }
        }

        StringBuilder msg = new StringBuilder();
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                if (grid[i][j] != '_') 
                {
                    msg.append(grid[i][j]);
                }
            }
        }
        return msg.toString();
    }

    static String decryptSpiralRow(String cipher, int rows, int cols) 
    {
        char[][] grid = new char[rows][cols];
        int k = 0;
        int top = 0, bottom = rows - 1, left = 0, right = cols - 1;

        while (top <= bottom && left <= right) 
        {
            for (int i = left; i <= right; i++) 
            {
                grid[top][i] = cipher.charAt(k++);
            }
            top++;

            for (int i = top; i <= bottom; i++) 
            {
                grid[i][right] = cipher.charAt(k++);
            }
            right--;

            if (top <= bottom) 
            {
                for (int i = right; i >= left; i--) 
                {
                    grid[bottom][i] = cipher.charAt(k++);
                }
                bottom--;
            }

            if (left <= right) 
            {
                for (int i = bottom; i >= top; i--) 
                {
                    grid[i][left] = cipher.charAt(k++);
                }
                left++;
            }
        }

        StringBuilder msg = new StringBuilder();
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                if (grid[i][j] != '_') 
                {
                    msg.append(grid[i][j]);
                }
            }
        }
        return msg.toString();
    }
     
    static String decryptSideToSideColumn(String cipher, int rows, int cols) 
    {
        char[][] grid = new char[rows][cols];
        int k = 0;
     
        for (int j = 0; j < cols; j++) 
        {
            for (int i = 0; i < rows; i++) 
            {
                grid[i][j] = cipher.charAt(k);
                k++;
            }
        }
     
        StringBuilder msg = new StringBuilder();
        for (int j = 0; j < cols; j++) 
        {
            for (int i = 0; i < rows; i++) 
            {
                if (grid[i][j] != '_') 
                {
                    msg.append(grid[i][j]);
                }
            }
        }
        return msg.toString();
    }
     
    static String decryptUpAndDownRow(String cipher, int rows, int cols) 
    {
        char[][] grid = new char[rows][cols];
        int k = 0;
     
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                grid[i][j] = cipher.charAt(k);
                k++;
            }
        }
     
        StringBuilder msg = new StringBuilder();
        for (int j = 0; j < cols; j++) 
        {
            for (int i = 0; i < rows; i++) 
            {
                if (grid[i][j] != '_') 
                {
                    msg.append(grid[i][j]);
                }
            }
        }
        return msg.toString();
    }
     
    static String decryptSpiralColumn(String cipher, int rows, int cols) 
    {
        char[][] grid = new char[rows][cols];
        int k = 0;
        int top = 0, bottom = rows - 1, left = 0, right = cols - 1;
 
        while (top <= bottom && left <= right) 
        {
            for (int i = top; i <= bottom; i++) 
            {
                grid[i][left] = cipher.charAt(k++);
            }
            left++;
     
            for (int i = left; i <= right; i++) 
            {
                grid[bottom][i] = cipher.charAt(k++);
            }
            bottom--;
     
            if (left <= right) 
            {
                for (int i = bottom; i >= top; i--) 
                {
                    grid[i][right] = cipher.charAt(k++);
                }
                right--;
            }
     
            if (top <= bottom) 
            {
                for (int i = right; i >= left; i--) 
                {
                    grid[top][i] = cipher.charAt(k++);
                }
                top++;
            }
        }
     
        StringBuilder msg = new StringBuilder();
        for (int i = 0; i < rows; i++) 
        {
            for (int j = 0; j < cols; j++) 
            {
                if (grid[i][j] != '_') 
                {
                    msg.append(grid[i][j]);
                }
            }
        }
        return msg.toString();
    }
     
    public static void main(String[] args) 
    {
        System.out.println("Enter your choice (encrypt or decrypt):");
        Scanner sc = new Scanner(System.in);
        String keychoice = (sc.nextLine()).toLowerCase();

        System.out.println("Enter the number of rows for the grid:");
        int rows = sc.nextInt();
 
        System.out.println("Enter the number of columns for the grid:");
        int cols = sc.nextInt();
 
        sc.nextLine(); 
        System.out.println("Choose the path:");
        System.out.println("1. Side-to-Side Row-wise");
        System.out.println("2. Up-and-Down Column-wise");
        System.out.println("3. Spiral (row-wise inward)");
        System.out.println("4. Side-to-Side (column-wise)");
        System.out.println("5. Up-and-Down (row-wise)");
        System.out.println("6. Spiral (column-wise inward)");
        int choice = sc.nextInt();

        if ("encrypt".equals(keychoice)) 
        {
            System.out.println("Enter the message to encrypt:");
            String message = sc.nextLine();
             
            char[][] grid = fillGrid(message, rows, cols);
            String encryptedMessage = "";
     
            switch (choice) 
            {
                case 1:
                    encryptedMessage = encryptSideToSideRow(grid, rows, cols);
                    break;
                case 2:
                    encryptedMessage = encryptUpAndDownColumn(grid, rows, cols);
                    break;
                case 3:
                    encryptedMessage = encryptSpiralRow(grid, rows, cols);
                    break;
                case 4:
                    encryptedMessage = encryptSideToSideColumn(grid, rows, cols);
                    break;
                case 5:
                    encryptedMessage = encryptUpAndDownRow(grid, rows, cols);
                    break;
                case 6:
                    encryptedMessage = encryptSpiralColumn(grid, rows, cols);
                    break;
                default:
                    System.out.println("Invalid choice");
                    return;
            }
     
            System.out.println("Encrypted Message: " + encryptedMessage);
        }
        else if ("decrypt".equals(keychoice)) 
        {
            System.out.println("Enter the message to decrypt:");
            sc.nextLine();
            String message = sc.nextLine();
            
            if (message.isEmpty()) {
                System.out.println("Error: Cannot decrypt an empty message.");
                return;
            }
             
            char[][] grid = fillGrid(message, rows, cols);
            String decryptedMessage = "";
     
            switch (choice) 
            {
                case 1:
                    decryptedMessage = decryptSideToSideRow(message, rows, cols);
                    break;
                case 2:
                    decryptedMessage = decryptUpAndDownColumn(message, rows, cols);
                    break;
                case 3:
                    decryptedMessage = decryptSpiralRow(message, rows, cols);
                    break;
                case 4:
                    decryptedMessage = decryptSideToSideColumn(message, rows, cols);
                    break;
                case 5:
                    decryptedMessage = decryptUpAndDownRow(message, rows, cols);
                    break;
                case 6:
                    decryptedMessage = decryptSpiralColumn(message, rows, cols);
                    break;
                default:
                    System.out.println("Invalid choice");
                    return;
            }
            System.out.println("Decrypted Message: " + decryptedMessage);
        }
    }
}