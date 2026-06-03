public class PatternSwitchDemo {

    static void check(Object obj) {

        String type = obj.getClass().getSimpleName();

        if (type.equals("Integer")) {
            System.out.println("Integer: " + obj);
        }
        else if (type.equals("String")) {
            System.out.println("String: " + obj);
        }
        else if (type.equals("Double")) {
            System.out.println("Double: " + obj);
        }
        else {
            System.out.println("Unknown Type");
        }
    }

    public static void main(String[] args) {
        check(100);
        check("Hello");
        check(10.5);
    }
}