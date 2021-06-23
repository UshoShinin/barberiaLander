import { useState, useReducer, useRef, useEffect, useContext } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import ComboBox from "./components/ComboBox/ComboBox";
//import Switch from "./components/Switch/Switch";
import LoaddingSpinner from "./components/LoaddingSpinner/LoaddingSpinner";
import Footer from "./components/Footer/Footer";
import Expenses from "./components/Lista/Expenses";
import Modal from "./components/UI/Modal/Modal";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Calendario from "./components/Calendario/Calendario";
import ContextUsuario from "./context/contextUsuario";
//IMPORTS PARA LAS PAGINAS
import Inicio from "./paginas/Inicio";
import Administracion from "./paginas/Administracion";
import Cuponeras from "./paginas/Cuponeras";
import Productos from "./paginas/Productos";
import Empleados from "./paginas/Empleados";
import Slider from "./paginas/Slider";
import AperturaCierre from "./paginas/Caja/AperturaCierre";
import CalculoJornal from "./paginas/Caja/CalculoJornal";
import Historial from "./paginas/Caja/Historial";
import MovimientoCaja from "./paginas/Caja/MovimientoCaja";
import CrearAgenda from "./paginas/Agenda/CrearAgenda";
import PreAgendas from "./paginas/Agenda/PreAgendas";
import VisualAgendas from "./paginas/Agenda/VisualAgendas";
import NoEncontrado from "./paginas/NoEncontrado";

const inputReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: state.isValid };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }
  if (action.type === "RESET_IS_VALID") {
    return { value: state.value, isValid: null };
  }
  return { value: "", isValid: false };
};

