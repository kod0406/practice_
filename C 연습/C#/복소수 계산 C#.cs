using System;

class Complex
{
    public double Real { get; set; } // 실수부
    public double Imaginary { get; set; } // 허수부

    // (1) 한 개의 실수를 받아 초기화하는 생성자
    public Complex(double real)
    {
        Real = real;
        Imaginary = 0;
    }

    // (2) 두 개의 실수를 받아 초기화하는 생성자
    public Complex(double real, double imaginary)
    {
        Real = real;
        Imaginary = imaginary;
    }

    // (3) 복소수를 문자열로 변환하는 ToString() 메소드
    public override string ToString()
    {
        return $"({Real} + {Imaginary}i)";
    }

    // (4) 복소수에 대한 4칙 연산 메소드

    // 복소수 덧셈
    public Complex AddComplex(Complex other)
    {
        return new Complex(Real + other.Real, Imaginary + other.Imaginary);
    }

    // 복소수 뺄셈
    public Complex SubComplex(Complex other)
    {
        return new Complex(Real - other.Real, Imaginary - other.Imaginary);
    }

    // 복소수 곱셈
    public Complex MulComplex(Complex other)
    {
        double resultReal = Real * other.Real - Imaginary * other.Imaginary;
        double resultImaginary = Real * other.Imaginary + Imaginary * other.Real;
        return new Complex(resultReal, resultImaginary);
    }

    // 복소수 나눗셈
    public Complex DivComplex(Complex other)
    {
        double denominator = other.Real * other.Real + other.Imaginary * other.Imaginary;
        double resultReal = (Real * other.Real + Imaginary * other.Imaginary) / denominator;
        double resultImaginary = (Imaginary * other.Real - Real * other.Imaginary) / denominator;
        return new Complex(resultReal, resultImaginary);
    }
}

class ComplexTest
{
    static void Main()
    {
        // (5) 테스트 클래스를 만들어 테스트

        Complex complex1 = new Complex(3, 4); // 3 + 4i
        Complex complex2 = new Complex(1, 2); // 1 + 2i

        Console.WriteLine("복소수 1: " + complex1);
        Console.WriteLine("복소수 2: " + complex2);

        Complex sum = complex1.AddComplex(complex2);
        Console.WriteLine("덧셈: " + sum);

        Complex difference = complex1.SubComplex(complex2);
        Console.WriteLine("뺄샘: " + difference);

        Complex product = complex1.MulComplex(complex2);
        Console.WriteLine("곱셈: " + product);

        Complex quotient = complex1.DivComplex(complex2);
        Console.WriteLine("나눗셈: " + quotient);
    }
}
