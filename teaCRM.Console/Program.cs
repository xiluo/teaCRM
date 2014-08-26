using Spring.Context;
using Spring.Context.Support;

namespace teaCRM.Console
{
    public class Hello
    {
        public string HelloWord { get; set; }
    }
    public class Program
    {
        static void Main(string[] args)
        {
            IApplicationContext context = ContextRegistry.GetContext();
            Hello hello = (Hello)context.GetObject("hello");
            System.Console.Write(hello.HelloWord);
            System.Console.Read();
        }
    }
}