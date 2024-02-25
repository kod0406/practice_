import java.util.Arrays;
import java.util.List;

public class LamdaEx1_1 {
    public static void main(String[] args) {
        List<String> fruits = Arrays.asList("Apple", "Banana", "Orange", "Grapes");

        // 람다식을 사용하여 리스트의 각 요소 출력
        fruits.forEach(fruit -> System.out.println(fruit));
    }
}
