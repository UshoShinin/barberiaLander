import React from "react";

import "./Backdrop.css";
//Este componente es el fondo blanco detrás del modal, 
const backdrop = (props) => {
    const cssClasses = ['Backdrop',props.show?'BackdropOpen':'BackdropClose'];
  return <div className={cssClasses.join(' ')}></div>;
};

export default backdrop;
