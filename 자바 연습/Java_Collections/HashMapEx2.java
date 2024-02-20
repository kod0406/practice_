import java.util.*;
public class HashMapEx2 {
    public static void main(String[] args){
        HashMap map = new HashMap();
        map.put("김",new Integer(100));
        map.put("이",new Integer(90));
        map.put("박",new Integer(80));
        map.put("최",new Integer(70));
        Set set = map.entrySet(); //Hash에 지정된 키와 값을 키와 값으 결합의 형태로 set에 저장하여 반환
        Iterator it = set.iterator();

        while(it.hasNext()){
            Map.Entry e = (Map.Entry)it.next();
            System.out.println("이름"+e.getKey()+"점수"+e.getValue());
        }
        set = map.keySet();
        System.out.println("참가자 명단 : "+set);
        Collection values = map.values();
        it = values.iterator();

        int total = 0;

        while(it.hasNext()) {
            int i = (int)it.next();
            total += i;
        }

        System.out.println("총점 : " + total);
        System.out.println("평균 : " + (float)total/set.size());
        System.out.println("최고점수 : " + Collections.max(values));
        System.out.println("최저점수 : " + Collections.min(values));
    }
    }

