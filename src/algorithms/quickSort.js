/**
 * Quick Sort: Picks a pivot, partitions array around it, recursively sorts.
 */
export function getQuickSortSteps(arr) {
  const steps = [];
  const array = [...arr];
  let comparisons = 0;
  let swaps = 0;

  function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      steps.push({ array: [...arr], comparing: [j, high], sortedFrom: arr.length, comparisons, swaps, type: 'compare' });
      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          steps.push({ array: [...arr], comparing: [i, j], sortedFrom: arr.length, comparisons, swaps, type: 'swap' });
        }
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    steps.push({ array: [...arr], comparing: [i + 1, high], sortedFrom: arr.length, comparisons, swaps, type: 'swap' });
    return i + 1;
  }

  function quickSort(arr, low, high) {
    if (low < high) {
      const pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }

  quickSort(array, 0, array.length - 1);
  steps.push({ array: [...array], comparing: [], sortedFrom: 0, comparisons, swaps, type: 'done' });
  return steps;
}

export const quickSortInfo = {
  name: 'Quick Sort',
  best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: false,
  description: 'Quick Sort selects a pivot element and partitions the array so elements smaller than pivot come before it, larger after. Recursively applies to subarrays.',
  howItWorks: ['Choose a pivot element (last element)', 'Partition: move smaller elements left, larger right', 'Pivot is now in its final position', 'Recursively sort left and right subarrays'],
  useCases: ['General-purpose sorting (fastest in practice)', 'In-memory sorting', 'When average-case performance matters', 'Cache-friendly sequential access']
};
