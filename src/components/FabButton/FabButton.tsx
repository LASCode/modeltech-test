import {FabButtonProps} from "./FabButton.types";
import {Button} from "primereact/button";
import {SpeedDial} from "primereact/speeddial";

export const FabButton = ({children, ...props}: FabButtonProps) => {


    return <SpeedDial  radius={120} type="quarter-circle" direction="down-right" style={{ left: 0, top: 0 }} buttonClassName="p-button-help" />
}