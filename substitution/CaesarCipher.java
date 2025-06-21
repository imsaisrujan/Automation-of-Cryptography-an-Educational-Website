import java.util.Scanner;

public class CaesarCipher 
{
    public static void main(String[] args) 
    {
        crypt();
    }

    public static void crypt() 
    {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Type 'encode' to encrypt, type 'decode' to decrypt:");
        String direction = scanner.nextLine();
        System.out.println("Type your message:");
        String text = scanner.nextLine().toLowerCase();
        System.out.println("Type the shift number:");
        int shift;
        while (true) 
        {
            try 
            {
                shift = Integer.parseInt(scanner.nextLine()) % 26;
                break;
            } 
            catch (NumberFormatException e) 
            {
                System.out.println("Please enter a valid integer.");
            }
        }
        ceaser(text, shift, direction);
        scanner.close();
    }

    public static void ceaser(String text, int shift, String direction) 
    {
        char[] e = text.toCharArray();
        char[] q = new char[text.length()];

        for (int i = 0; i < text.length(); i++) 
        {
            for (int j = 0; j < alphabet.length; j++) 
            {
                if (Character.isAlphabetic(e[i])) 
                {
                    if (alphabet[j] == e[i]) 
                    {
                        if (direction.equals("encode")) 
                        {
                            if (j + shift > 25) 
                            {
                                q[i] = alphabet[j + shift - 26];
                            } 
                            else 
                            {
                                q[i] = alphabet[j + shift];
                            }
                        } 
                        else if (direction.equals("decode")) 
                        {
                            if (j - shift < 0) 
                            {
                                q[i] = alphabet[26 + j - shift];
                            } 
                            else 
                            {
                                q[i] = alphabet[j - shift];
                            }
                        }
                    }
                }
            }
            if (Character.isWhitespace(e[i])) 
            {
                q[i] = ' ';
            }
            if (!Character.isWhitespace(e[i]) && !Character.isAlphabetic(e[i])) 
            {
                q[i] = e[i];
            }
        }
        System.out.println("The " + direction + "d word is " + new String(q));
    }
    private static final char[] alphabet = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
}
