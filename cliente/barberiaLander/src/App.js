/* import {useContext } from "react"; */
/* import ContextUsuario from "./context/contextUsuario"; */
import "./App.css";
//IMPORTS PARA LAS PAGINAS
import Inicio from "./paginas/Inicio/Inicio";
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
import PreAgendas from "./paginas/Agenda/PreAgendas/PreAgendas";
import VisualAgendas from "./paginas/Agenda/VisualAgendas/VisualAgendas";
import Registro from "./paginas/Registro/Registro";
import Login from "./paginas/Login/Login";
import NoEncontrado from "./paginas/NoEncontrado";
import NavBar from './paginas/NavBars/NavBar';
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { register } from "react-scroll/modules/mixins/scroller";
const App = () => {
  //DEJO ACA LO QUE IRIAMOS A USAR PARA CUANDO CONTROLEMOS A DONDE TIENE QUE IR EL USUARIO
  //ESTO POR AHORA QUEDA NADA MAS, CUANDO ACOMODEMOS LAS COSAS PARA QUE QUEDEN PROLIJAS HAY QUE PONER EL IMPORT DONDE TIENE QUE IR
  //HAY QUE IMPORTAR useContext y ContextUsuario donde sea que vayamos a ir
  //DEJO UNA LISTA CON COMPONENTES LINKS QUE SON LOS QUE DEBERIAMOS USAR EN EL HEADER, SE VAN A RENDERIZAR SEGUN EL ROL
  /* const ctxUsuario = useContext(ContextUsuario);
  const estaLogueado = ctxUsuario.estaLogueado;
  const rol = ctxUsuario.rol; */

  return (
    <div className="App">
      {/*ESTAS SON LAS RUTAS POSIBLES A GRANDES RASGOS*/}
      <Router>
        <main>
          <NavBar />
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
            <Route path="/agenda/visualagendas" exact>
              <VisualAgendas />
            </Route>
            <Route path="/empleados" exact>
              <Empleados />
            </Route>
            <Route path="/productos" exact>
              <Productos />
            </Route>
            <Route path="/slider" exact>
              <Slider />
            </Route>
            <Route path="/agenda/crearagenda" exact>
              <CrearAgenda agenda={null}/>
            </Route>
            <Route path="/agenda/preagendas" exact>
              <PreAgendas />
            </Route>
            <Route path="/registro" exact>
              <Registro/>
            </Route>
            <Route path="/login" exact>
              <Login/>
            </Route>
            <Route path="/cuponeras" exact>
              <Cuponeras />
            </Route>
            <Route path="/caja/aperturacierre" exact>
              <AperturaCierre />
            </Route>
            <Route path="/caja/calculojornal" exact>
              <CalculoJornal />
            </Route>
            <Route path="/caja/historial" exact>
              <Historial />
            </Route>
            <Route path="/caja/movimientocaja" exact>
              <MovimientoCaja />
            </Route>
            <Route path="*">
              <NoEncontrado />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
