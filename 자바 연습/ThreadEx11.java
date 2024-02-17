public class ThreadEx11 {
    public static void main(String [] args){
        ThreadEx11_1 Th_1 = new ThreadEx11_1("*");
        ThreadEx11_1 Th_2 = new ThreadEx11_1("**");
        ThreadEx11_1 Th_3 = new ThreadEx11_1("***");
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
class ThreadEx11_1 implements Runnable{
    volatile boolean stopped = false;
    volatile boolean suspended = false;
    Thread th;
    ThreadEx11_1(String name){
        th = new Thread(this,name);
    }
    void start(){
        th.start();
    }
    void stop(){
        stopped = true;
    }
    void suspend(){
        suspended = true;
    }
    void join(long millis) throws InterruptedException {
        th.join(millis);
    }
    void resume(){
        suspended = false;
    }

    public void run(){
        while(!stopped){
            if(!suspended){
            System.out.println(Thread.currentThread().getName());
            try{
                Thread.sleep(1000);
            }catch(InterruptedException e){}
        }}
    }
}