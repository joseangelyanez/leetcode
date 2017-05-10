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

    var n = merge([n1, n2, n3, n4]);

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

var vals = [];
var nodes = [];

function fastForward(val)
{
    if (vals.length == 0)
        return null;

    var hi = 0, lo = 0, mid = 0;
    
    hi = vals.length - 1;
    while( hi >= lo )
    {
        mid = parseInt(lo + ((hi - lo) / 2));
        
        if (vals[mid] == val && (mid + 1 < vals.length) && (vals[mid + 1] != val))
        {
            break;
        }

        if (vals[mid] > val)
            hi = mid - 1;
        else
            lo = mid + 1;
    }
    
    var r = nodes[mid];
    nodes.splice(mid, nodes.length);
    vals.splice(mid, vals.length);
    return r;
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
    
    if (n1) {
        var ff = fastForward(n1.val);
        if (ff) {
            n2 = ff;
            tail = n2;
        }
    }

    while (n1 && n2) {
        while (n1 && n2 && n1.val < n2.val) {
            vals.push(tail.val);
            nodes.push(tail);
            if (tail != n1)
            {
                tail.next = n1;
                tail = tail.next;
            }
            n1 = n1.next;
        }
        while (n2 && n1 && n2.val <= n1.val) {
            vals.push(tail.val);
            nodes.push(tail);
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