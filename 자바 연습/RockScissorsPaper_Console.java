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
            return 0; // 비김
        } else if ((userChoice == ROCK && computerChoice == SCISSORS)
                || (userChoice == SCISSORS && computerChoice == PAPER)
                || (userChoice == PAPER && computerChoice == ROCK)) {
            return 1; // 사용자 승
        } else {
            return 2; // 컴퓨터 승
        }
    }

    public void play(int userChoice) {
        int computerChoice = getComputerChoice();
        int winner = getWinner(userChoice, computerChoice);
        String result = "";
        switch (winner) {
            case 0:
                result = "비겼습니다.";
                break;
            case 1:
                result = "사용자가 이겼습니다.";
                break;
            case 2:
                result = "사용자가 졌습니다.";
                break;
        }
        System.out.println("사용자: " + choiceToString(userChoice) + ", 컴퓨터: " + choiceToString(computerChoice));
        System.out.println(result);
    }

    public String choiceToString(int choice) {
        switch (choice) {
            case ROCK:
                return "바위";
            case SCISSORS:
                return "가위";
            case PAPER:
                return "보";
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
            	System.out.print("가위(1), 바위(2), 보(3), 끝내기(4)>>>");
            	userChoice = Integer.parseInt(scanner.nextLine());//Wrapper클래스로 문자열을 정수로 변환
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
