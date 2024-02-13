import java.lang.annotation.*;
@Deprecated //사용을 권하지 않음을 나타내는 애너테이션
@SuppressWarnings("blarblar")//유효하지 않은 애너테이션은 무시됨
@TestInfo(testedBy="aaa", testDate=@DateTime(yymmdd="160101",hhmmss="235959"))
public class Annoatation_Ex {
    public static void main(String[] args){
        //해당 클래스의 Class객체를 얻는다.
        Class<Annoatation_Ex> cls = Annoatation_Ex.class;

        TestInfo anno = cls.getAnnotation(TestInfo.class);
        System.out.println("anno.testedBy()="+anno.testedBy());
        System.out.println("anno.testDate().yymmdd()="+anno.testDate().yymmdd());
        System.out.println("anno.testDate().hhmmss()="+anno.testDate().hhmmss());

        for(String str: anno.testTools())
            System.out.println("TestTools="+str);
        System.out.println();
        //적용된 모든 애너테이션을 가져옴
        Annotation[] annoArr = cls.getAnnotations();

        for(Annotation a : annoArr)
            System.out.println(a);
    }
}
@Retention(RetentionPolicy.RUNTIME)
@interface TestInfo {
    int       count()	  	default 1;
    String    testedBy();
    String[]  testTools() 	default "JUnit";
    TestType  testType()    default TestType.FIRST;
    DateTime  testDate();
}

@Retention(RetentionPolicy.RUNTIME)
@interface DateTime{
    String yymmdd();
    String hhmmss();
}
enum TestType{FIRST,FINAL}
/*애너테이션의 규칙
1.요소 안의 타입은 기본형,String,enum,애너테이션,Class(클래스의 요소 확인)만 허용
2.()안에 매개변수 선언 X
3.예외를 선언할 수 X
4.요소를 타입 매개변수로 정의할 수 X
*/