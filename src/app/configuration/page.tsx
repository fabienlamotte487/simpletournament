import Configuration from "@/src/components/forms/configuration"
import Backbutton from "@/src/ui/Buttons/backbutton"
import ShapePage from "@/src/ui/page/ShapePage"

function page() {
    return <ShapePage back>
        <Configuration />
    </ShapePage>
}

export default page