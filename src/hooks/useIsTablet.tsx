import {useAppSelector} from "./hooks";
import {getIsTablet} from "store/modules/windowSize";

export const useIsTablet = () => useAppSelector(getIsTablet);