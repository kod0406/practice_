import java.util.function.*;
import java.util.*;

public class LamdaEx3 {
    // 변환을 적용하여 새로운 리스트를 생성하는 메소드
    static <T> List<T> applyTransformation(Function<T, T> transformation, List<T> list) {
        List<T> transformedList = new ArrayList<>(list.size());
        for (T element : list) {
            transformedList.add(transformation.apply(element));
        }
        return transformedList;
    }

    // 짝수만 출력하는 메소드
    static <T> void printEvenNumbers(Predicate<T> predicate, Consumer<T> consumer, List<T> list) {
        System.out.print("Even Numbers: [");
        for (T element : list) {
            if (predicate.test(element))
                consumer.accept(element);
        }
        System.out.println("]");
    }

    // Supplier를 이용하여 리스트에 랜덤한 값을 추가하는 메소드
    static <T> void makeRandomList(Supplier<T> supplier, List<T> list) {
        for (int i = 0; i < 10; i++) {
            list.add(supplier.get());
        }
    }
    public static void main(String[] args) {
        // 람다식을 이용하여 1부터 100 사이의 랜덤한 정수를 생성하는 Supplier
        Supplier<Integer> randomSupplier = () -> (int) (Math.random() * 100) + 1;

        // 받은 정수를 출력하는 Consumer
        Consumer<Integer> printConsumer = i -> System.out.print(i + ", ");

        // 받은 정수가 짝수인지 판단하는 Predicate
        Predicate<Integer> isEvenPredicate = i -> i % 2 == 0;

        // 받은 정수를 10으로 나누고 다시 10을 곱하는 Function
        Function<Integer, Integer> transformFunction = i -> i / 10 * 10;

        // 정수를 저장할 ArrayList
        List<Integer> integerList = new ArrayList<>();

        // Supplier를 이용하여 10개의 랜덤한 정수를 생성하여 리스트에 추가
        makeRandomList(randomSupplier, integerList);
        System.out.println("Generated List: " + integerList);

        // 짝수만 출력하는 메소드
        printEvenNumbers(isEvenPredicate, printConsumer, integerList);

        // 변환을 적용한 새로운 리스트
        List<Integer> transformedList = applyTransformation(transformFunction, integerList);
        System.out.println("Transformed List: " + transformedList);
    }
}

/*
import java.util.*;

class LamdaEx3{
    public static void main(String[] args){
        ArrayList<Integer> list = new ArrayList<Integer>();
        for(int i=0;i<10;i++){
            list.add(i);
        }
        list.forEach(i-> System.out.print(i+" "));
        System.out.println();
        list.removeIf(x-> x%2==0 || x%3==0);
        System.out.println(list);
        list.replaceAll(i->i*10);
        System.out.println(list);
        Map<String,String> map = new HashMap<String,String>();
        map.put("1","1");
        map.put("2","2");
        map.put("3","3");
        map.put("4","4");
        map.forEach((k,v) -> System.out.print("{"+k+","+v+"},"));
        System.out.println();
    }
}
*/
