import classes from './Logo.module.css';
const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img className={classes.base} src={props.Logo} />
      <img className={classes.blur} src={props.Logo} />
      <img className={classes.brillo} src={props.Logo} />
    </div>
  );
};
export default Logo;
