import java.util.*;
interface Eatable{}
class Fruit implements Eatable{
    public String toString(){
        return "Fruit";
    }
}

class Apple extends Fruit{
    public String toString(){
        return "Apple";
    }
}

class Grape extends Fruit{
    public String toString(){
        return "Grape";
    }
}

class Toy{
    public String toString(){
        return "Toy";
    }
}
//Eatable -> Fruit ->Apple & Grape // Toy 는 별개
class FruitBox<T extends Fruit & Eatable> extends Box<T>{
}// Fruit 클래스를 상속받고,Eatable 인터페이스를 구현한 타입만 가능.

class Box<T>{
    ArrayList<T> list = new ArrayList<>();
    void add(T item) {
        list.add(item);
    }
    T get(int i){
        return list.get(i);
    }
    int size(){
        return list.size();
    }
    public String toString(){
        return list.toString();
    }
}

public class Generics_extends {
    public static void main(String[] args){
        FruitBox<Fruit> fruitBox = new FruitBox<>();
        FruitBox<Apple> appleBox = new FruitBox<>();
        FruitBox<Grape> grapeBox = new FruitBox<>();
        //FruitBox<Grape> grapeBox = new FruitBox<Apple>(); 앞과 뒤의 타입이 다름
        //FruitBox<Toy> toyBox = new FruitBox<>(); FruitBox 는 Fruit 클래스를 상속받고,Eatable 인터페이스를 구현한 타입만 가능.
        Box<Toy> toyBox = new Box<>();
    }
}
