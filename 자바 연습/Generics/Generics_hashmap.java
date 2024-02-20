import java.util.*;

class Student{
    private String name;
    private int age;
    public Student(String name,int age){
        this.name = name;
        this.age = age;
    }
    public String getName(){
        return name;
    }
    public int getAge(){
        return age;
    }
}
public class Generics_hashmap {
    public static void main(String[] args){
        Map<Integer,Student> studentMap = new HashMap<>();
        //hashMap은 키와 값으로 정보를 저장함.
        studentMap.put(101,new Student("Alice",20));
        studentMap.put(102,new Student("Bob",22));
        studentMap.put(103,new Student("Charlie",21));
        System.out.println("Student name");
        Iterator<String> studentNameIterator = new StudentNameIterator(studentMap);//커스텀한 클래스 사용
        while (studentNameIterator.hasNext()) {
            System.out.println(studentNameIterator.next());
        }
    }
}
class StudentNameIterator implements Iterator<String>{//Iterator가 HashMap을 출력하기 위해 클래스 생성
    private Iterator<Map.Entry<Integer, Student>> entryIterator;

    public StudentNameIterator(Map<Integer, Student> studentMap) {
        this.entryIterator = studentMap.entrySet().iterator();
    }

    @Override
    public boolean hasNext() {
        return entryIterator.hasNext();
    }

    @Override
    public String next() {
        if (!hasNext()) {
            throw new IllegalStateException("No more elements in the iterator");
        }
        return entryIterator.next().getValue().getName();
    }
}
