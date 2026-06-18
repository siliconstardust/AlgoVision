/**
 * Binary Search: Divides sorted array in half each step to find target.
 */
export function getBinarySearchSteps(arr, target) {
  const steps = [];
  let low = 0, high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps.push({ array: [...arr], current: mid, low, high, found: arr[mid] === target ? mid : -1, type: arr[mid] === target ? 'found' : 'check' });
    if (arr[mid] === target) break;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  if (steps.length === 0 || steps[steps.length - 1].found === -1) {
    steps.push({ array: [...arr], current: -1, low, high, found: -1, type: 'notfound' });
  }
  return steps;
}

export const binarySearchInfo = {
  name: 'Binary Search',
  best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)',
  description: 'Binary Search works on sorted arrays by repeatedly dividing the search space in half. Compares the middle element with the target to eliminate half the remaining elements.',
  howItWorks: ['Requires sorted array', 'Check middle element', 'If target < middle, search left half', 'If target > middle, search right half', 'Repeat until found or space exhausted'],
  useCases: ['Sorted arrays/databases', 'Dictionary lookups', 'Finding insertion points', 'Search in rotated arrays']
};
