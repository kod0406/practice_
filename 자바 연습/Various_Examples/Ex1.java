import java.io.*;
import java.util.StringTokenizer;

class Ex1 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        // 첫 번째 줄에서 n 읽기
        int n = Integer.parseInt(br.readLine());

        // 두 번째 줄과 세 번째 줄에서 각각 n개의 정수 읽기
        StringTokenizer st1 = new StringTokenizer(br.readLine());
        StringTokenizer st2 = new StringTokenizer(br.readLine());

        int sum = 0;
        for (int i = 0; i < n; i++) {
            int a = Integer.parseInt(st1.nextToken());
            int b = Integer.parseInt(st2.nextToken());
            sum += a * b;
        }

        // 합계를 문자열로 변환하여 출력
        bw.write(String.valueOf(sum));
        bw.flush();
    }
}
