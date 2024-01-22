import java.util.*;
class method{
    public static long add1(List list){
        long start = System.currentTimeMillis();
        for(int i =0; i<1000000;i++) list.add(i+"");
        long end = System.currentTimeMillis();
        return end- start;
    }
    public static long add2(List list){
        long start = System.currentTimeMillis();
        for(int i =0; i<1000;i++) list.add(500,"X");
        long end = System.currentTimeMillis();
        return end- start;
    }
    public static long remove1(List list){
        long start = System.currentTimeMillis();
        for(int i = list.size()-1;i>=0;i--) list.remove(i);
        long end = System.currentTimeMillis();
        return end- start;
    }
    public static long remove2(List list){
        long start = System.currentTimeMillis();
        for(int i =0;i<1000;i++) list.remove(i);
        long end = System.currentTimeMillis();
        return end- start;
    }
}
public class Linked_listEx {
    public static void main(String[] args){
        ArrayList al = new ArrayList(2000000);
        LinkedList ll = new LinkedList();
        System.out.println("=== 순차적으로 추가하기 ===");
        System.out.println("ArrayList :"+method.add1(al));
        System.out.println("LinkedList :"+method.add1(ll));
        System.out.println();
        System.out.println("=== 중간에 추가하기 ===");
        System.out.println("ArrayList :"+method.add2(al));
        System.out.println("LinkedList :"+method.add2(ll));
        System.out.println();
        System.out.println("=== 순차적으로 제거하기 ===");
        System.out.println("ArrayList :"+method.remove1(al));
        System.out.println("LinkedList :"+method.remove1(ll));
        System.out.println();
        System.out.println("=== 중간에 제거하기 ==="); //왜 인덱스 오류가 뜨는건지는 몰루
        System.out.println("ArrayList :"+method.remove2(al));
        System.out.println("LinkedList :"+method.remove2(ll));
    }
}
