record Person(String name, int age) {}

public class RecordDemo {
    public static void main(String[] args) {
        Person p1 = new Person("Sathish", 21);
        Person p2 = new Person("Rahul", 18);
        System.out.println(p1);
        System.out.println(p2);
    }
}