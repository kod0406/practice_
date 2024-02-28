import java.util.*;
import java.util.stream.*;

/*
class Fruit{
    private String name;
    private int quantity;

    public Fruit(String name,int quantity){
        this.name = name;
        this.quantity = quantity;
    }
    public String getName(){
        return name;
    }
    public int getQuantity(){
        return quantity;
    }
    public String toString() {
        return String.format("[%s, %d]", name, quantity);
    }//객체를 출력할 때, 기본적으로 Object 클래스의 toString() 메서드가 호출되기에, 이를 오버라이드 하면 자신이 원하는 형식으로 출력가능
}
public class StreamEx2_1 {
    public static void  main(String[] args){
        Stream<Fruit> fruitStream = Stream.of(
                new Fruit("Apple", 5),
                new Fruit("Banana", 3),
                new Fruit("Orange", 7),
                new Fruit("Grapes", 2),
                new Fruit("Kiwi", 4)
        );
        fruitStream.sorted(Comparator.comparing(Fruit::getQuantity)).forEach(System.out::println);
    }
}*/
/*
public class StreamEx2_1 {

    public static void main(String[] args) {
        Stream<String> words = Stream.of("Apple", "Banana", "Orange", "Grapes", "Kiwi");
        List<String> sortedWordsByLength = words.sorted(Comparator.comparing(String::length)).collect(Collectors.toList());
        System.out.println("Sorted by Length: " + sortedWordsByLength);
    }
}*/
class Person{
    private String name;
    private int age;

    public Person(String name,int age){
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
    public String toString(){
        return  String.format("[%s,%d]",name,age);
    }
}
public class StreamEx2_1{
    public static  void  main(String[] args){
        Stream<Person> people = Stream.of(
                new Person("Alice", 30),
                new Person("Bob", 25),
                new Person("Charlie", 35)
        );
        people.sorted(Comparator.comparing(Person::getAge)).forEach(System.out::println);
    }
}
