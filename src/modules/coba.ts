export const getDiceScoreCombinations = (teamDices: string[]) => {
    return teamDices;
}

export const isDiceCombinationsAreEquals = (teamDices: string[], opponentDices: string[]) => {
    return teamDices === opponentDices;
};

export const findSolution = (dices: string[] | string[][]) => {
    return [dices, dices];
}