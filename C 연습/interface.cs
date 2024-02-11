using System.Diagnostics.Metrics;
using System.Security.Claims;

interface IPropertyCounter
{
    int Count { get; set; }
}

interface IMethodCounter
{
    int Count(int i);
}
interface ICounter : IProperty Counter, IMethodCounter { }

Class InterfaceParameter
{
void Test(ICounter x) {
        ((IMethodCounter)x).Count(1);
        ((IPropertyCounter)x).Count = 1;
    }

