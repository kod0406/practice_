import java.util.Calendar;

public class CalendarEx {
    public static String toString(Calendar cl){//그냥 출력하면 모든 필드의 값이 출력됨
        return cl.get(Calendar.YEAR)+"년"+(cl.get(Calendar.MONTH)+1)+"월"+cl.get(Calendar.DATE)+"일";
    }
    public static void main(String args[]){
        Calendar cl = Calendar.getInstance();
        System.out.println(toString(cl));
        cl.roll(Calendar.MONTH,1);
        System.out.println(toString(cl));
    }
}
