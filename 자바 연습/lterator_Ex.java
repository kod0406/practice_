import java.util.*;

public class lterator_Ex {
    public static void main(String[] args){
        ArrayList list = new ArrayList();
        list.add("Java");
        list.add("C");
        list.add("Python");
        list.add("C#");
        Iterator it = list.iterator();
        while(it.hasNext()){//읽어 올 요소가 남아 있으면
            String lang = (String) it.next();
            /*.next()는 object 타입을 반환하기에 String에 저장하기
            위해서는 String으로 형변환을 해줘야함*/
            System.out.println(lang);
        }
    }
}
