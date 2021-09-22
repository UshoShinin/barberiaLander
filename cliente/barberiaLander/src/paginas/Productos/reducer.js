import { validarMonto } from "../../FuncionesAuxiliares/FuncionesAuxiliares";
export const initialState = {
    productos: null,
    productosDiscontinuados: null,
    producto: null,
    Producto:{
        nombre:{value:'',isValid:null},
        price:{value:'',isValid:null}
    },
    Agregar:{
        stock:{value:'',isValid:null}
    }
  };
  
export const reducer = (state, action) => {
    let valido;
    let nombre;
    let pro=[];
    let dis=[];
    switch (action.type) {
        case "CARGAR":
            let data = {}
            action.payload.forEach(P => {
                if(!P.discontinuado) pro.push(P);
                else dis.push(P);
            });
            if(action.datos!==undefined){
                data = {...action.datos};
            }
            return { ...state, productos: [...pro],productosDiscontinuados:[...dis],...data};
        case "CLICK": 
            return {...state,producto: action.value};
        case "USER_P_NOMBRE":
            return {
                ...state,
                Producto:{...state.Producto,nombre:{...state.Producto.nombre,value:action.value}},
            };
        case "FOCUS_P_NOMBRE":
            return {
                ...state,
                Producto:{...state.Producto,nombre:{...state.Producto.nombre,isValid:null}},
            };
        case "BLUR_P_NOMBRE":
            nombre = state.Producto.nombre.value.trim().length
            valido = nombre>0&&nombre<21;
            return {
                ...state,
                Producto:{...state.Producto,nombre:{...state.Producto.nombre,isValid:valido}},
            };
        case "USER_P_PRICE":
            return {
                ...state,
                Producto:{...state.Producto,price:{...state.Producto.price,value:action.value}},
            };
        case "FOCUS_P_PRICE":
            return {
                ...state,
                Producto:{...state.Producto,price:{...state.Producto.price,isValid:null}},
            };
        case "BLUR_P_PRICE":
            valido = validarMonto(state.Producto.price.value);
            return {
                ...state,
                Producto:{...state.Producto,price:{...state.Producto.price,isValid:valido}},
            };

        case "USER_A_STOCK":
            return {
                ...state,
                Agregar:{...state.Agregar,stock:{...state.Producto.stock,value:action.value}},
            };
        case "FOCUS_A_STOCK":
            return {
                ...state,
                Agregar:{...state.Agregar,stock:{...state.Producto.stock,isValid:null}},
            };
        case "BLUR_A_STOCK":
            valido = validarMonto(state.Agregar.stock.value);
            return {
                ...state,
                Agregar:{...state.Agregar,stock:{...state.Agregar.stock,isValid:valido}},
            };
        default:
            return {...state}
        /* case "SELECT":
            return { ...state, empleado: { active: false, value: action.value } }; */
    }
};