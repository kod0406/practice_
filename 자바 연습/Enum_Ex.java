enum Direction { EAST,SOUTH,WEST,NORTH}

public class Enum_Ex {
	public static void main(String[] args) {
		Direction d1 = Direction.EAST;
		Direction d2 = Direction.valueOf("WEST");
		Direction d3 = Enum.valueOf(Direction.class, "EAST");
		//열거형 상수를 얻는 방법
		
		System.out.println("d1="+d1);
		System.out.println("d2="+d2);
		System.out.println("d3="+d3);
		
		System.out.println("d1==d2 ?"+(d1==d2));
		System.out.println("d1==d3 ?"+(d1==d2));
		System.out.println("d1.equals(d3) ?"+(d1.equals(d3)));
		//기본형이 아닌 객체이기에 비교가능
		System.out.println("d1.compareTo(d3) ?"+(d1.compareTo(d3)));
		System.out.println("d1.compareTo(d2) ?"+(d1.compareTo(d2)));
		
		switch(d1) {
		case EAST:
			System.out.println("It is East.");
			break;
		case SOUTH:
			System.out.println("It is South.");
			break;
		case WEST:
			System.out.println("It is West.");
			break;
		case NORTH:
			System.out.println("It is North.");
			break;
		}
		Direction[] darr = Direction.values();
		for(Direction d : darr)
			System.out.printf("%s=%d%n",d.name(),d.ordinal());
	}
}
