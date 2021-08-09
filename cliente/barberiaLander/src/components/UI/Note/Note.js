import CSSTransition from "react-transition-group/CSSTransition";
import classes from "./Note.module.css";
const Note = (props) => {
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
        <p>{props.children}</p>
        <div className={classes.LoadingBar}>
            <span className={`${classes.Bar} ${props.show?classes.BarClose:''}`}></span>
        </div>
      </div>
    </CSSTransition>
  );
};
export default Note;
