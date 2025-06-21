import java.util.*;
class MonoAlphabeticcipher
{
   public static char p[]= {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
    public static char ch[]={ 'z','y','x','w','v','u','t','s','r','q','p','o','n','m','l','k','j','i','h','g','f','e','d','c','b','a'};
    Scanner sc=new Scanner(System.in);
	
    public  static String doEncryption(String s)
{
    char c[]=new char[10];
    int l=s.length();
    for(int i=0;i<l;i++)
    {
        for(int j=0;j<26;j++)
        {
            if(p[j]==s.charAt(i))
            {
                c[i]=ch[j];
                break;
            }
        }
    }
return(new String(c));
}
public static String doDecryption(String s)
{
    char c[]=new char[10];
    int l=s.length();
    for(int i=0;i<l;i++)
    {
        for(int j=0;j<26;j++)
        {
            if(ch[j]==s.charAt(i))
            {
                c[i]=p[j];
                break;
            }
        }
    }
    return(new String(c));
}
public static void encryption(String gtx)
{
    String etx=doEncryption(gtx);
    System.out.println("Encrypted text is: "+etx);
}
public static void decryption(String gtx)
{
    String etx=doDecryption(gtx);
    System.out.println("Decrypted text is: "+etx);
}
   public static void main(String args[])
    {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter your choice (encrypt or decrypt)");
        String choice = (sc.nextLine()).toLowerCase();
        System.out.println("Enter the string:");
        String gtx=sc.next().toLowerCase();
        if ("encrypt".equals(choice)) 
        {
            encryption(gtx);
        }
        else if ("decrypt".equals(choice)) 
        {
            decryption(gtx);
        }
    }
}