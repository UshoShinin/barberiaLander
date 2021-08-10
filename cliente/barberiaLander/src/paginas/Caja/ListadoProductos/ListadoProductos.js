import classes from './ListadoProductos.module.css';
import { useReducer } from 'react';

const reducer = (state,action) => {
  switch(action.type){
    case 'CLICK':
      return [...state];
  }
}

const ListadoProductos = (props) => {
  const initialState = [];
  const [listado,dispatchP] = useReducer(reducer,initialState);

  const content = props.productos.map((p) => {
    return <li onClick={()=>{}}>{p.nombre}</li>;
  });
  return <ul className={classes.productos}>{content}</ul>;
};
export default ListadoProductos;
