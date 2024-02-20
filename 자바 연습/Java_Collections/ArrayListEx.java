import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;

public class ArrayListEx {
    public static void print(ArrayList list1,ArrayList list2){
        System.out.println("list1:" + list1);
        System.out.println("list2:" + list2);
        System.out.println();
    }

    public static void main(String[] args) {
        ArrayList list1 = new ArrayList(10);
        //ArrayList list2 = new ArrayList(list1.subList(1,4));
        list1.add(new Integer(5));
        list1.add(new Integer(4));
        list1.add(new Integer(2));
        list1.add(new Integer(0));
        list1.add(new Integer(1));
        list1.add(new Integer(3));

        System.out.println(list1.indexOf(new Integer(0)));// 값 0 의 위치가 어디인지(몇번째인지) 출력
        System.out.println(list1.indexOf(1)); // 1번째 인덱스는 무슨 값인지 출력

        ArrayList list2 = new ArrayList(list1.subList(1,4));//인덱스 1~3의 값을 복사해서 list2에 넣기
        print(list1,list2);
        System.out.println("list1.containAll(list2):" + list1.containsAll(list2)); //list1의 값이 list2에 다 있으면 참을 반환
        list2.add("B");
        list2.add("c");
        list2.add(3,"A");//3번 인덱스에 A를 삽입
        print(list1,list2);
        list2.set(3,"AA");
        print(list1,list2);
        System.out.println("list1.retainAll(list2):"+ list1.retainAll(list2));// list1안에 list2과 같은 값이 있으면 참을 반환
        print(list1,list2);
        for(int i= list2.size()-1;i>=0;i--){
            if(list1.contains(list2.get(i)))
                list2.remove(i);
        }
        print(list1,list2);

    }
}
