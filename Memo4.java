package exam;

import java.util.Scanner;

public class Memo4 {
	public static void main(String[]args) {
		Scanner s = new Scanner(System.in);
		int seat[][]=new int[4][5];
		while(true) {
			System.out.println("어느 자리를 예약하겠습니까?");
			int x = s.nextInt();
			int y = s.nextInt();
			if(x==-1||y==-1) {
				System.out.println("잘못된 수를 입력했습니다.");
				break;
			}
			else if(x>4||y>5) {
				System.out.println("잘못 입력했습니다.");
			}
			else {
				if(seat[x][y]==1) {
					System.out.println("그 자리는 예약되어 있습니다.");
				}
				else {
					seat[x][y]=1;
					System.out.println("예약되었습니다.");
				}
			}
		}
	}
}
//예약 프로그램
