//En este context se guarda el usuario logueado, siempre que alguien se loguee se va a guardar los datos
//Los datos que se guardan van a ser el ROl y la Cedula del usuario
//Esto no hace ningun control ni nada, solamente setea y borra.
//Los controles los va a hacer la API estos metodos del manejadorInicioSesion y manejadorCierreSesion setean 
//los datos anteriores que se mencionaro
//PARA PODER INICIAR SESION/CERRAR SESION HAY QUE LLAMAR DE LA SIGUIENTE MANERA

//contextUsuario.iniciarSesion(cedula,rol)/contextUsuario.cerrarSesion()

//La cedula y el rol la devuelve la API


import React, { useState } from 'react';

const ContextUsuario = React.createContext({
    cerrarSesion: () => { },
    iniciarSesion: (cedula, contra) => { },
    estaLogueado: false,
    cedula: '',
    rol: 'invitado'
});

export const ContextUsuarioProvider = (props) => {
    const [cedula, setCedula] = useState(null);
    const [rol, setRol] = useState('invitado');

    const usuarioLogueado = !!cedula;

    const manejadorInicioSesion = (cedula, rol) => {
        setCedula(cedula);
        setRol(rol);
    }
    const manejadorCierreSesion = () => {
        setCedula(null);
        setRol('invitado');
    }

    const valorContext = {
        cerrarSesion: manejadorCierreSesion,
        iniciarSesion: manejadorInicioSesion,
        estaLogueado: usuarioLogueado,
        cedula: cedula,
        rol: rol
    }
    return <ContextUsuario.Provider value={valorContext}>{props.children}</ContextUsuario.Provider>
}

export default ContextUsuario;
