import java.net.*;
import java.io.*;

public class TCP_Server {
    public static void main(String[] args) throws Exception {

        ServerSocket ss = new ServerSocket(5000);

        System.out.println("Waiting...");

        Socket s = ss.accept();

        DataInputStream dis =
                new DataInputStream(s.getInputStream());

        System.out.println(dis.readUTF());

        ss.close();
    }
}