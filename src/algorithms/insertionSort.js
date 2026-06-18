/**
 * Insertion Sort: Builds the sorted array one element at a time by inserting each element.
 */
export function getInsertionSortSteps(arr) {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      comparisons++;
      steps.push({ array: [...array], comparing: [j - 1, j], sortedFrom: i + 1, comparisons, swaps, type: 'compare' });
      if (array[j - 1] > array[j]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
        swaps++;
        steps.push({ array: [...array], comparing: [j - 1, j], sortedFrom: i + 1, comparisons, swaps, type: 'swap' });
        j--;
      } else break;
    }
  }
  steps.push({ array: [...array], comparing: [], sortedFrom: 0, comparisons, swaps, type: 'done' });
  return steps;
}

export const insertionSortInfo = {
  name: 'Insertion Sort',
  best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: true,
  description: 'Insertion Sort builds the sorted array one item at a time. Each new element is inserted into its correct position among the already sorted elements.',
  howItWorks: ['Start with second element', 'Compare with elements before it', 'Shift larger elements right', 'Insert element in correct position', 'Repeat for all elements'],
  useCases: ['Nearly sorted arrays', 'Small datasets', 'Online algorithms (elements arrive one by one)', 'Building block for shell sort']
};
