import java.util.Calendar;

public class Make_Calendar {
    public static void main(String args[]){
        Calendar date = Calendar.getInstance();
        int year = date.get(Calendar.YEAR);
        int month = date.get(Calendar.MONTH);
        int start_day, end_day;
        Calendar sday = Calendar.getInstance();
        Calendar eday = Calendar.getInstance();
        sday.set(year, month, 1);
        eday.set(year, month + 1, 1);
        eday.add(Calendar.DATE, -1);
        start_day = sday.get(Calendar.DAY_OF_WEEK);//일요일을 1로 시작하여 계산함
        end_day = eday.get(Calendar.DATE);
        System.out.println("      " + year + "년 " + (month + 1) + "월");
        System.out.println(" SU MO TU WE TH FR SA");

        // 해당 월의 1일이 어느 요일인지에 따라서 공백을 출력한다.
        // 만일 1일이 수요일이라면 공백을 세 번 찍는다.(일요일부터 시작)
        for(int i = 1; i < start_day; i++)
            System.out.print("   ");

        for(int i = 1, n = start_day; i <= end_day; i++, n++) {
            System.out.print((i < 10) ? "  " + i : " " + i);
            if(n % 7 == 0) System.out.println();
        }
    }
}
