import React, { Fragment, useState, useEffect } from "react";

// Componentes:
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  // State principal:
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  /* Cuando 'consultar' cambie de flase a true entonces 
  se va a realizar una consulta a la API.*/
  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const apiId = "f9d70767551188cbf97710cff6a4e582";
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiId}`;
        const respuestaApi = await fetch(api);
        const resultado = await respuestaApi.json();
        guardarResultado(resultado);
        guardarConsultar(false);

        /* Detecta si la consulta está bien hecha o si hubo un 
        error. */
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consultar]);

  /* Carga condicional de componentes: Si la condicion
  que se pasa se cumple renderiza un componente en este
  caso renderizará un mensaje de error, de lo contrario
  si la condicion no se cumple renderizará el componente
  llamado 'Clima' */
  let RenderizarComponente;
  if (error) {
    RenderizarComponente = (
      <Error
        mensaje="Verifica si el nombre de la ciudad está escrito correctamente o
        si la ciudad pertenece a el país que estas seleccionando, si ya retificaste
        los datos entonces no hay resultados para esta consulta"
      />
    );
  } else {
    RenderizarComponente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {RenderizarComponente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
