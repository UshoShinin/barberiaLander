import classes from './Switch.module.css';
/* Este componente realmente se maneja utilizando un label, el input está para manter la información,
este componente puede ser fucionado con el checkbox en una futura implementación */
const Switch = props =>{
    return <label className={classes.switch}>
        <input type='checkbox' onClick={props.onCheck} className={`${classes.normalInput} ${props.active?classes.active:''}`}/>
        <span className={classes.slider}></span>
    </label>
}

export default Switch;