using System;

class Vector
{
    public int[] v;

    public Vector(int size)
    {
        v = new int[size];
    }

    // Swap 함수를 클래스 내에 구현
    private static void Swap(ref int x, ref int y)
    {
        int temp = x;
        x = y;
        y = temp;
    }

    public void Qsort(int left, int right)
    {
        int pe;
        int i, last;
        if (left >= right) return;
        pe = (left + right) / 2;
        Swap(ref v[left], ref v[pe]);
        last = left;
        for (i = left + 1; i <= right; i++)
        {
            if (v[i] < v[left]) Swap(ref v[++last], ref v[i]);
        }
        Swap(ref v[left], ref v[last]);
        Qsort(left, last - 1);
        Qsort(last + 1, right);
    }
}

class Program
{
    static void Main()
    {
        Console.Write("벡터 크기를 입력하세요: ");
        int size = int.Parse(Console.ReadLine());

        if (size <= 0)
        {
            Console.WriteLine("유효하지 않은 크기입니다.");
            return;
        }

        Vector vector = new Vector(size);

        Console.WriteLine("벡터 데이터를 입력하세요 (0 입력 시 종료):");

        for (int i = 0; i < size; i++)
        {
            Console.Write($"v[{i}]: ");
            int input = int.Parse(Console.ReadLine());

            if (input == 0)
                break;

            vector.v[i] = input;
        }

        Console.WriteLine("정렬 전:");
        foreach (int num in vector.v)
        {
            Console.Write(num + " ");
        }
        Console.WriteLine();

        vector.Qsort(0, size - 1);

        Console.WriteLine("정렬 후:");
        foreach (int num in vector.v)
        {
            Console.Write(num + " ");
        }
        Console.WriteLine();
    }
}
