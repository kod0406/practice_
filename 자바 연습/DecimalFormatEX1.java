import java.text.DecimalFormat;
import java.time.*;
public class DecimalFormatEX1 {
    public static void main(String args[]){
        double number = 12345.6789;
        String[] pattern = {
                "0",
                "#",
                "0.0",
                "#.#",
                "000000000.0000",
                "#########.####",
                "-#.#",
                "#,###.##",
                "#E0",
                "0E0",
                "##E0",
                "00E0",
                "####E0",

        };
        for(int i=0;i<pattern.length;i++){
            DecimalFormat df = new DecimalFormat(pattern[i]);
            System.out.printf("%19s : %s\n",pattern[i],df.format(number));
        }
    }
}
