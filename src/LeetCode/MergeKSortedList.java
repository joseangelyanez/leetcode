/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length == 0) return null;
        
        return splitMerge(lists, 0, lists.length - 1);
    }
    
    
    private ListNode splitMerge(ListNode[] a, int from, int to)
    {
        if (from == to)
            return a[from];
        if (from == to - 1)
            return mergeTwo(a[from], a[to]);
    
        int mid = from + ((to - from) / 2);
    
        return mergeTwo(splitMerge(a, from, mid), splitMerge(a, mid + 1, to));
    }
    

    
    
    ListNode mergeTwo(ListNode n1, ListNode n2) {
        if (n1 == null)
            return n2;
        if (n2 == null)
            return n1;
        
        ListNode head = null;
        ListNode tail = null;
    
        if (n1.val < n2.val) {
            head = n1;
            n1 = n1.next;
        }
        else {
            head = n2;
            n2 = n2.next;
        }
        
        tail = head;
    
        while (n1 != null && n2 != null) {
            while (n1 != null && n2 != null && n1.val < n2.val) {
                tail.next = n1;
                tail = tail.next;
            
                n1 = n1.next;
            }
            while (n2 != null && n1 != null && n2.val <= n1.val) {
                tail.next = n2;
                tail = tail.next;
            
                n2 = n2.next;
            }
        }
    
        if (n1 != null) {
            tail.next = n1;
        }
        if (n2 != null) {
            tail.next = n2;
        }
    
        return head;
    }
}