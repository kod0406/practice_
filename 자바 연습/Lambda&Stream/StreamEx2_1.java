import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

class Fruit {
    private String name;
    private int quantity;

    public Fruit(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }
}

public class StreamEx2_1 {

    public static void main(String[] args) {
        List<Fruit> fruits = Arrays.asList(
                new Fruit("Apple", 5),
                new Fruit("Banana", 3),
                new Fruit("Orange", 7),
                new Fruit("Grapes", 2),
                new Fruit("Kiwi", 4)
        );

        // 사용자 정의 Comparator로 quantity 기준으로 정렬
        List<Fruit> sortedFruits = fruits.stream()
                .sorted(Comparator.comparing(Fruit::getQuantity))
                .collect(Collectors.toList());

        System.out.println("Sorted by Quantity: " + sortedFruits);
    }
}

/*
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class StreamEx2_1 {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Apple", "Banana", "Orange", "Grapes", "Kiwi");

        List<String> sortedWordsByLength = words.stream()
                .sorted(Comparator.comparing(String::length))
                .collect(Collectors.toList());

        System.out.println("Sorted by Length: " + sortedWordsByLength);
    }
}
*/

/*
import java.util.Arrays;
import java.util.Comparator;
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

public class StreamEx2_1 {

    public static void main(String[] args) {
        List<Person> people = Arrays.asList(
                new Person("Alice", 30),
                new Person("Bob", 25),
                new Person("Charlie", 35)
        );

        List<Person> sortedPeople = people.stream()
                .sorted(Comparator.comparing(Person::getAge))
                .collect(Collectors.toList());

        System.out.println("Sorted by Age: " + sortedPeople);
    }
}
*/

/*
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class StreamEx2_1 {

    public static void main(String[] args) {
        List<String> words = Arrays.asList("Apple", "Banana", "Orange", "Grapes", "Kiwi");

        List<String> reverseSortedWords = words.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        System.out.println("Reverse Sorted: " + reverseSortedWords);
    }
}
*/