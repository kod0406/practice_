package Java_Essential_1;

class point{
	int x = 10;
	int y = 20;
	point(int x,int y){
		this.x = x;
		this.y = y;
	}
}

class point3D extends point{//조상 클래스의 생성자를 호출을 해줘야함
	 int z = 30;
	 // point3D(){}는 부모 클래스에 기본 생성자가 없기에 만들어지면 오류 발생함
	 point3D(int x,int y,int z){
		 super(x,y);
		 this.z = z;
	 }
	 point3D(){
		 this(100,200,300); //위에있는 point3D(int x,int y,int z)를 호출
	 }
}

public class instant_Test {
	public static void main(String args[]) {
		point3D p3 = new point3D();
		System.out.println("p3.x ="+ p3.x);
		System.out.println("p3.y ="+ p3.y);
		System.out.println("p3.z ="+ p3.z);
	}
}
