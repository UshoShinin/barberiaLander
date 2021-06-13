import {useState} from 'react';
import classes from './ComboBox.module.css';
const ComboBox = props =>{
const [active,setActive]=useState(false);

const clickHandler = () =>{
    setActive((prevState)=>(!prevState));
}
    return(
        <div className={classes.ComboBox}>
            <div onClick={clickHandler} className={`${classes.select} ${active?classes.active:''}`}>
                <div className='contenido-select'>
                    <h1 className={classes.title}>{props.title}</h1>
                    <p className={classes.description}>{props.description}</p>
                </div>
                <div className={classes.buttom}>\/</div>
            </div>
            <div className={classes.options}></div>
        </div>
    );
}
export default ComboBox;