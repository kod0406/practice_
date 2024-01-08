package Java_Essential_1;

import java.util.*;

public class Five_integer {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		int num1 = 0, num2 = 0, num3 = 0, num4 = 0, num5 = 0, Max = 0, Min = 0;
		System.out.println("첫번째 숫자를 입력하세요.");
		num1 = scanner.nextInt();
		if(num1<1||num1>10) {//num의 범위를 1이상 10이하로 제한하기 위한 조건
			System.out.println("유효한 범우의 값을 입력하시오");
			scanner.close();
			return; //유효값이 아닐때 프로그램 종료
		}
		System.out.println("두번째 숫자를 입력하세요.");
		num2 = scanner.nextInt();
		if(num2<1||num2>10) {
			System.out.println("유효한 범우의 값을 입력하시오");
			scanner.close();
			return;
		}
		System.out.println("세번째 숫자를 입력하세요.");
		num3 = scanner.nextInt();
		if(num3<1||num3>10) {
			System.out.println("유효한 범우의 값을 입력하시오");
			scanner.close();
			return;
		}
		System.out.println("네번째 숫자를 입력하세요.");
		num4 = scanner.nextInt();
		if(num4<1||num4>10) {
			System.out.println("유효한 범우의 값을 입력하시오");
			scanner.close();
			return;
		}
		System.out.println("다섯번째 숫자를 입력하세요.");
		num5 = scanner.nextInt();
		if(num5<1||num5>10) {
			System.out.println("유효한 범우의 값을 입력하시오");
			scanner.close();
			return;
		}
		
		Max = num1;//최댓값을 찾기위해 If문 사용
		if(num2>Max) {
			Max = num2;
		}
		if(num3>Max) {
			Max = num3;
		}
		if(num4>Max) {
			Max = num4;
		}
		if(num5>Max) {
			Max = num5;
		}
		
		Min = num1;//최솟값을 찾기 위해 If문 사용
		if(num2<Min) {
			Min = num2;
		}
		if(num3<Min) {
			Min = num3;
		}
		if(num4<Min) {
			Min = num4;
		}
		if(num5<Min) {
			Min = num5;
			}
		System.out.printf("다섯 숫자들 중에서 가장 큰 숫자는 %d, 가장 작은 숫자는 %d입니다. 이들의 합은 %s입니다.",Max,Min,Max+Min);
		scanner.close();
	}
}
