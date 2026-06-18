/**
 * Bubble Sort: Repeatedly swaps adjacent elements that are out of order.
 */
export function getBubbleSortSteps(arr) {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      steps.push({ array: [...array], comparing: [j, j + 1], sortedFrom: n - i, comparisons, swaps, type: 'compare' });
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        swapped = true;
        steps.push({ array: [...array], comparing: [j, j + 1], sortedFrom: n - i, comparisons, swaps, type: 'swap' });
      }
    }
    if (!swapped) break;
  }
  steps.push({ array: [...array], comparing: [], sortedFrom: 0, comparisons, swaps, type: 'done' });
  return steps;
}

export const bubbleSortInfo = {
  name: 'Bubble Sort',
  best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true,
  description: 'Bubble Sort repeatedly steps through the list comparing adjacent elements and swapping them if out of order. The largest unsorted element bubbles to its correct position each pass.',
  howItWorks: ['Compare each adjacent pair', 'Swap if left > right', 'Largest element bubbles to end', 'Repeat for remaining elements', 'Stop when no swaps needed'],
  useCases: ['Educational purposes', 'Nearly sorted small arrays', 'When simplicity is preferred over performance']
};
