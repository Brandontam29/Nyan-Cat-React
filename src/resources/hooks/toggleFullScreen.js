/* eslint-disable no-restricted-globals */
import { useState } from 'react';

const toggleFullScreen = () => {
    const [fullScreen, setFullScreen] = useState(false);

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setFullScreen(true);
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
    }

    return fullScreen;
};

export default toggleFullScreen;
