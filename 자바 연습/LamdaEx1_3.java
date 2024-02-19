@FunctionalInterface
interface Comparison {
    boolean compare(int a, int b);
}

public class LamdaEx1_3 {
    static boolean compareNumbers(Comparison comparison,int num1,int num2){ // 인터페이스 Comparison를 매개로 받는 매개변수를 만듦
        return comparison.compare(num1,num2);//매개변수.인터페이스 이름
    }
    public static void main(String[] args){
        Comparison greaterThan = (a,b) -> a>b;
        Comparison equalTo = (a,b) -> a == b;
        boolean result1 = compareNumbers(greaterThan,10,5);
        boolean result2 = compareNumbers(equalTo,10,5);
        System.out.println("10은 5보다 큰가? "+result1);
        System.out.println("10은 5와 같은가? "+result2);
    }
}
