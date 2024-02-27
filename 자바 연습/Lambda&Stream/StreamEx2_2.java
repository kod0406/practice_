import java.util.*;
import java.util.stream.*;

class StreamEx2_2 {
    public static void main(String[] args) {
        Stream<StudentModified> studentStream = Stream.of(
                new StudentModified("이자바", 3, 300),
                new StudentModified("김자바", 1, 200),
                new StudentModified("안자바", 2, 100),
                new StudentModified("박자바", 2, 150),
                new StudentModified("소자바", 1, 200),
                new StudentModified("나자바", 3, 290),
                new StudentModified("감자바", 3, 180)
        );

        studentStream.sorted(Comparator.comparing(StudentModified::getBan)
                        .thenComparing(StudentModified::getName)) // 이름으로 정렬 추가
                .forEach(System.out::println);
    }
}

class StudentModified {
    String name;
    int ban;
    int totalScore;

    StudentModified(String name, int ban, int totalScore) {
        this.name = name;
        this.ban = ban;
        this.totalScore = totalScore;
    }

    public String toString() {
        return String.format("[%s, %d, %d]", name, ban, totalScore);
    }

    String getName() {
        return name;
    }

    int getBan() {
        return ban;
    }

    int getTotalScore() {
        return totalScore;
    }
}
