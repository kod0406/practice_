/*import java.util.List;
import java.util.function.Predicate;

public class LamdaEx4_2 {

    public static void main(String[] args) {
        List<String> names = new java.util.ArrayList<>(List.of("Alice", "Bob", "Charlie"));

        // 람다 표현식
        names.removeIf(name -> name.startsWith("A"));
        //removeIf는 (Predicate<? super E> filter)로 되어 있기에 Predicate 사용하므로,생략가능

        // 메서드 참조
        names.removeIf(LamdaEx4_2::startsWithA);

        // 실행
        System.out.println(names);
    }

    private static boolean startsWithA(String s) {
        return s.startsWith("A");
    }
}*/
import java.util.function.Function;

public class LamdaEx4_2 {

    public static void main(String[] args) {
        Function<String,Integer> lengthLambda = s -> s.length();
        Function<String,Integer> lengthMethod = String::length;
        System.out.println(lengthLambda.apply("Hello"));
        System.out.println(lengthMethod.apply("Hello"));
        //Function을 사용했다면 .apply()를, Predicate를 사용했다면 .test()를 사용할것.
    }


}