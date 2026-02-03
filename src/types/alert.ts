export type AlertPropsType = {
    type : "DANGER" | "WARNING"
    text: string
    closeAlert?: {
        function: Function;
        message: string;
    }
    actionToApply?: {
        function: Function;
        message: string;
    }
}