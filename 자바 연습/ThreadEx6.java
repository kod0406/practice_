public class ThreadEx6 implements Runnable{
    static boolean autoSave = false;
    public static void main(String[]args){
        Thread t = new Thread(new ThreadEx6());
        t.setDaemon(true);
        t.start();
        for(int i=1;i<=10;i++){
            try{
                Thread.sleep(1000);
            }catch(InterruptedException e){}
            System.out.println(i);
            if(i==5)
                autoSave = true;
        }
        System.out.println("프로그램을 종료합니다.");
    }
    public void run(){
        while(true){//무한 반복이지만,데몬 쓰레드(보조 쓰레드)이므로 일반 쓰레드가 종료되면 같이 종료됨.
            try{
                Thread.sleep(3000);

            }catch(InterruptedException e){}
            if(autoSave){
                autoSave();
            }
        }
    }
    public void autoSave(){
        System.out.println("작업파일을 자동 저장되었습니다.");
    }
}
