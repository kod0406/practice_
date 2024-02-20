package gameconsole;

import java.util.Scanner;



class RockScissorsPaper_Rule {
	private static final int SCISSORS = 1;
	private static final int ROCK = 2;
	private static final int PAPER = 3;
	
    public int getComputerChoice() {
        return (int) (Math.random() * 3) + 1;
    }

    public int getWinner(int userChoice, int computerChoice) {
        if (userChoice == computerChoice) {
            return 0; // ���
        } else if ((userChoice == ROCK && computerChoice == SCISSORS)
                || (userChoice == SCISSORS && computerChoice == PAPER)
                || (userChoice == PAPER && computerChoice == ROCK)) {
            return 1; // ����� ��
        } else {
            return 2; // ��ǻ�� ��
        }
    }

    public void play(int userChoice) {
        int computerChoice = getComputerChoice();
        int winner = getWinner(userChoice, computerChoice);
        String result = "";
        switch (winner) {
            case 0:
                result = "�����ϴ�.";
                break;
            case 1:
                result = "����ڰ� �̰���ϴ�.";
                break;
            case 2:
                result = "����ڰ� �����ϴ�.";
                break;
        }
        System.out.println("�����: " + choiceToString(userChoice) + ", ��ǻ��: " + choiceToString(computerChoice));
        System.out.println(result);
    }

    public String choiceToString(int choice) {
        switch (choice) {
            case ROCK:
                return "����";
            case SCISSORS:
                return "����";
            case PAPER:
                return "��";
            default:
                return "";
        }
    }
}

public class RockScissorsPaper_Console {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        RockScissorsPaper_Rule game = new RockScissorsPaper_Rule(); 
        int userChoice = 0;
        do {	
        	try {
            	System.out.print("����(1), ����(2), ��(3), ������(4)>>>");
            	userChoice = Integer.parseInt(scanner.nextLine());//WrapperŬ������ ���ڿ��� ������ ��ȯ
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
