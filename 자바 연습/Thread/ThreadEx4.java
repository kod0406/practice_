public class ThreadEx4 {
    static long startTime = 0;
    public static void main(String[] args){
        ThreadEx4_1 th1 = new ThreadEx4_1();
        ThreadEx4_2 th2 = new ThreadEx4_2();
        th1.start();
        th2.start();
        startTime = System.currentTimeMillis();
        try {
            th1.join();	// main쓰레드가 th1의 작업이 끝날 때까지 기다린다.
            th2.join();	// main쓰레드가 th2의 작업이 끝날 때까지 기다린다.
        } catch(InterruptedException e) {}

        System.out.print("소요시간:" + (System.currentTimeMillis() - ThreadEx4.startTime));
    }
}

class ThreadEx4_1 extends Thread {
    public void run() {
        for(int i=0; i < 300; i++) {
            System.out.print(new String("-"));
        }
    }
}

class ThreadEx4_2 extends Thread{
    public void run(){
        for(int i=0;i<300;i++){
            System.out.print(new String("|"));
        }
    }
}