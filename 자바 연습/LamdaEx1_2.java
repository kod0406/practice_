@FunctionalInterface
interface MathOperation{
    int operate(int a,int b);
}

class LamdaEx1_2{
    static int calculate(MathOperation operation,int operand1,int operand2){
        return operation.operate(operand1,operand2);
    }
    public static void main(String[] args){
        MathOperation addition = (a,b) -> a+b;
        MathOperation subtraction = (a,b) -> a-b;
        int result1 = calculate(addition,5,3);
        System.out.println("Add result:"+result1);
        int result2 = calculate(subtraction,5,3);
        System.out.println("sub result:"+result2);
    }
}