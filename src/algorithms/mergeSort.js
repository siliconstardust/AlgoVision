/**
 * Merge Sort: Divide and conquer algorithm that splits, sorts, and merges.
 */
export function getMergeSortSteps(arr) {
  const steps = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      steps.push({ array: [...arr], comparing: [left + i, mid + 1 + j], sortedFrom: arr.length, comparisons, swaps, type: 'compare' });
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
        swaps++;
      }
      steps.push({ array: [...arr], comparing: [k - 1], sortedFrom: arr.length, comparisons, swaps, type: 'swap' });
    }
    while (i < leftArr.length) { arr[k++] = leftArr[i++]; steps.push({ array: [...arr], comparing: [k - 1], sortedFrom: arr.length, comparisons, swaps, type: 'swap' }); }
    while (j < rightArr.length) { arr[k++] = rightArr[j++]; steps.push({ array: [...arr], comparing: [k - 1], sortedFrom: arr.length, comparisons, swaps, type: 'swap' }); }
  }

  function mergeSort(arr, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }

  mergeSort(array, 0, array.length - 1);
  steps.push({ array: [...array], comparing: [], sortedFrom: 0, comparisons, swaps, type: 'done' });
  return steps;
}

export const mergeSortInfo = {
  name: 'Merge Sort',
  best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: true,
  description: 'Merge Sort divides the array in half recursively until single elements remain, then merges them back in sorted order. Guaranteed O(n log n) performance.',
  howItWorks: ['Divide array into two halves', 'Recursively sort each half', 'Merge the sorted halves', 'Compare elements from each half during merge', 'Build sorted result'],
  useCases: ['Large datasets requiring stable sort', 'Linked list sorting', 'External sorting (files)', 'When worst-case O(n log n) is required']
};
