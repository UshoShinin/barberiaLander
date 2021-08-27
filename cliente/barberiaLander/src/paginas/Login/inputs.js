const inputs = (registerState, dispatchCaja) => {
  return [
    {
      id: 1,
      type: "number",
      value: registerState.ciUsuario.value,
      placeholder: "Cédula",
      onChange: (event) => {
        dispatchCaja({
          type: "INPUT_CI_U",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_CI_U" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_CI_U" });
      },
    },
    {
      id: 2,
      type: "password",
      value: registerState.contra.value,
      placeholder: "Contraseña",
      onChange: (event) => {
        dispatchCaja({
          type: "INPUT_CONT",
          value: event.target.value,
        });
      },
      onBlur: () => {
        dispatchCaja({ type: "BLUR_CONT" });
      },
      onFocus: () => {
        dispatchCaja({ type: "FOCUS_CONT" });
      },
    },
  ];
};

export default inputs;
