import { useEffect, useReducer, useRef } from "react"
import classes from './Productos.module.css';
import Border from "../../components/UI/Border/Border"
import Marco from "../../components/UI/Marco/Marco"
import Input from '../../components/UI/Input/Input';
import useHttp from "../../hooks/useHttp"
import Lista from "./Lista/Lista"
import {initialState ,reducer} from './reducer';
import LoaddingSpinner from "../../components/LoaddingSpinner/LoaddingSpinner";
import inputs from "./inputs";
const Productos = (props) =>{
    const carga = useHttp();
    const [state,dispatch]  = useReducer(reducer,initialState);
    const INPUTS = inputs(state,dispatch);
    const refPN = useRef();
    const refPP = useRef();
    const refAM = useRef();
    const getRespuesta =(res) =>{
        dispatch({type:'CARGAR',payload:res.mensaje})
    }
    useEffect(()=>{
        carga({url:'/listadoProductos'},getRespuesta);
    },[])
    return <>
    {state.productos===null&&<Marco use={true} logo={true}><LoaddingSpinner/></Marco>}
    {state.productos!==null&&
        <Marco use={true} className ={classes.container}>
            <div>
                <Lista items={state.productos} className={classes.miLista} select={(item)=>{
                    console.log(item);
                    dispatch({type:'CLICK',value:item});
                    }}/>
            </div>
            <div className={classes.actions}>
                <Border >
                    <div>
                    <label>Nombre:</label>
                    <Input
                        ref={refPN}
                        isValid={state.Producto.nombre.value}
                        input={INPUTS[0]}
                    />
                    <label>Precio:</label>
                    <Input
                        ref={refPP}
                        isValid={state.Producto.price.value}
                        input={INPUTS[1]}
                    />
                    </div>
                </Border>
                <Border>
                    <div>
                        <label>Nombre:</label>
                        <Input
                            ref={refAM}
                            isValid={state.Agregar.stock.value}
                            input={INPUTS[2]}
                        />
                    </div>
                </Border>
            </div>
            <div>
                <Lista items={state.productosDiscontinuados} className={classes.miLista} select={(item)=>{
                    console.log(item);
                    dispatch({type:'CLICK',value:item});
                    }}/>
            </div>
        </Marco>}
    </>
}
export default Productos