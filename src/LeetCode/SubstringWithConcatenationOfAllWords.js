/**
    * @param {string} s
    * @param {string[]} words
    * @return {number[]}
    */

var findSubstring = function (s, words) {
    var results = [];

    if (words.length == 0)
        return results;

    var blockSize = words[0].length;

    var node = new Node(words[0]);
    for (i = 1; i < words.length; i++) {
        node.push(words[i]);
    }

    var pageSize = words.length;

    for (x = 0; x < blockSize; x++) {
        var blocks = [];
        for (i = x; i < s.length; i += blockSize) {
            blocks.push(s.substring(i, i + blockSize));
        }

        for (i = 0; i < blocks.length; i++) {
            var found = true;

            if (blocks.length - i < pageSize) {
                break;
            };

            node.refresh();
            for (j = i; j < i + pageSize; j++) {
                var block = blocks[j];
                if (!node.exists(block)) {
                    found = false;
                    break;
                }
            }
            if (found)
                results.push((i * blockSize) + x);
        }
    }


    return results;
};

function run() {
    var result = findSubstring(
        "barfoothefoobarman",
        ["foo", "bar"]
    );

    console.log(result);
}

function equals(str1, str2, from, to) {
    var j = 0;
    for (i = from; i < str2.length; i++) {
        if (str2[i] !== str1[j])
            return false;

        j += 1;
    }

    return true;
}

function Node(val) {
    this.left = null;
    this.right = null;
    this.val = val;
    this.repeats = 1;
    this.counter = 0;
    last = null;

    this.push = function (newVal) {
        if (last !== null && last.val == newVal) {
            last.repeats += 1;
            return;
        }

        var node = this.find(newVal);
        if (node !== null) {
            node.repeats += 1;
            return;
        }

        var leave = this.findLeave(newVal);
        var node = new Node(newVal);

        if (newVal > leave.val)
            leave.right = node;
        else
            leave.left = node;

        if (last === null)
            last = node;

        return node;
    }

    this.refresh = function () {
        this.counter = 0;
        if (this.right !== null)
            this.right.refresh();
        if (this.left !== null)
            this.left.refresh();
    }

    this.exists = function (val) {
        var node = this.find(val);
        if (node !== null) {
            if (node.counter >= node.repeats) {
                return false;
            }
            node.counter += 1;
            return true;
        }
        else {
            return false;
        }
    }

    this.find = function (val) {
        if (this.val === val) {
            return this;
        }

        if (this.val < val && this.right !== null) {
            return this.right.find(val);
        }
        if (this.val >= val && this.left !== null) {
            return this.left.find(val);
        }

        return null;
    }

    this.findLeave = function (val) {
        if (val > this.val) {
            if (this.right === null)
                return this;
            else
                return this.right.findLeave(val);
        }

        if (val <= this.val) {
            if (this.left === null)
                return this;
            else
                return this.left.findLeave(val);
        }
    }
}