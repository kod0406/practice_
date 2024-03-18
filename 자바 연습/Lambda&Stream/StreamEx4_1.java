import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
//map은 각 요소를 다른 요소로 변환하는 데 사용
//flatMap은 각 요소를 스트림으로 변환 + 평탄화(flatten)하는 데 사용 + 여러 개의 요소로 대응될 수 있음
/*
public class StreamEx4_1 {
    public static void main(String[] args){
*/
/*        Stream<String> words = Stream.of("Hello","world");
    words.map(String::toUpperCase).forEach(System.out::println);*//*

        Stream<List<Integer>> num = Stream.of(
                Arrays.asList(1, 2, 3),
                Arrays.asList(4, 5, 6),
                Arrays.asList(7, 8, 9)
        );
        num.flatMap(List::stream).forEach(System.out::print);
        //num.forEach(System.out::println);
    }
}
*/

public class StreamEx4_1{
    public static void main(String[] args){
        Stream<String> result = Stream.of("Java", "Stream", "API");
        result.map(word ->word.split("")).flatMap(Arrays::stream)
                .map(String::toUpperCase).forEach(System.out::print);
    }
}
