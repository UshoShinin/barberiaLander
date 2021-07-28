import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import "./Modal.css";
import classes from './ModalContent.module.css'
import Button from '../Button/Button';
/* Variable que define el tiempo de entrada y de salida */
const animationTiming = {
  enter: 400,
  exit: 1000,
};
/* Todo el camponente tiene un CSSTransition  pero realmente las propiedades que usa solo son el show, 
para saber si el div de modal debe estar entrando o nom este tambén cuenta ocn un botón el cual puede cerrar todo el modal*/
const modal = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: '',
        enterActive: 'ModalOpen',
        exit:'',
        exitActive:'ModalClosed'
      }}
    >
      <div className={"Modal"}>
        <h1 className={classes.myH1}>Mi modal</h1>
        <Button type="button" action={props.closed} color={"red"}>
          Salir
        </Button> 
      </div>
    </CSSTransition>
  );
};

export default modal;
