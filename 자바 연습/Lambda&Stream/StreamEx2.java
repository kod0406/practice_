import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class StreamEx2 {

    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // 1. filter: 조건에 맞는 요소만 필터링
        List<Integer> evenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .collect(Collectors.toList());
        System.out.println("Filter - Even Numbers: " + evenNumbers);

        // 2. distinct: 중복 제거
        List<Integer> distinctNumbers = Arrays.asList(1, 2, 3, 1, 2, 3, 4, 5);
        List<Integer> uniqueNumbers = distinctNumbers.stream()
                .distinct()
                .collect(Collectors.toList());
        System.out.println("Distinct - Unique Numbers: " + uniqueNumbers);

        // 3. limit: 일정 개수의 요소만 선택
        List<Integer> limitedNumbers = numbers.stream()
                .limit(5)
                .collect(Collectors.toList());
        System.out.println("Limit - First 5 Numbers: " + limitedNumbers);

        // 4. skip: 처음 몇 개의 요소를 건너뛰고 선택
        List<Integer> skippedNumbers = numbers.stream()
                .skip(5)
                .collect(Collectors.toList());
        System.out.println("Skip - After Skipping 5 Numbers: " + skippedNumbers);

        List<String> fruits = Arrays.asList("Apple", "Banana", "Orange", "Grapes", "Kiwi");

        // 5. sorted: 요소를 기본 정렬 순서로 정렬
        List<String> sortedFruits = fruits.stream()
                .sorted()
                .collect(Collectors.toList());
        System.out.println("Sorted - Default Order: " + sortedFruits);

        // 6. peek: 각 요소를 소비하면서 중간 결과 확인 (디버깅 용도)
        List<String> peekedFruits = fruits.stream()
                .peek(fruit -> System.out.println("Peeked: " + fruit))
                .collect(Collectors.toList());
        System.out.println("Peek - Fruits: " + peekedFruits);

    }
}
