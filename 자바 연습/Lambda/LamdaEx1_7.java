interface Adder {
    int add(int a, int b);
}
public class LamdaEx1_7 {
    public static void main(String[] args) {
        // 람다식을 사용하여 두 숫자 더하기
        Adder adder = (a, b) -> a + b;//Adder는 함수형 인터페이스를 구현한 익명 개체

        // 사용
        int sum = adder.add(3, 7);
        System.out.println("Sum of 3 and 7: " + sum);
    }
}/*
장점:
1)직관적으로 함수의 기능이 덧셈이라는 것을 나타낸다.
2)간결하다.
단점:
1)두 숫자를 더하는 간단한 연산만 가능하기에 확정성이 떨어짐.
*/

/*
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

public class LamdaEx1_7 {
    static int calculate(MathOperation operation, int operand1, int operand2) {
        return operation.operate(operand1, operand2);
    }

    public static void main(String[] args) {
        MathOperation addition = (a, b) -> a + b;
        int result1 = calculate(addition, 5, 3);
        System.out.println("Add result: " + result1);
    }
}

위의 코드와의 차이점:
calculate 함수를 통해 기능을 추가 할 수 있다는 장점이 있다.
*/