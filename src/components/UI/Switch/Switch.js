import './Switch.css';
const Switch = props =>{
    const clickHandler = ()=>{
        props.onCheck();
    }
    const classes = ['normalInput',props.active ?'active':null];
    return <label className='switch'>
        <input type='checkbox' onClick={clickHandler} className={classes.join(' ')}/>
        <span className='slider'></span>
    </label>
}

export default Switch;