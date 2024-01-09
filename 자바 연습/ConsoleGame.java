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
                System.out.println("����(1), ����(2), ��(3) �� �ϳ��� �����ϼ���. �����Ϸ��� 4�� �Է��ϼ���.");
                String tmp = scanner.nextLine();
                userChoice = Integer.parseInt(tmp); // ���ڿ��� ������ ��ȯ
                if (userChoice < 1 || userChoice > 4) {
                    System.out.println("�߸��� �Է��Դϴ�. �ٽ� �Է��ϼ���.");
                } else if (userChoice != 4) {
                    game.play(userChoice);
                }
            } catch (Exception e) { 
                System.out.println("�߸��� �Է��Դϴ�. �ٽ� �Է��ϼ���.");
                continue;
            }
        } while (userChoice != 4);
        System.out.println("������ �����մϴ�.");
        scanner.close();
    }
}