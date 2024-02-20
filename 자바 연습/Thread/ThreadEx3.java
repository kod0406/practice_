public class ThreadEx3 {
    public static void main(String[] args)
        throws Exception{
            ThreadEx3_1 t1 = new ThreadEx3_1();
            t1.run();
    }
}


class ThreadEx3_1 implements Runnable {
    public void run() {
        throwException();
    }

    public void throwException() {
        try {
            throw new Exception();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


/*
at ThreadEx3_1.throwException(ThreadEx3.java:17)
at ThreadEx3_1.run(ThreadEx3.java:12)
at ThreadEx3.main(ThreadEx3.java:5) ->run 매서드를 호출하였기에 쓰레드가 생성되지 않음
*/
