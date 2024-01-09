class unit{
	public void move() {
		System.out.println("움직입니다.");
	}
	public void stop() {
		System.out.println("멈춥니다.");
	}
}
class gunner extends unit{
	public void shooting() {
		System.out.println("공격합니다.");
	}
}
class medic extends gunner{
	public void treat() {
		System.out.println("치료합니다.");
	}
}
public class polymorphis_test {
	public static void main(String args[]) {
		medic med = new medic();
		gunner g = new gunner();
		med.move();
		med.shooting();
		med.treat();
	}
}
