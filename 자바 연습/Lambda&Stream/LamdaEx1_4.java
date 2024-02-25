@FunctionalInterface
interface multORsquare {
    int operator(int a, int b);
}
public class LamdaEx1_4 {
    public static int Calculate(multORsquare opt,int a,int b){
        return opt.operator(a,b);
    }
    public static void main(String[] args){
        multORsquare mult = (a,b) -> a*b;
        multORsquare square = (a,b) -> (int) Math.pow(a,b);
        int rst1 = Calculate(mult,5,3);
        int rst2 = Calculate(square,5,3);
        System.out.println("5*3의 값은: "+rst1);
        System.out.println("5^3의 값은: "+rst2);
    }
}
