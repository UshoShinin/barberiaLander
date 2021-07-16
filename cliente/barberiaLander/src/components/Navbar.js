import React , {useEffect} from 'react'
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

const Navbar = () => {

  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }

  useEffect(() => {  
    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });
    
  }, []);

  return (
  <nav className="navbar navbar-expand-lg navbar-mainbg">
    
      <NavLink className="navbar-brand navbar-logo" to="/" exact>
        Lander
      </NavLink>
    
    
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>
 
      <div 
        className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            <li className="nav-item active">
            <NavLink to="/inicio">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/administracion">Administracion</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/agenda/visualagendas">
              Visualizar Agendas
            </NavLink>
          </li>
          
          <li className="nav-item">
            <NavLink to="/caja/movimientocaja">
              Movimiento de Caja
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/agenda/crearagenda">
              Crear Agenda
            </NavLink>
          </li>
          <li className="nav-item"> 
            <NavLink to="/cuponeras">Cuponeras</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/empleados">Empleados</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/slider">Slider</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/agenda/preagendas">
              Pre Agendas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/caja/aperturacierre">
              Abrir/Cerra Caja
            </NavLink>
            <ul>
            <li className="nav-item">
            <NavLink to="/caja/calculojornal">
              Calcular Jornal
            </NavLink>
          </li>
            </ul>
          </li>
          
          <li className="nav-item">
            <NavLink to="/caja/historial">
              Historial de Cajas
            </NavLink>
          </li>
        </ul>
      </div>
  </nav>
  )
}
export default Navbar;