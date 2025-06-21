import java.util.Scanner;
public class RailFenceCipher
{
    public static void main(String[] args)
    {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter your choice (encrypt or decrypt):");
        String choice = (sc.nextLine()).toLowerCase();
        if ("encrypt".equals(choice)) 
        {
            System.out.println("enter the plain text:");
            String plainText=sc.nextLine();
            System.out.println("enter the key/number of rows:");
            int key=sc.nextInt();
            String en=encryption(plainText,key);
            System.out.println(en);
        }
        else if ("decrypt".equals(choice)) 
        {
            System.out.println("enter the cipher text:");
            String cipherText=sc.nextLine();
            System.out.println("enter the key/number of rows:");
            int key=sc.nextInt();
            System.out.println(decryption(cipherText,key));
        }
    }
    static String encryption(String text,int key)
    {
        String encryptedText="";
        boolean check=false;
        int j=0;
        int row=key;
        int col=text.length();
        char[][] a=new char[row][col];
        for(int i=0;i<col;i++)
        {
            if(j==0||j==key-1)
            check=!check;
            a[j][i]=text.charAt(i);
            if(check)
              j++;
            else
            j--;
    }
    for(int i=0;i<row;i++)
    {
        for(int k=0;k<col;k++)
        {
            if(a[i][k]!=0)
            encryptedText+=a[i][k];
           
        }
    }                                                                                    
    for(int i=0;i<row;i++)
    {
        for(int k=0;k<col;k++)
        {
        System.out.print(a[i][k]+" ");
    }
    System.out.println();
    }
        return encryptedText;
}
static String decryption(String text,int key)
{
    String decryptedText="";
    boolean check=false;
    int j=0;
    int row=key;
    int col=text.length();
    char[][] a=new char[row][col];
    for(int i=0;i<col;i++)
    {
        if(j==0||j==key-1)
        check=!check;
        a[j][i]='*';
        if(check)
        j++;
        else
        j--;
    }
    int index=0;
    check=false;
    for(int i=0;i<row;i++)
    {
    for(int k=0;k<col;k++)
    {
        if(a[i][k]=='*'&&index<col)
        {
            a[i][k]=text.charAt(index++);
        }
    }
}
     j=0;
    for(int i=0;i<col;i++)
    {
        if(j==0||j==key-1)
        check=!check;
        decryptedText+=a[j][i];
        if(check)
        j++;
        else
        j--;
    }
    return decryptedText;
    }
}

