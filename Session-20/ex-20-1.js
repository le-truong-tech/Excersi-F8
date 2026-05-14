// ex1
const numbers = [9, 8, 3, 5, 6, 2, 7, 9];
// Expected result: 8
// ---
function getTop2(arr){
    if (arr.length === 0) return null;
    const maxNumbers = {
        firstMax : -Infinity,
        secondMax: -Infinity
    }
    for(let i = 0; i < arr.length; i++){
        // update both if a new maximum is found
        if(maxNumbers.firstMax < arr[i]){
            maxNumbers.secondMax = maxNumbers.firstMax;
            maxNumbers.firstMax = arr[i];
        } else if(maxNumbers.secondMax < arr[i] && maxNumbers.firstMax != arr[i]) maxNumbers.secondMax = arr[i]; /*update second largest*/
    }
    return maxNumbers.secondMax === -Infinity ? null : maxNumbers.secondMax;
}
console.log("Top 2 number:",getTop2(numbers));
// -----------------------------------------------------------------------------
// ex02
const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];
// Step 1 & 2: [15, 2, 8, 10, 11, 5, 9]
// Step 3: Quick Sort -> [2, 5, 8, 9, 10, 11, 15]
// ---
//merge two arrays
const classAB = [...classA, ...classB];
//deduplicate
const mapClassAB = {};
const uniqueIDClassAB = [];
for(let i = 0; i < classAB.length; i++){
    if (mapClassAB[classAB[i]] != true){
        mapClassAB[classAB[i]] = true;
        uniqueIDClassAB.push(classAB[i]);
    }
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function partition(arr, left, right) {
    let i = left;
    let pivot = arr[right];
    for(let j = i; j < right; j++) {
        if (arr[j] < pivot) {
            swap(arr, i, j);
            i++;
        }
    }
    swap(arr, i, right);
    return i;
}
function quickSort(arr, left, right){
    if(left >= right) return;
    let pos = partition(arr, left, right);
    quickSort(arr, left,pos-1);
    quickSort(arr, pos+1, right);
    return arr;
}

let leng = uniqueIDClassAB.length;
console.log(quickSort(uniqueIDClassAB, 0, leng-1));
