import React, {useReducer} from "react";
import {useForm} from '../../hooks/useForm';


const init =()=>{
    return{
        idCaja: new Date(),
        desc:'AbrirCaja',
        montoInicial: 0
    };
}


const todoReducer = (state, action) =>{  
    switch (action.type) {
        case 'AbrirCaja':
            return {...state, montoInicial: action.payload};    
        default:
            return state;
    }
}

const AperturaCierre = () => {
    
    const [state, dispatch] = useReducer(todoReducer, init);  

    const [{montoInicial}, handleInputChange, reset] = useForm({        
        montoInicial:''
    });    

    const handleSubmit = (e)=>{

        const abrirCaja = {
            idCaja: new Date().getFullYear(),
            desc:montoInicial,
            montoInicial: 0
        }
        
        const action = {
            type:'AbrirCaja',
            payload: abrirCaja
        }
      
        dispatch(action);
        reset();
    }

    return (
        <form onSubmit = {handleSubmit}>
            <input
                type="number"
                name="montoInicial"
                placeholder="Ingrese monto..."
                autoComplete="off"
                value= {state.montoInicial}
                onChange = {handleInputChange}
            />
            <button type="submit">
                Abrir Caja
            </button>
        </form>
    )   
};

export default AperturaCierre;