using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mono.Cecil;

namespace teaCRM.Tools
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            //string asmFile = args[0]; 
            string asmFile = @"D:\\学习资料\\开发参考资料\\优创科技\\项目\\工作项目\\优创CRM\\源码\\teaCRM\\teaCRM.Web\bin\teaCRM.Web.dll";
            //"$(SolutionDir)\\teaCRM.Console\\bin\\Debug\\teaCRM.Console.exe" "$(TargetPath)"
            System.Console.WriteLine("Making anonymous types public for '{0}'.", asmFile);

            var asmDef = AssemblyDefinition.ReadAssembly(asmFile, new ReaderParameters
            {
                ReadSymbols = true
            });

            var anonymousTypes = asmDef.Modules
                .SelectMany(m => m.Types)
                .Where(t => t.Name.Contains("<>f__AnonymousType"));

            foreach (var type in anonymousTypes)
            {
                type.IsPublic = true;
            }

            asmDef.Write(asmFile, new WriterParameters
            {
                WriteSymbols = true
            });
            Console.ReadKey();
        }
    }
}