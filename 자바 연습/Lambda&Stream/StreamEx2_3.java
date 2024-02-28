/*import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}

public class StreamEx2_3 {

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
                new Person("Alice", 30),
                new Person("Bob", 25),
                new Person("Charlie", 35),
                new Person("David", 28)
        );

        List<String> namesOfYoungAdults = people.stream()
                .filter(person -> person.getAge() >= 25 && person.getAge() <= 35)
                .map(Person::getName)
                .collect(Collectors.toList());

        System.out.println("Names of Young Adults: " + namesOfYoungAdults);
    }
}*/
///////////////
/*import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamEx2_3 {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Apple", "Banana", "Orange", "Apple", "Grapes", "Banana");

        List<String> distinctAndSortedWords = words.stream()
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        System.out.println("Distinct and Sorted Words: " + distinctAndSortedWords);
    }
}*/
///////////////
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class StreamEx2_3 {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Apple", "Banana", "Orange", "Grapes", "Kiwi");

        Map<Integer, List<String>> wordsByLength = words.stream()
                .collect(Collectors.groupingBy(String::length));

        System.out.println("Words Grouped by Length: " + wordsByLength);
    }
}

