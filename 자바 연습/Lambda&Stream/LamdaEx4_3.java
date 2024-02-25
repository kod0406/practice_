/*
import java.util.*;
import java.util.function.Predicate;

class Product{
    private String name;
    private double price;
    public Product(String name,double price){
        this.name = name;
        this.price = price;
    }
    public String getName(){
        return name;
    }
    public double getPrice(){
        return price;
    }
}
public class LamdaEx4_3 {

    private static double calculateTotal(List<Product> products, Predicate<Product> predicate) {
        return products.stream()
                .filter(predicate)
                .mapToDouble(Product::getPrice)
                .sum();
    }
    private static boolean isExpensive(Product product) {
        return product.getPrice() > 500;
    }
    public static void main(String[] args){
        List<Product> products = new ArrayList<Product>();
        products.add(new Product("Laptop", 1200.0));
        products.add(new Product("Smartphone", 800.0));
        products.add(new Product("Tablet", 400.0));
        //람다 표현식
        double totalLambda = calculateTotal(products, product -> product.getPrice() > 500);

        // 메서드 참조
        double totalReference = calculateTotal(products, LamdaEx4_3::isExpensive);

        // 실행
        System.out.println("Total (Lambda): $" + totalLambda);
        System.out.println("Total (Reference): $" + totalReference);
    }
}
*/
/*import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

class Animal {
    String name;
    int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    boolean isYoung() {
        return age < 3;
    }
}

public class LamdaEx4_3 {

    public static void main(String[] args) {
        List<Animal> animals = new ArrayList<>();
        animals.add(new Animal("Dog", 2));
        animals.add(new Animal("Cat", 4));
        animals.add(new Animal("Rabbit", 1));

        // 람다 표현식
        printYoungAnimals(animals, animal -> animal.isYoung());

        // 메서드 참조
        printYoungAnimals(animals, Animal::isYoung);
    }

    private static void printYoungAnimals(List<Animal> animals, Predicate<Animal> predicate) {
        for (Animal animal : animals) {
            if (predicate.test(animal)) {
                System.out.println(animal.name + " is young!");
            }
        }
    }
}*/
/*import java.util.HashMap;
import java.util.Map;
import java.util.function.BiFunction;

class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    int multiply(int a, int b) {
        return a * b;
    }
}

public class LamdaEx4_3 {

    public static void main(String[] args) {
        Map<String, BiFunction<Integer, Integer, Integer>> operations = new HashMap<>();
        Calculator calculator = new Calculator();

        // 람다 표현식
        operations.put("Add", (a, b) -> calculator.add(a, b));
        operations.put("Multiply", (a, b) -> calculator.multiply(a, b));

        // 메서드 참조
        operations.put("Add", calculator::add);
        operations.put("Multiply", calculator::multiply);

        // 실행
        System.out.println("Add Result: " + operations.get("Add").apply(5, 3));
        System.out.println("Multiply Result: " + operations.get("Multiply").apply(5, 3));
    }
}*/

