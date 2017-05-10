/**
  Definition for singly-linked list. 
*/

function ListNode(val) {
    this.val = val;
    this.next = null;
}
 
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    vals = [];
    nodes = [];
    return merge(lists);
};

function run() {
    var x = merge([]);
    print(x);
    /*
    var n1 = link([1, 3, 5, 6, 7, 8, 9, 100, 200]);
    var n2 = link([2, 4, 7, 8, 70, 80, 90]);
    var n3 = link([3, 4, 7, 8, 70, 80, 90]);
    var n4 = link([4, 4, 7, 8, 70, 80, 900]);
    */
    //[[-8,-7,-7,-5,1,1,3,4],[-2],[-10,-10,-7,0,1,3],[2]]

    var n1 = link([8, -7, -7, -5, 1, 1, 3, 4]);
    var n2 = link([-2]);
    var n3 = link([-10, -10, 7, 0, 1, 3]);
    var n4 = link([2]);

    var n = splitMerge([n1, n2, n3, n4], 0, 3);

    print(n);
}

function merge(n) {
    if (n == null)
        return null;
    if (n.length == 0)
        return null;
    if (n.length == 1)
        return n[0];

    var i = 0;
    var m = null;

    while (i < n.length) {
        var a = n[i];
        if (m == null) {
            m = n[i + 1];
            i += 1;
        }

        m = mergeTwo(a, m);
        i += 1;
    }

    return m;
}

function splitMerge(a, from, to)
{
    if (from == to)
        return a[from];
    if (from == to - 1)
        return mergeTwo(a[from], a[to]);

    var mid = parseInt(from + ((to - from) / 2));

    return mergeTwo(splitMerge(a, from, mid), splitMerge(a, mid + 1, to));
}

function mergeTwo(n1, n2) {
    if (n1 == null)
        return n2;
    if (n2 == null)
        return n1;
    
    var head = null;
    var tail = null;

    if (n1.val < n2.val) {
        head = n1;
        n1 = n1.next;
    }
    else {
        head = n2;
        n2 = n2.next;
    }
    
    tail = head;

    while (n1 && n2) {
        while (n1 && n2 && n1.val < n2.val) {
            if (tail != n1)
            {
                tail.next = n1;
                tail = tail.next;
            }
            n1 = n1.next;
        }
        while (n2 && n1 && n2.val <= n1.val) {
            if (tail != n2)
            {
                tail.next = n2;
                tail = tail.next;
            }
            n2 = n2.next;
        }
    }

    if (n1) {
        tail.next = n1;
    }
    if (n2) {
        tail.next = n2;
    }

    return head;
}

function link(numbers) {
    var node = new ListNode(numbers[0]);
    var head = node;

    for (var i = 1; i < numbers.length; i++) {
        var number = numbers[i];
        node.next = new ListNode(number);
        node = node.next;
    }

    return head;
}

function print(node) {
    var str = "";

    while (node) {
        str += "[" + node.val + "]";
        node = node.next;
    }

    console.log(str);
}