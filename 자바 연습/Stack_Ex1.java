import java.util.*;
public class Stack_Ex1 {
    public static void main(String[] args){
        Stack st = new Stack();
        Scanner sc = new Scanner(System.in);
        System.out.println("수식을 입력하세요()");
        String expression = sc.nextLine();
        try{
            for(int i =0;i<expression.length();i++){
                char ch = expression.charAt(i);
                if(ch == '('){
                    st.push("");
                }else if(ch == ')'){
                    st.pop();
                }
            }
            if(st.isEmpty()){
                System.out.println("괄호가 일치합니다.");
            }
            else{
                System.out.println("괄호가 일치하지 않습니다.");
            }
        }catch(Exception e){
            System.out.println("괄호가 일치하지 않습니다.");
            e.printStackTrace();
        }
    }

}
