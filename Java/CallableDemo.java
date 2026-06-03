import java.util.concurrent.*;

public class CallableDemo {

    public static void main(String[] args)
            throws Exception {

        ExecutorService ex =
                Executors.newFixedThreadPool(2);

        Callable<Integer> task = () -> 10 + 20;

        Future<Integer> result =
                ex.submit(task);

        System.out.println(result.get());

        ex.shutdown();
    }
}