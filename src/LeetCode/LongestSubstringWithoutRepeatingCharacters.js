/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    return run(s);
};

function run(s) {
    if (s === "")
        return 0;
    if (s.length === 1)
        return 1;

    var m = new Array(256);

    var max = -1;
    var start = -1;
    var length = s.length;

    for (var i = 0; i < length; i++) {
        var x = s.charCodeAt(i);

        if (m[x] !== undefined) {
            if (m[x] > start)
                start = m[x];
            m[x] = i;
        }
        else {
            m[x] = i;
        }

        max = Math.max(max, i - start);
    }

    return max;
}