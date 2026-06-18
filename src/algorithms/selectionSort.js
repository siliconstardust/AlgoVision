/**
 * Selection Sort: Finds the minimum element and places it at the correct position.
 */
export function getSelectionSortSteps(arr) {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      steps.push({ array: [...array], comparing: [minIdx, j], sortedFrom: i, comparisons, swaps, type: 'compare' });
      if (array[j] < array[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      swaps++;
      steps.push({ array: [...array], comparing: [i, minIdx], sortedFrom: i + 1, comparisons, swaps, type: 'swap' });
    }
  }
  steps.push({ array: [...array], comparing: [], sortedFrom: 0, comparisons, swaps, type: 'done' });
  return steps;
}

export const selectionSortInfo = {
  name: 'Selection Sort',
  best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: false,
  description: 'Selection Sort divides the array into sorted and unsorted portions. It repeatedly finds the minimum element from the unsorted portion and places it at the beginning.',
  howItWorks: ['Find minimum in unsorted portion', 'Swap with first unsorted element', 'Expand sorted portion by one', 'Repeat until array is sorted'],
  useCases: ['Small datasets', 'When memory writes are expensive (few swaps)', 'Simple implementation needs']
};
