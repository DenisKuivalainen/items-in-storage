const { useState, useLayoutEffect } = require("react");

const useClientHeight = (sub) => {
    const [size, setSize] = useState(0);
    const updateSize = () => setSize(document.documentElement.clientHeight);

    // Get window size
    useLayoutEffect(() => {
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    // Get client size
    sub = !!sub ? sub : 0;

    return size - sub;
}

module.exports = { useClientHeight };