import java.util.ArrayList;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;

class Customer implements Runnable {//table과 food를 적어줘야함
    private Table table;
    private String food;

    Customer(Table table, String food) {
        this.food = food;
        this.table = table;
    }

    public void run() {
        while (true) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
            }
            String name = Thread.currentThread().getName();
            table.remove(food);
            System.out.println(name + " ate a " + food);
        }
    }
}
class Cook implements Runnable {//table을 적어줘야함
    private Table table;

    Cook(Table table) {
        this.table = table;
    }

    public void run() {
        while (true) {
            int idx = (int) (Math.random() * table.dishNum());
            table.add(table.dishNames[idx]);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
            }
        }
    }
}
class Table {
    String[] dishNames = {"donut", "donut", "burger"};
    final int MAX_FOOD = 6;
    private ArrayList<String> dishes = new ArrayList<String>();

    private ReentrantLock lock = new ReentrantLock();
    private Condition forCook = lock.newCondition();
    private Condition forCust = lock.newCondition();

    public void add(String dish) {
        lock.lock();
        try {
            while (dishes.size() >= MAX_FOOD) {
                String name = Thread.currentThread().getName();
                System.out.println(name + " is waiting.");
                try {
                    forCook.await();//Cook 쓰레드를 기다리게 함. await는 InterruptedException을 발생시킴
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                }
            }

            dishes.add(dish);
            forCust.signal();//Cust 쓰레드를 호출
            System.out.println("Dishes:" + dishes.toString());
        } finally {
            lock.unlock();
        }
    }
    public void remove(String dishName){
        lock.lock();
        String name = Thread.currentThread().getName();
        try{
            while(dishes.size() ==0){
                System.out.println(name+" is waiting.");
                try{
                    forCust.await();
                    Thread.sleep(500);
                }catch(InterruptedException e){}
            }
            while(true){
                for(int i=0;i<dishes.size();i++){
                    if(dishName.equals(dishes.get(i))){
                        dishes.remove(i);
                        forCook.signal();
                        return;
                    }
                }
                try{
                    System.out.println(name+" is waiting.");
                    forCust.await();
                    Thread.sleep(500);
                }catch(InterruptedException e){}
            }
        } finally{
            lock.unlock();
        }
    }
    public int dishNum(){
        return dishNames.length;
    }
}
public class ThreadEx14
{
    public static void main(String[] args) throws InterruptedException {
        Table table = new Table();
        //new Thread(new Cook(table),"Cook1").start();
        Thread COOK1 = new Thread(new Cook(table));
        Thread CUST1 = new Thread(new Customer(table,"donut"));
        Thread CUST2 = new Thread(new Customer(table,"burger"));
        COOK1.start();
        CUST1.start();
        CUST2.start();
        Thread.sleep(50000000);
        System.exit(0);
    }
}
