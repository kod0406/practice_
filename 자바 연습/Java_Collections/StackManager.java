import java.util.*;
import java.lang.*;

interface Stackinterface{
	int length();
	String pop();
	boolean push(String input);
}
class StringStack implements Stackinterface{
	private String stack[] = new String[5];
	private int count = 0;
	public int length() {
		return count++;
	}
	public String pop() {
		return stack[--count];
	}
	public boolean push(String input) {
		if(count == 5) {
			return false;
		}
		else {
			input = stack[count];
			count++;
			return true;
		}
	}
}
