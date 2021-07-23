import './Card.css'

function Card(props){
    const classes = 'card ' + props.className;
return <div className={classes}>{props.children}</div> // Genera un div que envuelve lo que sea que esté dentro del componente Card con el fin de darle un borde.
}

export default Card;