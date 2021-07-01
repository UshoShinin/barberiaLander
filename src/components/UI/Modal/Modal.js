import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import "./Modal.css";
import classes from './ModalContent.module.css'
import Button from '../../Button';
const animationTiming = {
  enter: 400,
  exit: 1000,
};

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
