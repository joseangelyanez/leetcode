using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeetCode
{
    public class Program
    {
        public static void Main(string[] args)
        {
            /*
            new MergeKLinkedList().MergeKLists(
                    new ListNode[] {
                        new ListNode(1).Link(new int[] { 4, 6, 7,82, 120 }),
                        new ListNode(2).Link(new int[] { 30, 50, 60, 70, 80, 82 }),
                        new ListNode(3).Link(new int[] { 4, 8, 60 }),
                        new ListNode(4).Link(new int[] { 9, 50, 60, 70 }),
                        new ListNode(5).Link(new int[] { 7, 9 })

                    }
                );
            */
            var a = new ListNode(1).Link(new int[] { 4, 6, 7, 82, 120 });
            var b = new ListNode(2).Link(new int[] { 30, 50, 60, 70, 80, 82 });

            PrintList(a);
            PrintList(b);

            var c = MergeKLinkedList.MergeTwo(a, b);
            PrintList(c);

            Console.Read();
        }

        public static void PrintList(ListNode node)
        {
            Console.WriteLine();

            Console.Write("{");
            while (node != null)
            {
                Console.Write($"[{node.val}]");
                node = node.next;
            }
            Console.WriteLine("}");
        }
    }
}
