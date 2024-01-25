import java.util.*;

class tv{}
class audio{}

public class GenericsEx1 {
    public static void main(String[] args){
        // ArrayList list = new ArrayList(); //지네릭스를 사용하지 않는 원시타입
        ArrayList<tv> list = new ArrayList<tv>();
        list.add(new tv());
        // list.add(new audio()); tv타입만 삽입가능

        tv t = (tv)list.get(0);//8번쨰 줄을 사용할때는 반환타입이 Object라 형 변환 필수
        tv t1 = list.get(0); // 형변환 필요 X (tv 타입만 가능하기에)

    }
}
