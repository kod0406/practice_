import java.util.Calendar;

public class Main {
    public static void main(String[] args) {
        final String[] DAY_OF_WEEK = {"","일","월","화","수","목","금","토"};
        //요일은 1부터 시작하므로 index 0은 공백으로 지정
        Calendar date1 = Calendar.getInstance();
        Calendar date2 = Calendar.getInstance();
        //month는 0부터 시작하므로
        date1.set(2001, 3,13);
        System.out.println("태어난 날은 "+ toString(date1)+DAY_OF_WEEK[date1.get(Calendar.DAY_OF_WEEK)]+"요일");
        System.out.println("오늘은 "+ toString(date2)+DAY_OF_WEEK[date2.get(Calendar.DAY_OF_WEEK)]+"요일");
        //두 날짜의 차이를 얻으려면, getTimeInMillis()(밀리세컨트)/1000을 해야됨
        long difference = (date2.getTimeInMillis()-date1.getTimeInMillis())/1000;
        System.out.println("현재 태어난지 "+ difference+"초 지났습니다.");
        System.out.println("Day(일)로 계산하면 "+difference/(60*60*24)+"일 입니다");
    }
    public static String toString(Calendar date) {
        return date.get(Calendar.YEAR)+"년"+
                (date.get(Calendar.MONTH)+1)+"월"+date.get(Calendar.DATE)+"일";
    }
    }
