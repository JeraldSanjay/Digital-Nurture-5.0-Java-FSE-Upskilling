import java.util.*;

public class LambdaDemo {
    public static void main(String[] args) {

        List<String> list =
                Arrays.asList("Java", "Python", "C", "JavaScript");

        Collections.sort(list,
                (a, b) -> a.compareTo(b));

        System.out.println(list);
    }
}