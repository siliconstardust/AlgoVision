/**
 * Linear Search: Checks every element sequentially until target is found.
 */
export function getLinearSearchSteps(arr, target) {
  const steps = [];
  for (let i = 0; i < arr.length; i++) {
    const found = arr[i] === target;
    steps.push({ array: [...arr], current: i, found: found ? i : -1, type: found ? 'found' : 'check' });
    if (found) break;
  }
  return steps;
}

export const linearSearchInfo = {
  name: 'Linear Search',
  best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)',
  description: 'Linear Search checks each element one by one from the start until the target is found or the array ends. Works on unsorted arrays.',
  howItWorks: ['Start at index 0', 'Compare current element with target', 'If match found, return index', 'Otherwise, move to next element', 'Return -1 if not found'],
  useCases: ['Unsorted arrays', 'Small datasets', 'Finding all occurrences', 'Linked lists']
};
