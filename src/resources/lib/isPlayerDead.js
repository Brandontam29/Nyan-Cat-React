import { useState } from 'react';

const isPlayerDead = ({ touch = false }) => {
    const [dead, setDead] = useState(false);
    if (touch) {
        setDead(true);
    }
    return dead;
};

export default isPlayerDead;
