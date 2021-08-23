import CSSTransition from "react-transition-group/CSSTransition";
import SimpleButton from "../SimpleButton/SimpleButton";
import classes from "./SimpleNote.module.css";
const SimpleNote = (props) => {
    console.log(props.show);
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={160}
      classNames={{
        enter: ``,
        enterActive: `${classes.NoteOpen}`,
        exit: "",
        exitActive: `${classes.NoteClose}`,
      }}
    >
      <div className={classes.Note}>
          <SimpleButton color='red'>X</SimpleButton>
        <p>{props.children}</p>
      </div>
    </CSSTransition>
  );
};
export default SimpleNote;
