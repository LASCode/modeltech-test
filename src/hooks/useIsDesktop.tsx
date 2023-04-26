import {useAppSelector} from "./hooks";
import {getIsDesktop} from "store/modules/windowSize";

export const useIsDesktop = () => useAppSelector(getIsDesktop);