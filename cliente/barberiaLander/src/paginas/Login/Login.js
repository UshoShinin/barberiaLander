import { useRef, useReducer, useContext } from "react";
import classes from "./Login.module.css";
import Input from "../../components/UI/Input/Input";
import Marco from "../../components/UI/Marco/Marco";
import Button from "../../components/UI/Button/Button";
import Border from "../../components/UI/Border/Border";
import NormalCard from "../../components/UI/Card/NormalCard";
import { initialState, reducer } from "./LoginReducer";
import inputs from "./inputs";
import useHttp from "../../hooks/useHttp";
import AuthContext from "../../store/AuthContext";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  const history = useHistory();

  const refCi = useRef();
  const refCon = useRef();
  const [loginState, dispatchLogin] = useReducer(reducer, initialState);
  const INPUTS = inputs(loginState, dispatchLogin);
  const authCtx = useContext(AuthContext);
  const login = useHttp();
  const getRespuesta = (res) => {
    console.log(res);
    if (res.mensaje.ciUsuario !== undefined) {
      authCtx.login(res.mensaje);
      history.replace('/');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!loginState.ciUsuario.isValid) refCi.current.focus();
    else if (!loginState.contra.isValid) refCon.current.focus();
    else {
      const data = {
        ciUsuario: parseInt(loginState.ciUsuario.value, 10),
        contra: loginState.contra.value,
      };
      login(
        {
          url: "/login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: data,
        },
        getRespuesta
      );
    }
  };
  return (
    <Marco use={true} className={classes.alinear}>
      <form onSubmit={submitHandler}>
        <NormalCard className={classes.container}>
          <Border>
            <div>
              <label>Cédula: </label>
              <Input
                ref={refCi}
                isValid={loginState.ciUsuario.isValid}
                input={INPUTS[0]}
              />

              <label>Contraseña: </label>
              <Input
                ref={refCon}
                isValid={loginState.contra.isValid}
                input={INPUTS[1]}
              />
            </div>
            {loginState.problema !== -1 && (
              <p>{loginState.problemas[loginState.problema].pro}</p>
            )}
            {/* {errorLogin !== null && <p>{errorLogin}</p>} */}
            <Button type="submit">Iniciar Sesión</Button>
          </Border>
        </NormalCard>
      </form>
    </Marco>
  );
};
export default Login;
