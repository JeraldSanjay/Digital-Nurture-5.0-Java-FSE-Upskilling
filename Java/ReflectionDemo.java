import java.lang.reflect.Method;

public class ReflectionDemo {

    public void show() {
        System.out.println("Hello Reflection");
    }

    public static void main(String[] args)
            throws Exception {

        Class<?> c =
                Class.forName("ReflectionDemo");

        Method m = c.getDeclaredMethod("show");

        Object obj =
                c.getDeclaredConstructor().newInstance();

        m.invoke(obj);
    }
}