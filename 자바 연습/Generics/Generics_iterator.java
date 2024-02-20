import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

class MyList<T>{
    private List<T> elements;

    public MyList(){
        elements = new ArrayList<>();
    }
    public void add(T element){
        elements.add(element);
    }
    public Iterator<T> iterator(){
        return new MyListIterator();
    }
    private class MyListIterator implements Iterator<T>{
        private int index = 0;
        public boolean hasNext(){
            return index < elements.size();
        }
        public T next(){
            if (!hasNext()) {
                throw new IllegalStateException("No more elements in the list");
            }
            return elements.get(index++);
        }
    }
}

public class Generics_iterator {
    public static void main(String[] args){
        MyList<String> stringList = new MyList<>();//string 타입
        stringList.add("Java");
        stringList.add("Python");
        stringList.add("C");

        System.out.println("String List:");

        Iterator<String> stringIterator = stringList.iterator();
        while(stringIterator.hasNext()){
            System.out.println(stringIterator.next());
 //String 타입으로 저장되어 있고, add 함수를 오버라이딩 했고, MyList에 원소로 저장했기에 앞에 '.'을 안 붙힘
        }
    }
}
