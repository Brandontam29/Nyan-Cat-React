import { GAME_WIDTH, PLAYER_WIDTH } from './data';

export const nextEnemySpot = (enemies) => {
    const enemySpot = GAME_WIDTH / PLAYER_WIDTH;
    const spotsTaken = Array(enemySpot).fill(false);
    enemies.forEach((enemy) => {
        spotsTaken[enemy.spot] = true;
    });
    let candidate; // number
    while (candidate === undefined || spotsTaken[candidate]) {
        candidate = Math.floor(Math.random() * enemySpot);
    }
    return candidate;
};

export const findTrues = (array) => {
    let number = 0;
    array.forEach((bool) => {
        if (bool === true) {
            number += 1;
        }
    });

    return number;
};
