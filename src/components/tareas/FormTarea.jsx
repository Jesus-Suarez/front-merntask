import React, { useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const FormTarea = () => {
	//Extraemos del estate la Fn o State que necesitamos
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	//Si no hay un proyecto seleccionado no retornes nada
	if (!proyecto) return null;

	return (
		<div className="formulario">
			<form>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						name="nombre"
						placeholder="Nombre Tarea..."
					/>
				</div>

				<div className="contenedor-input">
					<input
						type="submit"
						className="btn btn-primario btn-submit btn-block"
						value="Agregar Tarea"
					/>
				</div>
			</form>
		</div>
	);
};

export default FormTarea;
