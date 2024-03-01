using System;
class Program
{
    static void Main()
    {
        Console.Write("홀수를 입력하세요: ");
        int n = int.Parse(Console.ReadLine());

        if (n % 2 == 0)
        {
            Console.WriteLine("홀수를 입력해야 합니다.");
        }
        else
        {
            int[,] magicSquare = new int[n, n];
            int num = 1;
            int row = 0;
            int col = n / 2;

            while (num <= n * n)
            {
                magicSquare[row, col] = num;
                num++;

                int nextRow = (row - 1 + n) % n;
                int nextCol = (col + 1) % n;

                if (magicSquare[nextRow, nextCol] != 0)
                {
                    row = (row + 1) % n;
                }
                else
                {
                    row = nextRow;
                    col = nextCol;
                }
            }

            Console.WriteLine("생성된 {0}x{0} 마방진:", n);
            for (int i = 0; i < n; i++)
            {
                for (int j = 0; j < n; j++)
                {
                    Console.Write(magicSquare[i, j] + "\t");
                }
                Console.WriteLine();
            }
        }
    }
}
