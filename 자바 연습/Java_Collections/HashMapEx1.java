import java.util.*;
public class HashMapEx1 {
    public static void main(String[] args){
        HashMap map = new HashMap();
        map.put("myid","1234");
        map.put("qwer","4568");
        map.put("qwer","7894"); //기존의 값인 4568이 아닌 7894로 변경됨
        Scanner s = new Scanner(System.in);
        while(true){
            System.out.println("id와 pw를 입력하시오.");
            System.out.println("id");
            String id = s.nextLine().trim();

            System.out.println("pw");
            String pw = s.nextLine().trim();
            System.out.println();

            if(!map.containsKey(id)){
                System.out.println("입력하신 id는 존재하지 않습니다.");
                continue;
            }
            if(!(map.get(id).equals(pw))){
                System.out.println("비밀번호가 일치하지 않습니다.");
            } else{
                System.out.println("id와 pw가 일치합니다.");
                break;
            }
        }
    }
}
