
import React , {useEffect} from 'react'
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';

const Navbar = () => {

  return (
    <nav className="navbar-ul">
      <li><Link to="/" className="navbar-brand">Lander</Link></li> 

      <li><NavLink exact activeClassName="active"  to="/inicio" className="nav-item nav-link">Inicio</NavLink></li>
      <li><NavLink exact activeClassName="active"  to="/caja/historial" className="nav-item nav-link">Historial de Cajas</NavLink>  </li>
      {/* <li><NavLink exact activeClassName="active"  to="/caja/calculojornal"className="nav-item nav-link">Calcular Jornal</NavLink></li> */}
      <li><NavLink exact activeClassName="active"  to="/caja/aperturacierre" className="nav-item nav-link">Abrir/Cerra Caja</NavLink></li>
      <li><NavLink exact activeClassName="active"  to="/agenda/preagendas" className="nav-item nav-link">Pre Agendas</NavLink></li>
      <li><NavLink exact activeClassName="active"  to="/slider" className="nav-item nav-link">Slider</NavLink ></li>
      <li><NavLink exact activeClassName="active"  to="/empleados" className="nav-item nav-link">Empleados</NavLink></li>
      <li><NavLink exact activeClassName="active"  to="/cuponeras" className="nav-item nav-link">Cuponeras</NavLink></li>
      <li><NavLink exact activeClassName="active"  to="/agenda/crearagenda" className="nav-item nav-link">Crear Agenda</NavLink></li>
      <li><NavLink exact activeClassName="active"  to="/registro" className="nav-item nav-link">Registro</NavLink>   </li>         
      {/* <li><NavLink exact activeClassName="active"  to="/caja/movimientocaja" className="nav-item nav-link">Movimiento de Caja</NavLink>    </li>  */}       
      <li><NavLink exact activeClassName="active"  to="/agenda/visualagendas" className="nav-item nav-link">Visualizar Agendas</NavLink>   </li>         
      <li><NavLink exact activeClassName="active"  to="/administracion" className="nav-item nav-link">Administracion</NavLink>           </li> 
      

    </nav>
 
  )
}
export default Navbar;


