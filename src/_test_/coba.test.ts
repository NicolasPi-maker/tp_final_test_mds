import {describe, expect, it, test} from "vitest";
import { getDiceScoreCombinations, isDiceCombinationsAreEquals, findSolution } from "../modules/coba.ts";

/**
 * L'implémentation n'a pas encore été faite
 * Aucun test ne passe pour le moment
*/
describe('found Coba dice problem solution', () => {
    describe('Should return dice value for one face in normal case', () => {
        it('should return the value of the green dice', () => {
            expect(getDiceScoreCombinations(['green'])).toBe(1);
        });
        it('should return the value of the gray dice', () => {
            expect(getDiceScoreCombinations(['gray'])).toBe(2);
        });
        it('should return the value of the orange dice when is alone', () => {
            expect(getDiceScoreCombinations(['orange'])).toBe(1);
        });
        it('should return the value of the blue dice when is alone', () => {
            expect(getDiceScoreCombinations(['blue'])).toBe(0);
        });
        it('should return the value of pink dice when is alone', () => {
            expect(getDiceScoreCombinations(['pink'])).toBe(3);
        });
    });
    describe('Yellow dice cases', () => {
        it('should return the value of the yellow dice', () => {
            expect(getDiceScoreCombinations(['yellow'])).toBe(-1);
        });
        it('Two yellow dices should return -2', () => {
            expect(getDiceScoreCombinations(['yellow', 'yellow'])).toBe(-1 + -1);
        });
        it('Should return total value -1 when a yellow dice is with others dices', () => {
            expect(getDiceScoreCombinations(['yellow', 'green'])).toBe(-1 + 1);
        });
    });
    describe('Should return dice value with dices powers', () => {
        describe('orange power conditions', () => {
            it('orange dice value should be 2 when group length is paire', () => {
                expect(getDiceScoreCombinations(['green', 'orange'])).toBe(1 + 2);
            });
            it('orange dice value should be 1 when group length is impaire', () => {
                expect(getDiceScoreCombinations(['green', 'green', 'orange'])).toBe(1 + 1 + 1);
            });
        });
        describe('pink power conditions', () => {
           it('should set dice value to 0 of the lowest dice value when pink is present', () => {
              expect(getDiceScoreCombinations(['green', 'pink', 'green'])).toBe((1 - 1) + (1 - 1) + 3);
           });
           it('two pink dices have no effect', () => {
                expect(getDiceScoreCombinations(['pink', 'pink'])).toBe(3 + 3);
           });
          it('should set other dice value to 0 one time when two pink dices is present', () => {
             expect(getDiceScoreCombinations(['green', 'pink', 'pink'])).toBe((1 - 1) + 3 + 3);
          });
          it('yellow dice value should be 0 when pink dice is present', () => {
                expect(getDiceScoreCombinations(['yellow', 'pink', 'gray'])).toBe(-(1 - 1) + 2 + 3);
          });
        });
        describe('blue power conditions', () => {
            it('should return 0 when blue dice is with another dice', () => {
                expect(getDiceScoreCombinations(['blue', 'green'])).toBe(0 + 1);
            });
            it('should return 0 when blue dice is with another blue dice', () => {
                expect(getDiceScoreCombinations(['blue', 'blue'])).toBe(0);
            });
        });
    });

    describe('Should return teams equality regardless of the order of the teams', () => {
        it('should return true when the two teams have strickly the same dice\'s order', () => {
            expect(isDiceCombinationsAreEquals(['green', 'blue'], ['blue', 'green'])).toBe(true);
        });
        it('should return true when the two teams have the same dices but with different order', () => {
            expect(isDiceCombinationsAreEquals(['green', 'blue'], ['blue', 'green'])).toBe(true);
        });
    });

    /**
     * Données de test contenant la solution pour éffectuer des tests batch
     */
    const data = [
        [
            /** Ensemble des dés */
            ['green', 'green', 'gray', 'green', 'green', 'green', 'green'],
            [
                /** Solution */
                ['green', 'green', 'gray'],
                ['green', 'green', 'green','green'],
            ]
        ],
        [
            ['gray', 'gray', 'gray', 'gray', 'green', 'orange', 'green'],
            [
                ['gray', 'gray', 'gray'],
                ['green', 'orange', 'green', 'gray'],
            ]
        ],
        [
            ['gray', 'gray', 'gray', 'gray', 'orange', 'orange', 'yellow'],
            [
                ['gray', 'gray', 'orange', 'yellow'],
                ['orange', 'orange', 'gray'],
            ]
        ],
        [
            ['green', 'green', 'green', 'green', 'blue', 'gray', 'gray'],
            [
                ['green', 'green', 'blue'],
                ['green', 'green', 'gray', 'gray'],
            ]
        ],
        [
            ['gray', 'gray', 'gray', 'pink', 'green', 'yellow', 'green'],
            [
                ['gray', 'gray', 'pink'],
                ['green', 'yellow', 'green', 'gray'],
            ]
        ],
    ]

    describe('Coba', () => {
        describe('Solutions', () => {
            test.each(data)('Problem %# for %p', (input, solution) => {
                expect(findSolution(input)).toEqual(solution)
            })
        });
    });
});