/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var reverseKGroup = function (head, k) {

};

function Stack()
{
    var head = null;
    this.length = 0;
    this.tail = null;

    this.push = function(n)
    {
        var item = {
            val  : n,
            next : head
        }

        if (this.length == 0)
            this.tail = n;

        this.length += 1;
        head = item;
    }

    this.pop = function (n)
    {
        if (this.length == 0)
            return null;

        var x = head;
        head = head.next;

        this.length -= 1;
        if (this.length == 0)
            this.tail = null;;

        return x.val;
    }
}

function reverse(n, k)
{
    if (n == null)
        return []; /* Required by Leetcode. */

    var i = 0;
    var stack = new Stack();
    var last = null;
    var head = null;

    while (n) {
        i = 1;
        while (n && i <= k) {
            i += 1;
            stack.push(n);

            n = n.next;
        }

        if (stack.length < k) {
            if (last == null)
                return stack.tail;

            last.next = stack.tail;
            return head;
        }

        while (stack.length > 0) {
            var o = stack.pop();

            if (last) {
                last.next = o;
            }
            else {
                if (head == null)
                    head = o;
            }

            last = o;
        }
    }
    if (last)
        last.next = null;

    return head;
}

function run() {
    var n1 = link([8, -7, -7, -5, 1, 1, 3, 4]);
    var n2 = link([1]);
    var n3 = link([1, 2]);
    var n = reverse(n1, 3);

    print(n);
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