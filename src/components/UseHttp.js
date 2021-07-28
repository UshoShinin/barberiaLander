import { useEffect, useState } from "react";
function CosasDisponibles() {
  const [cosas, setCosas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const[httpError, setHttpError] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetch("https://api.example.com/dondeQuieroIr");

      if(!response.ok){
          throw new Error('Algo salió mal');
      }

      const responseData = await response.json();

      const cosasCargadas = [];
      for (const key in responseData) {
        cosasCargadas.push({
          id: key,
          nombre: cosasCargadas[key].nombre, //siempre como id se pone la key para despues acceder a ese objeto y acceder a los distintos atributos
        });
      }
      setCosas(cosasCargadas);
      setIsLoading(false);
     
    };

        fetchCosas().catch((error)=> {
            setIsLoading(false);
            setHttpError(error.message);
        });
    
  }, []);

  //se puede agregar css
if(isLoading){
    return <section>   
        <p>Loading...</p>
    </section>
}

//se puede agregar css
if(httpError){
    return (
        <section>
            <p>{httpError}</p>
        </section>
    )
}
  const listaCosas = cosas.map((cosa) =>(
      <Cosa
        key = {cosa.id}
        id = {cosa.id}
        nombre = {cosa.nombre}
        />
  ));

  return (
    <section className={classes.cosa}>
        <div>
            <ul>{listaCosas}</ul>
        </div>
    </section>
  );

};

export default useHttpEjemplo;