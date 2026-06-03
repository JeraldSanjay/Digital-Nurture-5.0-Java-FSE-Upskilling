import java.sql.*;

public class InsertStudent {
    public static void main(String[] args) {

        try {
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/studentdb",
                    "root",
                    "password");

            String sql =
                    "INSERT INTO students(id,name) VALUES(?,?)";

            PreparedStatement ps =
                    con.prepareStatement(sql);

            ps.setInt(1, 101);
            ps.setString(2, "Sathish");

            ps.executeUpdate();

            System.out.println("Inserted");

            con.close();

        } catch(Exception e) {
            System.out.println(e);
        }
    }
}