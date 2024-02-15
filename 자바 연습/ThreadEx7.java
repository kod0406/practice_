public class ThreadEx7 {
    public static void main(String[]args){
        ThreadEx7_1 th1 = new ThreadEx7_1();
        ThreadEx7_2 th2 = new ThreadEx7_2();
        th1.start();
        th2.start();

        try{
            th1.sleep(3000);
            //Thread.sleep(3000); sleep의 특징 1)상대 쓰레드가 아닌 자신이 자는 것 2)catch문에 InterruptedException 예외처리로 Sleep이 종료되기에 try-catch문 사용
        }catch (InterruptedException e){}
        System.out.print("<<<main 종료>>>");
    }
}
class ThreadEx7_1 extends Thread{
    public void run(){
        for(int i=0;i<300;i++){
            System.out.print("-");
        }
        System.out.print("<<<Th1 종료>>>");
    }
}

class ThreadEx7_2 extends Thread{
    public void run(){
        for(int i=0;i<300;i++){
            System.out.print("|");
        }
        System.out.print("<<<Th2 종료>>>");
    }
}