/*
import java.util.*;
public class LamdaEx4_1 {
    public static void main(String[] args){
        List<String> names = Arrays.asList("Apple","Banana","Cake");
        names.forEach(name -> System.out.println(name));
        //.forEach()는  java.util.function.Consumer<? super T> action로 되어 있기에
        //Consumer 인터페이스를 가지고 있기에 함수형 인터페이스를 생성 안해도 사용가능.
        names.forEach(System.out::println);//이를 메서드 참조로 변환

    }
}
*/
import java.util.function.Supplier;

public class LamdaEx4_1 {
    private static String getString(){
        return "Hello,World";
    }
    public static void main(String[] args){
        Supplier<String> supplierLambda = () -> "Hello, World";
        Supplier<String> supplierReference = LamdaEx4_1::getString;//클래스 이름::메서드 이름
        System.out.println(supplierLambda.get());
        System.out.println(supplierReference.get());
    }
}
