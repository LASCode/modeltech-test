import {useAppDispatch} from "./hooks";
import {useEffect} from "react";
import {useWindowSize} from "./useWindowSize";
import {setHeight, setWidth} from "store/modules/windowSize";

export const useAppWindowSize = () => {
    const dispatch = useAppDispatch();

    const size = useWindowSize();

    useEffect(() => {
        dispatch(setWidth(size.width));
    }, [dispatch, size.width]);

    useEffect(() => {
        dispatch(setHeight(size.height));
    }, [dispatch, size.height]);
};