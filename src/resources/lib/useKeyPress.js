/* eslint-disable no-restricted-globals */
import { useEffect, useRef } from 'react';

const useKeyPress = (key, callback) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    });

    useEffect(() => {
        const handle = () => {
            if (event.key === key) {
                callbackRef.current(event);
            }
        };
        document.addEventListener('keypress', handle);
        return () => document.removeEventListener('keypress');
    }, [key]);
};

export default useKeyPress;
