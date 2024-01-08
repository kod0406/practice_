package Java_Essential_1;

import java.util.Scanner;

/*public class Exception_handing {
	
	static void method1() throws Exception {
		method2();
	}
	
	static void method2() throws Exception{
		throw new Exception();
	}
	
	public static void main(String args[]) throws Exception {
		method1();
	}
} //콘솔 오류창을 통해 해당 코드는 3개의 메서드가 호출스택에 있었으며, 스택의 역순대로 예외를 출력하였다.*/

/*public class Exception_handing{
	
	static void method1() {
		try {
			throw new Exception();
		}catch(Exception e) {
			System.out.println("method1 에서 오류처리 발생");
			e.printStackTrace();
		}
	}
	
	public static void main(String args[]) {
		method1();
	}
}*/

class Notsufficient extends Exception{//잔고 이상으로 출금을 할려고할때 나오는 예외 
	Notsufficient(String msg) {//예외변수를 매게변수로 받음
		super(msg);
	}
}

class Account{
	private int money;
	public Account(int input) {
		this.money = input;
	}
	public void Check() {
		System.out.println("현재 잔고는 "+money+"원 입니다.");
	}
	
	public void Deposit(int total) {
		money += total;
		System.out.printf("현재 잔고에 %d를 입금하여 현재 %d원이 있습니다.\n",total,money);
	}
	public void withdraw(int total) throws Notsufficient{//예외 처리를 발생시키는 함수(잔고 부족시)
		if( money- total <= 0) {
			throw new Notsufficient("잔고가 부족합니다.");
		}
		else {
			money -= total;
			System.out.printf("현재 잔고에 %d를 출금하여 현재 %d원이 있습니다.\n",total,money);
		}
	}
}

public class Exception_handing{
	public static void main(String args[]){
		Scanner s = new Scanner(System.in);
		Account ac = new Account(0);
		String input;
		int money;
		do {
			System.out.println("사용할 시스템을 입력하세요...\n1.출금\n2.입금\n3.잔고 확인\n4.종료");
			input = s.nextLine();
			try {
				if(input.equals("출금")) {
					System.out.println("출금할 금액을 입력하세요.");
					money = s.nextInt();
					s.nextLine();// 버퍼 초기화를 위한 라인
					ac.withdraw(money);
				}
				else if(input.equals("입금")) {
					System.out.println("입금할 금액을 입력하세요.");
					money = s.nextInt();// 79와 동일
					s.nextLine();
					ac.Deposit(money);
				}
				else if(input.equals("잔고 확인")) {
					ac.Check();
				}
				
			}catch(Notsufficient e){/*Withdraw가 예외를 발생시키므로 try-catch를 사용해야함. 사용을 안 할시,
Exception in thread "main" Java_Essential_1.Notsufficient: 잔고가 부족합니다.
	at Java_Essential_1.Account.withdraw(Exception_handing.java:57)
	at Java_Essential_1.Exception_handing.main(Exception_handing.java:115) 발생*/
				System.out.println(e.getMessage());//예외클래스의 인스턴스에 저장된 메시지를 받음.
			}
		}while(!input.equals("종료"));
		System.out.println("프로그램을 종료합니다.");
		s.close();
	}
}





