import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

class Customer implements  Comparable<Customer>{
    private String name;
    private int age;
    public Customer(String name,int age){
        this.name = name;
        this.age = age;
    }
    public int getAge(){
        return age;
    }
    public String getName(){
        return name;
    }
    public String toString(){
        return "[Name"+name+"age"+age+"]";
    }
    public boolean equals(Object o){
        if(this == o) return true;
        if(o == null || getClass() != o.getClass())return false;
        Customer customer = (Customer) o;
        return  name.equals(customer.name);
    }
    public int compareTo(Customer customer){
        if(this.age > customer.getAge()){
            return 1;
        }else if(this.age == customer.getAge()){
            return  0;
        }else {
            return -1;
        }
    }
    public int hashCode(){
        return name.hashCode();
    }
}
public class StreamEx1_1 {
    public static void main(String[] args){
        List<Customer> customers = new ArrayList<Customer>();
        customers.add(new Customer("Isaac",58));
        customers.add(new Customer("Cain",10));
        customers.add(new Customer("Eve",15));
        customers.add(new Customer("Eden",33));
        customers.add(new Customer("Wolf",32));
        List<Customer> list = new ArrayList<Customer>();

        List<String> customerNames = customers.stream()
                .filter(customer -> customer.getAge()>30).sorted().map(Customer::getName)
                .collect(Collectors.toList()); // 스트림 사용 O
        for(String name:customerNames){
            System.out.println(name);
        }
/*        for(Customer customer: customers){//스트림 사용 X
            if(customer.getAge()>30){
                list.add(customer);
            }
        }
        Collections.sort(list);
        List<String> result = new ArrayList<>();
        for (Customer customer:list){
            result.add(customer.getName());
        }
        for(String name:result){
            System.out.println(name);
        }*/
    }
}
