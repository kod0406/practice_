public class ThreadEx_12 {
    public static void main(String[] args){
        Runnable r = new ThreadEx12_1();
        Thread Th = new Thread(r);
        new Thread(r).start();
        new Thread(r).start();
        //Th.start();
    }
}
class Account{
    private int balance = 1000;
    public int getBalance(){
        return balance;
    }
    public synchronized void withdraw(int money){//synchronized를 붙히지 않으면 출금하는 순간에 다른 쓰레드가 출금을 수행하기에 음수가 나올 수 있음.
        if(balance>=money){//잔고가 더 많을시에만 실행
            try{
                Thread.sleep(1000);
            }catch(InterruptedException e){}
           balance -= money;
        }
    }
}

class ThreadEx12_1 implements Runnable{
    Account acc = new Account();
    public void run(){
        while(acc.getBalance()>0){
            int money = (int)(Math.random()*3+1)*100;
            acc.withdraw(money);
            System.out.println("balance:"+acc.getBalance());
        }
    }
}