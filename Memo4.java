package exam;

import java.util.Scanner;

public class Memo4 {
	public static void main(String[]args) {
		Scanner s = new Scanner(System.in);
		int seat[][]=new int[4][5];
		while(true) {
			System.out.println("��� �ڸ��� �����ϰڽ��ϱ�?");
			int x = s.nextInt();
			int y = s.nextInt();
			if(x==-1||y==-1) {
				System.out.println("�߸��� ���� �Է��߽��ϴ�.");
				break;
			}
			else if(x>4||y>5) {
				System.out.println("�߸� �Է��߽��ϴ�.");
			}
			else {
				if(seat[x][y]==1) {
					System.out.println("�� �ڸ��� ����Ǿ� �ֽ��ϴ�.");
				}
				else {
					seat[x][y]=1;
					System.out.println("����Ǿ����ϴ�.");
				}
			}
		}
	}
}
//���� ���α׷�
