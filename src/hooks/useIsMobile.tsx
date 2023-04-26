import {useAppSelector} from "./hooks";
import {getIsMobile} from "store/modules/windowSize";

export const useIsMobile = () => useAppSelector(getIsMobile);