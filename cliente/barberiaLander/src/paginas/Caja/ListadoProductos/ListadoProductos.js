const ListadoProductos = (props) => {
  const content = props.productos.map((p) => {
    <li>{p.nombre}</li>;
  });
  return <ul>{content}</ul>;
};
export default ListadoProductos;
