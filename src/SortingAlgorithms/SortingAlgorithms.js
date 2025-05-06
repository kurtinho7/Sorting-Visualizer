function merge(left, right) {
    const mergedArray = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            mergedArray.push(left[i]);
            i++
        } else {
            mergedArray.push(right[j]);
            j++
        }
    }

    if (i < left.length) {
        for (let x = i; x < left.length; x++) {
            mergedArray.push(left[x]);
        }
    }
    if (j < right.length) {
        for (let y = j; y < right.length; y++) {
            mergedArray.push(right[y]);
        }
    }

    return mergedArray;
}

export const mergeSort = array => {
    if (array.length <= 1) {
        return array;
    }
    
    const middleIdx = Math.floor(array.length/2);
    const firstHalf = mergeSort(array.slice(0, middleIdx));
    const secondHalf = mergeSort(array.slice(middleIdx));

    return merge(firstHalf, secondHalf);

};