import {useCallback, useState} from "react";

export const useBooleanState = (initial?: boolean): [boolean, () => void, () => void, () => void] => {
    const [ value, setValue ] = useState<boolean>(initial || false);

    const setFalse = useCallback(() => setValue(false), []);
    const setTrue = useCallback(() => setValue(true), []);
    const toggleValue = useCallback(() => setValue((prev) => !prev), [])

    return ([value, setTrue, setFalse, toggleValue]);
};