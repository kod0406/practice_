import java.io.*;
import java.util.stream.*;
public class StreamEx3 {
    public static void main(String[] args){
        File[] fileArr = { new File("Ex1.exe"),
                new File("Isaac.class"),
                new File("Bain.txt"),
                new File("Wolf.bak"),
                new File("Coffee")};
        Stream<File> fileStream = Stream.of(fileArr);
        //File의 묶음으로 정의되어 있는 스트림
        Stream<String> filenameStream = fileStream.map(File::getName);
        //String의 묶음으로 스트림을 재정의
        filenameStream.forEach(System.out::println);

        Stream<File> fileStream2 = Stream.of(fileArr);
        Stream<String> filenameStream2 = fileStream2.map(File::getName);
        filenameStream2.filter(s -> s.indexOf('.')!=-1)
                .map(s -> s.substring(s.indexOf('.')+1))
                .map(String::toUpperCase).distinct().forEach(System.out::println);
    }
}
