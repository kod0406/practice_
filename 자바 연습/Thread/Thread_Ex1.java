class Thread_Ex1 {
	public static void main(String args[]) {
		ThreadEx1_1 t1 = new ThreadEx1_1();

		Runnable r = new ThreadEx1_2();
		Thread t2 = new Thread(r);	  // 생성자 Thread(Runnable target)

		t1.start();
		t2.start();
	}
}
/*왜 run()이 아닌 .start()를 실행하는 이유
run을 사용하면 현재 프로세스 스택에 run이라는 함수가 실행됨
하지만, start()를 사용하면 새로운 프로세스 스택이 생성되고, 거기에서 run()이 동작함
*/
class ThreadEx1_1 extends Thread {
	public void run() {
		for(int i=0; i < 5; i++) {
			System.out.println(getName()); // 조상인 Thread의 getName()을 호출
		}
	}
}

class ThreadEx1_2 implements Runnable {
	public void run() {
		for(int i=0; i < 5; i++) {
			// Thread.currentThread() - 현재 실행중인 Thread를 반환한다.
			System.out.println(Thread.currentThread().getName());
		}
	}
}