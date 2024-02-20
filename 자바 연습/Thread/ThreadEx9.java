import javax.swing.JOptionPane;
public class ThreadEx9 {
    public static void main(String[] args){
        ThreadEx9_1 th1 = new ThreadEx9_1();
        th1.start();
        String input = JOptionPane.showInputDialog("카운트다운을 종료하려면 아무 값이나 입력하시오,");
        System.out.println("입력값은"+ input +"입니다.");
        th1.interrupt();
        System.out.println("isInterrupted():"+th1.isInterrupted());//th1의 인터럽트 여부를 확인
    }
}
class ThreadEx9_1 extends Thread{
    public void run(){
        int i = 10;
        while(i!= 0&& !isInterrupted()) {
            System.out.println(i--);
            try {
                Thread.sleep(1000);//sleep 상태에서 인터럽트를 걸어도 잠에서 깨어나면 isInterrupted는 false로 초기화됨
            } catch (InterruptedException e) {
                interrupt();//그렇기에 Interrupted 상태를 true로 변경해줘야함
            }
        }
        System.out.println("카운트가 종료되었습니다.");
    }
}