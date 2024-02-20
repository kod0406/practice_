public class ThreadEx10 {
    public static void main(String [] args){
        Runnable r = new ThreadEx10_2();
        Thread Th_1 = new Thread(r,"*");
        Thread Th_2 = new Thread(r,"**");
        //Thread Th_2 = new Thread(new ThreadEx10_2());
        Thread Th_3 = new Thread(r,"***");
        Th_1.start();
        Th_2.start();
        Th_3.start();
        try{
            Thread.sleep(2000);
            Th_1.suspend();//suspend(),resume(),stop()은 애너태이션으로 Deprecated(사용 자제)되어 있음
            Thread.sleep(2000);
            Th_2.suspend();
            Thread.sleep(2000);
            Th_1.resume();
            Thread.sleep(2000);
            Th_2.resume();
            Thread.sleep(2000);
            Th_1.stop();
            Th_2.stop();
            Thread.sleep(2000);
            Th_3.stop();
        }catch(InterruptedException e){}
    }
}
class ThreadEx10_2 implements  Runnable{

    public void run(){
        while(true){
            System.out.println(Thread.currentThread().getName());
            try{
                Thread.sleep(1000);
            }catch(InterruptedException e){}
        }
    }
}