@FunctionalInterface
interface MyFunction2{
    void MyMethod();
}
class Outer{
    int val = 10;
    class inner{
        int val = 20;
        void method(int i){
            int val = 30;
            i = 10;//'i'(으)로 대입된 값 '10'이(가) 사용되지 않습니다
            MyFunction2 f = () ->{
                System.out.println("i :"+i);
                System.out.println("val :"+ val);
                System.out.println("this.val :"+ ++this.val);
                System.out.println("Outer.this.val :"+ ++Outer.this.val);
                f.MyMethod();
            }
        }
    }
}
public class LamdaEx2 {
    public static void main(String[] args){
        Outer outer = new Outer();
        Outer.inner inner = outer.new inner();//내부 클래스(inner class)에 접근하기 위해 객체 2번 생성
        // outer 객체를 만들어서 inner 객체를 생성하고, 이를 통해 내부 클래스의 메소드를 호출
        inner.method(100);
    }
}
