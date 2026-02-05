export type AlertPropsType = {
    type : "DANGER" | "WARNING"
    text: string
    closeAlert?: {
        function: () => void;
        message: string;
    }
    actionToApply?: {
        function: () => void;
        message: string;
    }
}