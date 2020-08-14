import { GAME_WIDTH, PLAYER_WIDTH } from './data';

const nextEnemySpot = (enemies) => {
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

export default nextEnemySpot;
