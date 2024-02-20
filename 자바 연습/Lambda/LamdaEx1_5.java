@FunctionalInterface
interface Calculator{
    double calculate(double operand1, double operand2);
}
public class LamdaEx1_5 {
    public static double performCalulator(Calculator calculator,double num1,double num2){
        return calculator.calculate(num1,num2);
    }
    public static void main(String[] args){
        Calculator add = (a,b) -> a+b;
        Calculator mult = (a,b) -> a*b;
        double result1 = performCalulator(add, 3.5, 2.0);
        System.out.println("Addition Result: " + result1);

        double result2 = performCalulator(mult, 4.0, 1.5);
        System.out.println("Multiplication Result: " + result2);
    }
}
