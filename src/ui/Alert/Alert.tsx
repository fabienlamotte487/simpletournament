import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { AlertPropsType } from '@/types/alert';

function Alert(props: AlertPropsType) {
    const {type, text, closeAlert, actionToApply} = props;
    const iconSize = 36;
    const icon = type === "DANGER" ? <DangerousIcon sx={{fontSize:iconSize}} /> : <ReportProblemIcon sx={{fontSize:iconSize}} />;
    let classList = "card-alert flex flex-col gap-3 py-5 px-5 item-center " + (type === "DANGER" ? "danger" : "warning");

    return (
        <div className={classList}>
            <div className='flex gap-5'>
                {icon}
                <p className='card-alert-title'>{text}</p>
            </div>
            {(closeAlert || actionToApply != null) && 
                <div className='flex flex-wrap gap-2'>
                    {actionToApply != null && 
                        <button type="button" onClick={actionToApply.function}>{actionToApply.message || "Fermer"}</button>}
                    {closeAlert && 
                        <button type="button" onClick={closeAlert.function}>{closeAlert.message || "Fermer"}</button>}
                </div>
            }
        </div>
    )
}

export default Alert