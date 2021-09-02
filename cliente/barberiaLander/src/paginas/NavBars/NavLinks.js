import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useContext, useReducer, useState } from "react";
import AuthContext from "../../store/AuthContext";
import Menu from "./Menu/Menu";
const NavLinks = (props) => {
  const initialState = { place: -1, active: -1 };
  const reducer = (state, action) => {
    switch (action.type) {
      case "RESET":
        return { place: -1, active: -1 };
      case "CHANGE_PLACE":
        return { place: action.value, active: -1 };
      case 'CHANGE_ACTIVE':
        return { place: -1, active: state.active===action.value?-1: action.value};
    }
  };

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [state,dispatch]=  useReducer(reducer,initialState);
  console.log(authCtx);
  const Menus = [
    {
      id: 1,
      text: "Administracion",
      opciones: [{ id: 1, text: "Empleados", to: "/empleados" }],
    },
  ];
  const NavOnClick = () => {
    if (props.onClick !== null) {
      props.onClick();
    }
    dispatch({type:'RESET'});
  };
  return (
    <ul className={classes.navbarUl}>
      {/* <li><Link to="/" className="navbar-brand">Lander</Link></li>  */}
      <li>
        <NavLink
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          to="/inicio"
        >
          <span data="Inicio">Inicio</span>
        </NavLink>
      </li>
      {/* <li>
        <NavLink 
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          
          to="/caja/historial"
        >
          <span data="Historial de Cajas">Historial de Cajas</span>
        </NavLink>{" "}
      </li> */}
      {/* <li><NavLink onClick={props.onClick()} exact activeClassName="actidata=''ve"  to="/caja/calculojornal>Calcular Jornal</NavLink></li> */}
      <li>
        <NavLink
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          to="/caja/aperturacierre"
        >
          <span data="Abrir/Cerra Caja">Abrir/Cerra Caja</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          to="/agenda/preagendas"
        >
          <span data="Pre Agendas">Pre Agendas</span>
        </NavLink>
      </li>
      {/* <li>
        <NavLink 
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          
          to="/slider"
        >
          <span data="Slider">Slider</span>
        </NavLink>
      </li> */}
      {/* <li>
        <NavLink 
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          
          to="/cuponeras"
        >
          <span data="Cuponeras">Cuponeras</span>
        </NavLink>
      </li> */}
      <li>
        <NavLink
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          to="/agenda/crearagenda"
        >
          <span data="Reserva">Reserva</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          to="/registro"
        >
          <span data="Registro">Registro</span>
        </NavLink>{" "}
      </li>
      {!isLoggedIn && (
        <li>
          <NavLink
            onClick={NavOnClick}
            exact
            activeClassName={classes.active}
            to="/login"
          >
            <span data="Login">Login</span>
          </NavLink>{" "}
        </li>
      )}
      {/* <li><NavLink onClick={props.onClick()} exact activeClassName="active"  to="/caja/movimientocaja">Movimiento de Caja</NavLink>    </li>  */}
      <li>
        <Menu
          current={state.place}
          active={state.active}
          onClick={(id) => {
            dispatch({type:'CHANGE_ACTIVE',value:id});
          }}
          change={(id) => {
            props.onClick();
            dispatch({type:'CHANGE_PLACE',value:id});
          }}
          miniMenu={Menus[0]}
        />
      </li>
      <li>
        <NavLink
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          to="/agenda/visualagendas"
        >
          <span data="Visualizar Agendas">Visualizar Agendas</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={NavOnClick}
          exact
          activeClassName={classes.active}
          to="/administracion"
        >
          <span data="Administracion">Administracion</span>
        </NavLink>
      </li>
      
    </ul>
  );
};

export default NavLinks;