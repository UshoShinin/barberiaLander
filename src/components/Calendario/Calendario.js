import classes from "./Calendario.module.css";
import Dias from "./Dias";
import Mes from './Mes';
const Calendario = (props) => {
  const days = () => {
    const oldDate = new Date();
    const Day = new Date(
      oldDate.getFullYear(),
      oldDate.getMonth() ,
      oldDate.getDate() 
    );
    
    let lines = (
      <>
        <li className={classes.Monday}>Lun</li>
        <li className={classes.day}>Mar</li>
        <li className={classes.day}>Mié</li>
        <li className={classes.day}>Jue</li>
        <li className={classes.day}>Vie</li>
        <li className={classes.day}>Sáb</li>
        <li className={classes.day}>Dom</li>
        <Dias day={Day}/>
      </>
    );
    const content = (
      <>
        <Mes month={Day.getMonth()}/>
        <ol className={classes.calendario}>{lines}</ol>
      </>
    );
    return content;
  };
  const content = days();
  return (
    <div className={classes.container}>
      {content}
    </div>
  );
};
export default Calendario;
