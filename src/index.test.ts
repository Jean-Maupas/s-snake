import { describe, test, expect } from 'vitest';
import { findNumTuple } from '$lib/Utils';

const _DEBUG = false;

describe('Snake Unit Tests', () => {

	test('Find Tuple', () => {
		expect(findNumTuple([[1,2],[3,4],[5,6]],[9,0])).toBe(false);
		expect(findNumTuple([[1,2],[3,4],[5,6]],[1,2])).toBe(true);
		expect(findNumTuple([[1,2],[3,4],[5,6]],[5,6])).toBe(true);
		expect(findNumTuple([],[5,6])).toBe(false);
		expect(findNumTuple([],[])).toBe(false);
	});

});