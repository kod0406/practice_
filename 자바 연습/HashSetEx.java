import java.util.*;
public class HashSetEx {
    public static void main(String[] args){
        /*Set set = new HashSet();
        for(int i=0;set.size()<6;i++){
            int num = (int)(Math.random()*45)+1;//Hashset의 특징 1:중복 적용이 안됨
            set.add(new Integer(num));
        }
        List list = new LinkedList(set); //Hashset의 특징 2:순서에 상관이 없음 ->정렬 불가 -> 리스트로 저장해서 정렬해아함.
        Collections.sort(list);
        System.out.println(list);*/
        HashSet set = new HashSet();
        set.add(new Person("David",10));
        set.add(new Person("David",10));
        set.add(new Person2("Isaac",15));
        set.add(new Person2("Isaac",15));
        set.add("abc");
        set.add("abc");
        System.out.println(set);
    }
}
class Person{//이 클래스를 통해 Hashset을 저장하려고 하면, 같은 값인데도 저장이 됨 equals()와 hashCode()가 없기때문.
    String name;
    int age;
    Person(String name,int age){
        this.name = name;
        this.age = age;
    }
    public String toString() {
        return name + ":" + age;
    }
}

class Person2{
    String name;
    int age;

    Person2(String name,int age){
        this.name = name;
        this.age = age;
    }
    public boolean equals(Object obj){
        if(obj instanceof Person2){
            Person2 tmp = (Person2)obj; //명시적 향변환 -> 큰거에서 작은걸로 변환
            return name.equals(tmp.name) && age==tmp.age; //object에는 name이라는 필드가 없기 때문에 형변환
        }
        return false;
    }
    public int hashCode(){
        return (name+age).hashCode();
    }
    public String toString(){
        return name+":"+age;
    }
}