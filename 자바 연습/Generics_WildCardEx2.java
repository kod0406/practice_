import java.util.*;

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

class Fruit{
    String name;
    int weight;
    Fruit(String name,int weigh){
        this.name = name;
        this.weight = weigh;
    }
    public String toString(){
        return name+"("+weight+")";
    }
}

class Apple extends Fruit{
    Apple(String name,int weight){
        super(name,weight);
    }
}

class Grape extends Fruit{
    Grape(String name,int weight){
        super(name,weight);
    }
}

class AppleComp implements Comparator<Apple>{
    public int compare(Apple t1,Apple t2){
        return t1.weight - t2.weight;
    }
}

class GrapeComp implements Comparator<Grape>{
    public int compare(Grape t1,Grape t2){
        return t1.weight - t2.weight;
    }
}

class FruitComp implements Comparator<Fruit>{
    public int compare(Fruit t1,Fruit t2){
        return t1.weight - t2.weight;
    }
}

public class Generics_WildCardEx2 {
    public static void main(String[] args){
        FruitBox<Apple> appleBox = new FruitBox<Apple>();
        FruitBox<Grape> grapeBox = new FruitBox<Grape>();

        appleBox.add(new Apple("GreenApple",300));
        appleBox.add(new Apple("GreenApple",200));
        appleBox.add(new Apple("GreenApple",100));

        grapeBox.add(new Grape("GreenGrape",400));
        grapeBox.add(new Grape("GreenGrape",200));
        grapeBox.add(new Grape("GreenGrape",100));

        Collections.sort(appleBox.getList(), new AppleComp());
        Collections.sort(grapeBox.getList(), new GrapeComp());
        System.out.println(appleBox);
        System.out.println(grapeBox);
        System.out.println();
        Collections.sort(appleBox.getList(),new FruitComp());
        Collections.sort(grapeBox.getList(),new FruitComp());
        System.out.println();
        System.out.println();
    }
}
