package gameconsole;

import java.util.Scanner;
import game.RockScissorsPaper;

public class ConsoleGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        RockScissorsPaper game = new RockScissorsPaper();
        int userChoice = 0;
        do {
            try {
                System.out.println("가위(1), 바위(2), 보(3) 중 하나를 선택하세요. 종료하려면 4를 입력하세요.");
                String tmp = scanner.nextLine();
                userChoice = Integer.parseInt(tmp); // 문자열을 정수로 변환
                if (userChoice < 1 || userChoice > 4) {
                    System.out.println("잘못된 입력입니다. 다시 입력하세요.");
                } else if (userChoice != 4) {
                    game.play(userChoice);
                }
            } catch (Exception e) { 
                System.out.println("잘못된 입력입니다. 다시 입력하세요.");
                continue;
            }
        } while (userChoice != 4);
        System.out.println("게임을 종료합니다.");
        scanner.close();
    }
}