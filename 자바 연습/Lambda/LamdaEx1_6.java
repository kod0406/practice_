/*
@FunctionalInterface
interface StringConverter{
    String converter(String Line);
}
public class LamdaEx1_6 {
    public static String ConverterFunction(StringConverter sct,String Sentence){
        return sct.converter(Sentence);
    }
    public static void main(String[] args) {
        StringConverter toLowerCaseConverter = input -> input.toLowerCase();
        String result1 = ConverterFunction(toLowerCaseConverter, "Hello, World!");
        System.out.println("Lowercase Result: " + result1);

        StringConverter toUpperCaseConverter = input -> input.toUpperCase();
        String result2 = ConverterFunction(toUpperCaseConverter, "Lambda Functions");
        System.out.println("Uppercase Result: " + result2);
    }
}
*/
