import java.util.Arrays;
public class ArraysEx {

    public static void main(String[] args){

        int[] arr ={0,1,2,3,4};
        int[][] arr2D = {{11,12,13},{21,22,23}};
        System.out.println("arr="+Arrays.toString(arr));
        System.out.println("arr2D="+Arrays.toString(arr2D)); //2차원 배열이 저장되어있는 메모리의 주소 출력
        System.out.println("arr2D="+Arrays.deepToString(arr2D));//2차원 배열을 toString으로 출력하려면 deepToString() 사용

        int[] arr2 = Arrays.copyOf(arr,arr.length);//arr의 길이만큼 arr을 복사
        int[] arr3 = Arrays.copyOf(arr,3);//3의 길이만큼 arr을 복사
        int[] arr4 = Arrays.copyOf(arr,7);//7의 길이만큼 arr을 복사,남는 공간은 0으로
        int[] arr5 = Arrays.copyOfRange(arr,2,4);//arr을 2번 인덱스부터 4번 인덱스까지 복사
        int[] arr6 = Arrays.copyOfRange(arr,0,7);//arr을 0번 인덱스부터 7번 인덱스까지 복사,없으면 0 채워넣기

        System.out.println("arr2="+Arrays.toString(arr2));
        System.out.println("arr3="+Arrays.toString(arr3));
        System.out.println("arr4="+Arrays.toString(arr4));
        System.out.println("arr5="+Arrays.toString(arr5));
        System.out.println("arr6="+Arrays.toString(arr6));

        int[] arr7 = new int[5];
        Arrays.fill(arr7,9);//arr7을 9로 채워넣기
        System.out.println("arr7="+Arrays.toString(arr7));

        Arrays.setAll(arr7,i ->(int)(Math.random()*6)+1);//arr7에 난수 넣기
        System.out.println("arr7="+Arrays.toString(arr7));

        for(int i : arr7){
            char[] graph = new char[i];
            Arrays.fill(graph,'*');//arr7에 있는 각 배열의 숫자만큼 *을 넣기
            System.out.println(new String(graph)+i);
        }

        String[][] str2D = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};
        String[][] str2D2 = new String[][]{{"aaa","bbb"},{"AAA","BBB"}};
        System.out.println(Arrays.equals(str2D,str2D2));//이중배열 str2D와 str2D2의 주소가 같은지 비교
        System.out.println(Arrays.deepEquals(str2D,str2D2));//이중배열 str2D와 str2D2의 값이 같은지 비교

        char[] chArr ={'A','E','B','C','D'};
        System.out.println("chArr="+Arrays.toString(chArr));
        System.out.println("index of B ="+Arrays.binarySearch(chArr,'B'));//이진탐색, 정렬되어 있어야함
        System.out.println("=====AFTER THE SORT=====");
        Arrays.sort(chArr);//정렬
        System.out.println("chArr="+Arrays.toString(chArr));
        System.out.println("index of B ="+Arrays.binarySearch(chArr,'B'));
    }
}
