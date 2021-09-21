import Border from "../../components/UI/Border/Border"
import Marco from "../../components/UI/Marco/Marco"
import Lista from "./Lista/Lista"
const Productos = (props) =>{
    return <Marco>
        <Border><Lista/></Border>
        <div>
            <Border></Border>
            <Border></Border>
        </div>
    </Marco>
}
export default Productos