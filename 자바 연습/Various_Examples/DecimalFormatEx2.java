import java.text.*;
public class DecimalFormatEx2 {
    public static void main(String args[]){
        DecimalFormat df = new DecimalFormat("#,###.##");
        DecimalFormat df2 = new DecimalFormat("#.###E0");
        try{
            // System.out.print(Double.parseDouble("1,234,567.89")); parseint,double은 ,가 있는걸 못 바꿈
            Number num = df.parse("1,234,567.89");
            System.out.println("1,234,567.89" + "->");
            double d = num.doubleValue();
            System.out.println(d + "->");
            System.out.println(df2.format(num));

        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
