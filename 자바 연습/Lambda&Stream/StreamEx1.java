import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamEx1 {
public static void main(String[] args){
/*    List<Integer> list = Arrays.asList(1,2,3,4,5);
    Stream<Integer> intStream = list.stream();
    intStream.forEach(System.out::print);//스트림은 최종연산시 사라짐
    System.out.println();
    String[] strArr = {"a","b","c","d"};
    Stream<String> strStream = Arrays.stream(strArr);
    //Stream<String> strStream = Arrays.stream(new String[]{"a","b","c","d"});
    //Stream<String> strStream = Stream.of("a","b","c","d");
    strStream.forEach(System.out::println);
    IntStream intStream1 = Arrays.stream(new int[]{1,2,3,4,5});
    System.out.println("intStream1의 합:"+intStream1.sum());*/
    System.out.println("Stream0의 총 합");
    IntStream intStream = new Random().ints(5,0,10);//갯수와 값 설정
    System.out.println(intStream.sum());
    //intStream.forEach(System.out::println);
    IntStream intStream1 = new Random().ints().limit(5);//갯수 제한
    System.out.println("Stream1의 랜덤값 5개");
    intStream1.forEach(System.out::println);
    Stream<Integer> intStream2 = Stream.iterate(2, n -> n+2);
    System.out.println("n의 값이 2인 n = n+2 10회 실행");
    intStream2.limit(10).forEach(System.out::println);//출력제한 10회

    }
}
