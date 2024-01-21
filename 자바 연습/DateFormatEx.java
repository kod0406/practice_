import java.text.SimpleDateFormat;
import java.util.*;
import java.time.*;

public class DateFormatEx {
    public static void main(String args[]){
        Date today = new Date();
        SimpleDateFormat[] sdf = new SimpleDateFormat[9];

        sdf[0] = new SimpleDateFormat("yyyy-MM-dd");// y = 년도,M = 월(1~12), d = 월의 몇 번째 요일(1~31)
        sdf[1] = new SimpleDateFormat("''yy년 MMM dd일 E요일");// E = 요일
        sdf[2] = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");// H = 시간(0~23), m = 분(0~59), s = 초, S = 밀리초
        sdf[3] = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss a");// h = 시간(1~12) , a = 오전/오후
        sdf[4] = new SimpleDateFormat("오늘은 올 해의 D번째 날입니다.");// D = 년의 몇번쨰 일(1~366)
        sdf[5] = new SimpleDateFormat("오늘은 이 달의 d번째 날입니다.");
        sdf[6] = new SimpleDateFormat("오늘은 올 해의 w번째 주입니다.");// w = 년의 몇번째 주(1~53)
        sdf[7] = new SimpleDateFormat("오늘은 이 달의 W번째 주입니다.");// W = 월의 몇번째 주(1~5)
        sdf[8] = new SimpleDateFormat("오늘은 이 달의 F번째 E요일 입니다,");// F = 월의 몇번째 요일
        for(int i =0;i<9;i++){
            System.out.println(sdf[i].format(today));
        }

    }
}
