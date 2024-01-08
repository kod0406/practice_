package Java_Essential_1;

import java.util.Scanner;

class palindrome{
	static void is_palindrome(String input) {//객체 생성하지 않고 쓰기 위해 static으로 함수 생성
		input = input.toLowerCase();
		int len = input.length();
		for(int i=0;i<len/2;i++) {
			char part = input.charAt(i);
			char part2 = input.charAt(len-i-1);
			if(part != part2) {
				System.out.println("회문이 아닙니다.");
				break;
			}
			else {
				System.out.println("회문입니다.");
			}
		}
		}
	}

class palindrome_loop{
	Scanner s2 = new Scanner(System.in);
	void loop_palindrome() {
	System.out.println("문자열을 입력하세요. 회문일때까지 계속 반복됩니다.");
	int res = 0;
	while(res != 2) {// 탈출조건 res가 2이면 탈출 
		String input = s2.nextLine();
		int len = input.length();
		for(int i=0;i<len/2;i++) {
			char part = input.charAt(i);
			char part2 = input.charAt(len-i-1);
			if(part != part2) {
				System.out.println("회문이 아닙니다.");
				break;
			}
			else {
				System.out.println("회문이 맞습니다.");
				res = 2;
				break;
			}
		}
	}
	}
}

public class Palindrome_test {
	public static void main(String args[]) {
		
		Scanner s = new Scanner(System.in);
		System.out.println("문자열을 입력하세요.");
		String input = s.nextLine();
		palindrome.is_palindrome(input);
		palindrome_loop pl = new palindrome_loop();
		pl.loop_palindrome();
		s.close();
	}
}
