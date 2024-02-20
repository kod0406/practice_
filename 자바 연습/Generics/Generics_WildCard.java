import java.util.ArrayList;

class Fruit{
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

class Juice{
    String name;
    Juice(String name){
        this.name = name + "Juice";
    }
    public String toString(){
        return name;
    }
}
class Box<T> {
    ArrayList<T> list = new ArrayList<T>();
    void add(T item){
        list.add(item);
    }
    T get(int i){
        return list.get(i);
    }
    ArrayList<T> getList(){
        return list;
    }
    int size(){
        return list.size();
    }
    public String toString(){
        return list.toString();
    }
}

class FruitBox<T extends Fruit> extends Box<T>{

}

class Juicer{
    static Juice makeJuice(FruitBox<? extends Fruit> box){//지네릭 메서드:호출마다 타입을 대입(대부분 생략 有)
        String tmp = "";
        for(Fruit f : box.getList())
            tmp += f +" ";
        return new Juice(tmp);
    }
}

public class Generics_WildCard {
    public static void main(String[] args){
        FruitBox<Fruit> fruitBox = new FruitBox<Fruit>();
        FruitBox<Apple> appleBox = new FruitBox<Apple>();//두 개다 Juice makeJuice로 들어갈수 있음
        /*타입은 항상 일치해야 함 와일드카드 쓰거나 맞춰주거나
        <? extends A> -> A부터 A자손까지 가능, <? super A> -> A부터 A부모까지 가능
        */
        fruitBox.add(new Apple());
        fruitBox.add(new Grape());
        appleBox.add(new Apple());
        appleBox.add(new Apple());

        System.out.println(Juicer.makeJuice(fruitBox));
        System.out.println(Juicer.makeJuice(appleBox));
    }
}
