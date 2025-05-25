import { getAllTests } from '../utils/dataLoadHelper';
import { ALL_TESTS } from '../constants';

describe('getAllTests', () => {
  it('should match the ALL_TESTS constant', () => {
    expect(getAllTests()).toEqual(ALL_TESTS);
  });
});
