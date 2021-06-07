import React, { useState } from "react";
import PropTypes from "prop-types";

// Componentes:
import Error from "./Error";

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  // Defino State:
  const [error, guardarError] = useState(false);

  // Defino Funciones:
  const { ciudad, pais } = busqueda;

  /* Funcion que guarda los string que reciben 
  los inputs en la variable 'busqueda'. */
  const handleChange = (e) => {
    /* Actializa el State, siempre mandar una copia del
    State con '...busqueda'. */
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  /* Funcion que se ejecuta cuando el usuario 
  da 'submit' al Formulario. */
  const handleSubmit = (e) => {
    e.preventDefault();

    /* 1. Valido que los campos se llenen correctamente,
    si ocurre que el caso de que no estén diligenciados
    correctamente entonces se muestra un error en pantall. */
    if (ciudad.trim() === "" || pais.trim() === "") {
      guardarError(true);
      return;
    }

    /* Una vez se hallan completado los campos correctamente
    cambia 'error' a true y elimina el mensaje de error. */
    guardarError(false);

    /* 2. Paso los datos datos al componente principal. */
    guardarConsultar(true);

  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <Error mensaje="Debes llenar ambos campos"/>
      ) : null}
      
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad:</label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">Selecciona un país</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País:</label>
      </div>

      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired, 
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsultar: PropTypes.func.isRequired
}

export default Formulario;
