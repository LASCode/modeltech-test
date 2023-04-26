import {useCallback, useEffect, useState} from "react";
import {getWindowSize} from "utils";

export const useWindowSize = () => {
    const [size, setSize] = useState(getWindowSize());

    const handleWindowResize = useCallback(() => setSize(getWindowSize()), []);

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    return size;
};
