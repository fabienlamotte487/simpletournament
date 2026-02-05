"use client"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

function Backbutton() {
    const router = useRouter()

    function handleBack() {
        router.back();
    }

    return (
        <button
            type="button"
            className={`btn-icon cercled`}
            onClick={handleBack}
            aria-label="Retour à la page précédente">
            <ArrowBackIcon />
        </button>
    )
}

export default Backbutton