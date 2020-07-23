import {checkForUserInput } from '../client/js/nameChecker'
describe('Check user input', () => {
    test('text', () => {
        expect(checkForUserInput('test works')).toEqual(true);
      });
      test('empty', () => {
          expect(checkForUserInput('', false)).toEqual(false);
        });
});