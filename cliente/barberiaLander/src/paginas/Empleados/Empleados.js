import {useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
const Empleados = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    console.log('Carge');
    const user = authCtx.user
    useEffect(()=>{
        if(user===null||(user.rol!=='Administrador'&&user.rol!=='Encargado'))history.replace('/');
    },[history,user])
    return (
        <div className="container">
        <h1 className="text-center" style= {{paddingTop: "%30"}}>
        SOY LA PAGINA DONDE SE PUEDEN VER TODOS LOS EMPLEADOS
        </h1>
    </div>
    )
};

export default Empleados;