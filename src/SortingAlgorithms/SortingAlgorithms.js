// function merge(left, right) {
//     const mergedArray = [];
//     let i = 0;
//     let j = 0;
    
//     while (i < left.length && j < right.length) {
//         if (left[i] <= right[j]) {
//             mergedArray.push(left[i]);
//             i++
//         } else {
//             mergedArray.push(right[j]);
//             j++
//         }
//     }

//     if (i < left.length) {
//         for (let x = i; x < left.length; x++) {
//             mergedArray.push(left[x]);
//         }
//     }
//     if (j < right.length) {
//         for (let y = j; y < right.length; y++) {
//             mergedArray.push(right[y]);
//         }
//     }

//     return mergedArray;
// }

// export const mergeSort = array => {
//     if (array.length <= 1) {
//         return array;
//     }
    
//     const middleIdx = Math.floor(array.length/2);
//     const firstHalf = mergeSort(array.slice(0, middleIdx));
//     const secondHalf = mergeSort(array.slice(middleIdx));

//     return merge(firstHalf, secondHalf);

// };


function merge(mainArray, startIdx, middleIdx, endIdx, overallArray, animations) {
    let k = startIdx
    let i = startIdx;
    let j = middleIdx + 1;
    
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (overallArray[i] <= overallArray[j]) {
            animations.push([k, overallArray[i]]);
            mainArray[k++] = overallArray[i++];
        } else {
            animations.push([k, overallArray[j]]);
            mainArray[k++] = overallArray[j++];
        }
    }

    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, overallArray[i]]);

        mainArray[k++] = overallArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, overallArray[j]]);
        mainArray[k++] = overallArray[j++];
    }
}

function mergeSortHelper(mainArray, startIdx, endIdx, overallArray, animations) {
    if (startIdx === endIdx) {
        return;
    }
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(overallArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(overallArray, middleIdx + 1, endIdx, mainArray, animations);
    merge(mainArray, startIdx, middleIdx, endIdx, overallArray, animations);

}



export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) {
        return animations;
    }
    const overallArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, overallArray, animations);
    return animations;
}


export function selectionSort(array) {
    const animations = [];
    if (array.length <= 1) {
        return animations;
    }
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            const animation1 = {};
            animation1.comparison = [minIdx, j];
            if (array[j] < array[minIdx]) {
                minIdx = j;
                const animation2 = {};
                animation2.minChange = [minIdx, j];
                animations.push(animation2);
            }
            animations.push(animation1);
        }
        const animation = {};
        animation.swap = [i, minIdx];
        let temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;
        animations.push(animation);
    }

    return animations;

}