function App() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [mySwitch, setMySwitch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    value: "",
    isValid: null,
  });

  const inputRef = useRef();

  const { isValid: inputIsValid } = inputState; //Le asigno un alias a la variable de isValid del State del input.

  useEffect(() => {
    setFormIsValid(inputIsValid);
  }, [inputIsValid]);

  const inputChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT", value: event.target.value });
  };

  const validateInputHandler = () => {
    dispatchInput({ type: "INPUT_BLUR" });
  };

  const resetIsValid = () => {
    dispatchInput({ type: "RESET_IS_VALID" });
  };

  const switchHandler = () => {
    setMySwitch((prevState) => {
      console.log(!prevState);
      return !prevState;
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      console.log("Soy Válido :D");
    } else {
      if (!showModal) {
        inputRef.current.focus();
      }
    }
  };
  const alertaloca = () => {
    console.log("Alerta loca");
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const DUMMY_COMBOBOX = [
    { id: 1, title: "Soy la opcion 1" },
    { id: 2, title: "Soy la opcion 2" },
    { id: 3, title: "Soy la opcion 3" },
    { id: 4, title: "Soy la opcion 4" },
    { id: 5, title: "Soy la opcion 5" },
    { id: 6, title: "Soy la opcion 6" },
    { id: 7, title: "Soy la opcion 7" },
    { id: 8, title: "Soy la opcion 8" },
    { id: 9, title: "Soy la opcion 9" },
    { id: 10, title: "Soy la opcion 10" },
    { id: 11, title: "Soy la opcion 11" },
  ];

  const initialExpenses = [
    { id: "e1", title: "Producto1", amount: 200 },
    { id: "e2", title: "Producto2", amount: 300 },
    { id: "e3", title: "Producto3", amount: 20 },
    { id: "e4", title: "Producto4", amount: 500 },
  ];

  //DEJO ACA LO QUE IRIAMOS A USAR PARA CUANDO CONTROLEMOS A DONDE TIENE QUE IR EL USUARIO
  //ESTO POR AHORA QUEDA NADA MAS, CUANDO ACOMODEMOS LAS COSAS PARA QUE QUEDEN PROLIJAS HAY QUE PONER EL IMPORT DONDE TIENE QUE IR
  //HAY QUE IMPORTAR useContext y ContextUsuario donde sea que vayamos a ir
  //DEJO UNA LISTA CON COMPONENTES LINKS QUE SON LOS QUE DEBERIAMOS USAR EN EL HEADER, SE VAN A RENDERIZAR SEGUN EL ROL
  const ctxUsuario = useContext(ContextUsuario);
  const estaLogueado = ctxUsuario.estaLogueado;
  const rol = ctxUsuario.rol;

  return (
    <div className="App">
      {/*ESTAS SON LAS RUTAS POSIBLES A GRANDES RASGOS*/}
      <Switch>
        <Route path="/" exact>
          <Redirect to="/inicio" />
        </Route>
        <Route path="/inicio">
          <Inicio />
        </Route>
        <Route path="/administracion">
          <Administracion />
        </Route>
        <Route path="/administracion/cuponeras" exact>
          <Cuponeras />
        </Route>
        <Route path="/administracion/empleados" exact>
          <Empleados />
        </Route>
        <Route path="/administracion/productos" exact>
          <Productos />
        </Route>
        <Route path="/administracion/slider" exact>
          <Slider />
        </Route>
        <Route path="/administracion/agenda/crearagenda" exact>
          <CrearAgenda />
        </Route>
        <Route path="/administracion/agenda/preagendas" exact>
          <PreAgendas />
        </Route>
        <Route path="/administracion/agenda/visualagendas" exact>
          <VisualAgendas />
        </Route>
        <Route path="/administracion/caja/aperturacierre" exact>
          <AperturaCierre />
        </Route>
        <Route path="/administracion/caja/calculojornal" exact>
          <CalculoJornal />
        </Route>
        <Route path="/administracion/caja/historial" exact>
          <Historial />
        </Route>
        <Route path="/administracion/caja/movimientocaja" exact>
          <MovimientoCaja />
        </Route>
        <Route path="*">
          <NoEncontrado />
        </Route>
      </Switch>

      {/*ESTA ES LA LISTA QUE HAY DE LOS LINKS CON LOS CONTROLES*/}
      <ul>
        <li>
          <NavLink to="/inicio">Inicio</NavLink>
        </li>
        {!estaLogueado && (
          <li>Iniciar sesion</li>
        )}
        {estaLogueado && (rol == "Administrador" || rol == "Encargado" || rol == "Empleado") && (
            <div>
              <li>
                <NavLink to="/administracion">Administracion</NavLink>
              </li>
              <li>
                <NavLink to="/administracion/agenda/visualagendas">
                  Visualizar Agendas
                </NavLink>
              </li>
              <li>
                <NavLink to="/administracion/agenda/crearagenda">
                  Crear Agenda
                </NavLink>
              </li>
              <li>
                <NavLink to="/administracion/caja/movimientocaja">
                  Movimiento de Caja
                </NavLink>
              </li>
            </div>
        )}
        {estaLogueado && rol == "Encargado" && (
          <div>
            <li>
              <NavLink to="/administracion/cuponeras">Cuponeras</NavLink>
            </li>
            <li>
              <NavLink to="/administracion/empleados">Empleados</NavLink>
            </li>
            <li>
              <NavLink to="/administracion/slider">Slider</NavLink>
            </li>
            <li>
              <NavLink to="/administracion/agenda/preagendas">
                Pre Agendas
              </NavLink>
            </li>
            <li>
              <NavLink to="/administracion/caja/aperturacierre">
                Abrir/Cerra Caja
              </NavLink>
            </li>
            <li>
              <NavLink to="/administracion/caja/calculojornal">
                Calcular Jornal
              </NavLink>
            </li>
            <li>
              <NavLink to="/administracion/caja/historial">
                Historial de Cajas
              </NavLink>
            </li>
          </div>
        )}
      </ul>

      {/* <form onSubmit={submitHandler} className='fill-window'>
        <div style={{display:'flex',placeItems:'center',alignItems:'center',justifyContent: 'center',height:'100%'}}>
          <Input
          ref={inputRef}
          isValid={inputIsValid}
          input={{
            id: 1,
            type: "text",
            value: inputState.value,
            placeholder: "Ingrese un texto",
            onChange: inputChangeHandler,
            onBlur: validateInputHandler,
            onFocus:resetIsValid,
          }}
        />
         <Button type="submit" action={openModal} color={""}>
          Aceptar
        </Button> 
        
        <ComboBox opciones={DUMMY_COMBOBOX}/>
        <Switch active={mySwitch}onCheck={switchHandler}/>
        <LoaddingSpinner/> 
        </div>
      </form>
      <Modal show={showModal} closed={closeModal}/>
      {showModal&& <Backdrop show={showModal}/>} */}
      <Calendario />
      {/* <Footer/> */}
    </div>
  );
}

export default App;
