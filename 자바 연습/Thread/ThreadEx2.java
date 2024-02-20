public class ThreadEx2 {
    public static void main(String[] args) throws Exception {
        ThreadEx2_1 t1 = new ThreadEx2_1();
        t1.start();
    }
}

class ThreadEx2_1 extends Thread {
    public void run() {
        throwException();//쓰레드가 시작되면 오류를 발생
    }

    public void throwException() {
        try {
            throw new Exception();
        } catch (Exception e) {
            e.printStackTrace();//예외가 발생한 호출스택을 출력
        }
    }
}
/*
at ThreadEx2_1.throwException(ThreadEx2.java:15)
at ThreadEx2_1.run(ThreadEx2.java:10) -> main 메서드는 종료되었다는 것을 알 수 있음
	*/

