import java.util.*;

class Product{}
class Tv extends Product{}

class Audio extends Product{}
public class Generics_polymorphism {
    public static void main(String[]args){
        ArrayList<Product> productList = new ArrayList<Product>();
        ArrayList<Tv> tvList = new ArrayList<Tv>();
        // ArrayList<Product> tvList = new ArrayList<Tv>(); 지네릭 특징 (타입)
        // List<Tv> tvList = new ArrayList<Tv>(); // List가 조상이기에 가능
        productList.add(new Tv()); // 다형성 -> 가능
        productList.add(new Audio());

        tvList.add(new Tv());
        tvList.add(new Tv());

        PrintAll(productList);
    }
    public static void PrintAll(ArrayList<Product> list){//Tv로 정의된 tvList는 에러가 발셍
    for(Product p : list){
        System.out.println(p);
    }
    }

}
