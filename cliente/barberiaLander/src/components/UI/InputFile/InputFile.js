import classes from "./InputFile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPlus } from "@fortawesome/free-solid-svg-icons";
const Input = (props) => {
  return (
    <div className={classes.div}>
      <label className={classes.label} htmlFor={props.input.id}>
        <div className={classes.icons}>
          <FontAwesomeIcon className={classes.icon} icon={faImage} />
          <FontAwesomeIcon className={classes.plus} icon={faPlus} />
        </div>
        {props.label}
      </label>
      <input
        type="file"
        {...props.input}
        className={classes.file}
        accept="image/*"
      />
    </div>
  );
};
export default Input;
