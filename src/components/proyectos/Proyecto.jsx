import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Proyecto = ({ proyecto }) => {
	//Obtener state de proyectos
	const proyectosContext = useContext(proyectoContext);
	const { proyectoActual } = proyectosContext;

	const tareasContext = useContext(tareaContext);
	const { obtenerTareas } = tareasContext;

	//Funcion para agregar el proyecto actual
	const seleccionarProyecto = (id) => {
		//Fijamos el proyecto que seleccionamos
		proyectoActual(id);
		//Filtrar las tareas de ese proyecto
		obtenerTareas(id);
	};

	return (
		<li>
			<button
				type="buttom"
				className="btn btn-blank"
				onClick={() => {
					seleccionarProyecto(proyecto._id);
				}}
			>
				{proyecto.nombre}
			</button>
		</li>
	);
};

export default Proyecto;
