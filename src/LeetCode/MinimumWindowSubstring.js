/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (s.length < t.length)
        return "";

    var map = {};
    var i = 0;

    for (i = 0; i < s.length; i ++)
    {
        var item = map[s[i]];

        if (item === undefined) {
            map[s[i]] = { at: [i] };
        }
        else {
            item.at.push(i);
        }
    }

    var array = [];
    var tmap  = [];
    for (i = 0; i < t.length; i++)
    {
        var item = map[t[i]];
        if (item == undefined)
            return "";
        
        if (tmap[t[i]] === undefined) {
            array.push(item);
            item.c = t[i];
            tmap[t[i]] = 1;
        }
        else {
            tmap[t[i]] += 1;
        }
    }
    var minLength;
    var bestResult;

    for (i = 0; i < array.length; i++)
    {
        var current = array[i];
        
        for (a = 0; a < current.at.length; a++)
        {
            var at = current.at[a];
            var furthest = undefined;

            for (j = 0; j < array.length; j++) {
                var x = array[j];
                /*if (x === current)
                    continue;*/

                var d = next(x.at, at, 0, tmap[array[i].c]);
                if (d == null)
                {
                    furthest = undefined;
                    break;
                }

                if (furthest === undefined) {
                    furthest = d;
                }
                else {
                    if (d > furthest) {
                        furthest = d;
                    }
                }
            }

            if (furthest === undefined)
                break;

            var length = furthest - at;

            if (minLength === undefined) {
                minLength = length;
                bestResult = { from: at, to: furthest + 1 };
            }
            else {
                if (length < minLength)
                {
                    minLength = length;
                    bestResult = { from: at, to: furthest + 1 };
                }       
            }
        }
    }

    if (bestResult === undefined)
    {
        return t;
    }

    var result = s.substring(
        bestResult.from,
        bestResult.to
    );
    return result;
};

function next(array, search, from, times)
{
    var index = null;

    for (i = 0; i < times; i++)
    {
        var lastIndex = rightAfter(array, search, lastIndex === undefined ? from : lastIndex);
        if (lastIndex == null)
            return index;

        index = lastIndex;
    }
    return index;
}

function rightAfter(array, search, from) {
    var lo = from, hi = array.length - 1, mid = 0, current = 0, bestIndex;

    while (lo <= hi) {
        mid = parseInt(lo + ((hi - lo) / 2));

        current = array[mid];
        if (current > search) {
            if (bestIndex === undefined || mid < bestIndex)
                bestIndex = mid;
        }

        if (array[mid] <= search)
            lo = mid + 1;
        else
            hi = mid - 1;
    }

    if (bestIndex === undefined)
        return null;

    return array[bestIndex];
}


function Node()
{
    this.children = [];

}

function run()
{
    //minWindow("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFHSADKSADAKSMDASKDWFERSFSFDSDFFSDFSDFSDFSFSDFSDFSDFSDFSDFSDFSDFSDFSFDSDFSFDSFDFSDFSDFSFDSDFSDFSSDFSDFSDFSDFABCDSDFSDFSDFSDFSDFSDFSDFSDFSDFSDFSDFSDDFSDFSDDFSFDSDFSDDFSDDFSFD", "ABC");
    var x = minWindow("aabaaaaaaaaaaaaaabbbbcccaaa", "abc");
    console.log(x);
}

