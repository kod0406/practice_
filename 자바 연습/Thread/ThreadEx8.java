import javax.swing.JOptionPane;
public class ThreadEx8 {
    public static void main(String[] args){
        ThreadEx8_1 th1 = new ThreadEx8_1();
        th1.start();
        String input = JOptionPane.showInputDialog("카운트다운을 종료하려면 아무 값이나 입력하시오,");
        System.out.println("입력값은"+ input +"입니다.");
        th1.interrupt();
        System.out.println("isInterrupted():"+th1.isInterrupted());//th1의 인터럽트 여부를 확인
        System.out.println("main Interrupted():"+Thread.interrupted());//main매서드의 인터럽트 여부 확인,Thread.interrupted()는 현재 쓰레드만 한정임
    }
}
class ThreadEx8_1 extends Thread{
    public void run(){
        int i = 10;
        while(i!= 0&& !isInterrupted()){
            System.out.println(i--);
            for(long x=0;x<2500000000L;x++);
        }
        System.out.println("카운트가 종료되었습니다.");
        System.out.println("ThreadEx8_1 Interrupted():"+Thread.interrupted());
    }
}