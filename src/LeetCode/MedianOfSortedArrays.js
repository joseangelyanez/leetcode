function run() {

    var array1 = [1, 2, 3];
    var array2 = [4, 5, 6, 7, 8]; //  1 1 2 2 2 3 3 3 4 4

    var median = lookForMedian(array1, array2);
    if (median == null)
        median = lookForMedian(array2, array1);

    if (median == null)
        alert("There is no median");
    else
        alert(" Median is " + median);
}

var empty = {
    bestSoFar: null,
    bestAt: null,
    itemCount: 0
};

var findMedianSortedArrays = function (nums1, nums2) {
    var largest = null;
    var smallest = null;

    if (nums1.length > nums2.length) {
        largest = nums1;
        smallest = nums2;
    }
    else {
        largest = nums2;
        smallest = nums1;
    }

    var median = lookForMedian(smallest, largest);
    if (median == null)
        median = lookForMedian(largest, smallest);
    return median;
};

function lookForMedian(array1, array2) {
    var lo = 0, hi = array2.length - 1, mid = 0, hint = {}, median = null;

    while (lo <= hi) {
        mid = parseInt(lo + ((hi - lo) / 2));

        median = getMiddleInformation(array1, array2, mid, hint);

        if (median)
            return median;

        if (hint.goRight) {
            lo = mid + 1;
        }
        else {
            hi = mid - 1;
        }
    }

    return null;
}

function getMiddleInformation(array, originArray, originIndex, hint) {
    if (array.length == 0)
        return singleArrayMedian(originArray);
    if (originArray.length == 0)
        return singleArrayMedian(array);
    if (originArray.length == 1 && array.length == 1)
        return (originArray[0] + array[0]) / 2;

    var number = originArray[originIndex];
    var myLeft = lastLessThan(originArray, number);
    var myRight = firstGreaterThan(originArray, number);
    var itsLeft = lastLessThan(array, number);
    var itsRight = firstGreaterThan(array, number);

    var repeats =
        (array.length - itsLeft.itemCount - itsRight.itemCount) +
        (originArray.length - myLeft.itemCount - myRight.itemCount) - 1;
    var allLeft, allRight;

    allLeft = myLeft.itemCount + itsLeft.itemCount;
    allRight = myRight.itemCount + itsRight.itemCount;

    var distance = Math.abs(allLeft - allRight) - repeats;

    if (distance <= 0) {
        return number;
    }

    if (distance == 1) {
        if (allLeft > allRight) {
            var leftNumber = itsLeft.bestSoFar;
            if (leftNumber == null) {
                leftNumber = myLeft.bestSoFar;
            }
            else {
                if (myLeft.bestSoFar != null && leftNumber < myLeft.bestSoFar)
                    leftNumber = myLeft.bestSoFar;
            }
            return ((leftNumber + number) / 2);
        }
        else {
            var rightNumber = itsRight.bestSoFar;
            if (rightNumber == null) {
                rightNumber = myRight.bestSoFar;
            }
            else {
                if (myRight.bestSoFar != null && rightNumber > myRight.bestSoFar)
                    rightNumber = myRight.bestSoFar;
            }

            return ((rightNumber + number) / 2);
        }

    }

    hint.goRight = allRight > allLeft;
    return null;
}

function firstGreaterThan(array, search) {
    var lo = 0, hi = array.length - 1, mid = 0, current = 0, bestIndex = null;

    while (lo <= hi) {
        mid = parseInt(lo + ((hi - lo) / 2));
        current = array[mid];

        if (current > search && (bestIndex == null || mid < bestIndex)) {
            bestIndex = mid;
        }

        if (current > search) {
            hi = mid - 1;
        }
        else {
            lo = mid + 1;
        }
    }

    var result = null;
    if (bestIndex == null) {
        result = empty;
    }
    else {
        result = {
            bestSoFar: array[bestIndex],
            bestAt: bestIndex,
            itemCount: array.length - bestIndex
        }
    };

    return result;
}

function lastLessThan(array, search) {
    var lo = 0, hi = array.length - 1, mid = 0, current = 0, bestIndex = null;

    while (lo <= hi) {
        mid = parseInt(lo + ((hi - lo) / 2));
        current = array[mid];

        if (current < search && (bestIndex == null || mid > bestIndex)) {
            bestIndex = mid;
        }

        if (search <= current) {
            hi = mid - 1;
        }
        else {
            lo = mid + 1;
        }
    }

    var result = null;
    if (bestIndex == null) {
        result = empty;
    }
    else {
        result = {
            bestSoFar: array[bestIndex],
            bestAt: bestIndex,
            itemCount: bestIndex + 1
        };
    }

    return result;
}

function singleArrayMedian(array) {
    var middle = parseInt(array.length / 2);

    if (array.length % 2 == 0) {
        return (array[middle] + array[middle - 1]) / 2;
    }
    else {
        return array[middle];
    }
}