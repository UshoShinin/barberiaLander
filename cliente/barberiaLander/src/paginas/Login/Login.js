import { useRef, useReducer } from "react";
import classes from "./Login.module.css";
import Input from "../../components/UI/Input/Input";
import Marco from "../../components/UI/Marco/Marco";
import Button from "../../components/UI/Button/Button";
import Border from "../../components/UI/Border/Border";
import NormalCard from "../../components/UI/Card/NormalCard";
import { initialState, reducer } from "./LoginReducer";
import inputs from "./inputs";
import useHttp from "../../hooks/useHttp";
const Login = (props) => {
  const refCi = useRef();
  const refCon = useRef();
  const [loginState, dispatchLogin] = useReducer(reducer, initialState);
  const INPUTS = inputs(loginState, dispatchLogin);

  const { isLoadingLogin, errorLogin, sendRequest: login } = useHttp();

    const getRespuesta = (res) =>{
        console.log(res);
    }

  const submitHandler = (e) => {
    e.preventDefault();
    if (!loginState.ciUsuario.isValid) refCi.current.focus();
    else if (!loginState.contra.isValid) refCon.current.focus();
    else {
      const data = {
        ciUsuario: loginState.ciUsuario.value,
        contra: loginState.contra.value,
      };
      login(
        {
          url: "/login",
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: data,
        },
        getRespuesta
      );
    }
  };
  return (
    <Marco className={classes.alinear}>
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
            <Button type="submit">Iniciar Sesión</Button>
          </Border>
        </NormalCard>
      </form>
    </Marco>
  );
};
export default Login;
