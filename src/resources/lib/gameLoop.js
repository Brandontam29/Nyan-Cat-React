import { MAX_ENEMIES } from './data';
import nextEnemySpot from './nextEnemySpot';
import Enemy from '../components/game/Enemy';
// import isPlayerDead from './isPlayerDead';

const gameLoop = () => {
    let enemies = [];
    let lastFrame;
    if (lastFrame === undefined) lastFrame = new Date().getTime();
    const timeDiff = new Date().getTime() - lastFrame;
    lastFrame = new Date().getTime();
    enemies.forEach((enemy) => {
        enemy.update(timeDiff);
    });

    enemies = enemies.filter((enemy) => !enemy.destroyed);
    while (enemies.length < MAX_ENEMIES) {
        const spot = nextEnemySpot(enemies);
        enemies.push(new Enemy(spot));
    }

    // if (playerDead) {
    //     // eslint-disable-next-line no-alert
    //     window.alert('Game over');
    // }
};

export default gameLoop;
