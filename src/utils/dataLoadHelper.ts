import { ALL_TESTS } from '../constants';

import type { Test } from '../types/tests';

/*
 * function returns all tests to show customer
 * forn now it return test data but 
 * if need replace this with getting data from server
 */
export const getAllTests = (): Test[] => {
    return ALL_TESTS;
};
