import { describe, it, expect } from 'vitest';
import { findNumTuple } from './lib/Snake.svelte';

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(1 + 2).toBe(3);
	});
});

test('find tuple', async ({ page }) => {
	expect(findNumTuple([[1,2],[3,4],[5,6]],[9,0])).toBe(undefined);
	expect(findNumTuple([[1,2],[3,4],[5,6]],[1,2])).toBe([1,2]);
	expect(findNumTuple([[1,2],[3,4],[5,6]],[5,6])).toBe([5,6]);
	expect(findNumTuple([],[5,6])).toBe(undefined);
	expect(findNumTuple([],[])).toBe(undefined);
});
