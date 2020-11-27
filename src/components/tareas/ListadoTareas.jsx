import React, { Fragment, useContext } from 'react';

import Tarea from './Tarea';

import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoTareas = () => {
	//extraemos el state que contiene el proyecto actual selecciondado
	const proyectosContext = useContext(proyectoContext);
	const { proyecto, eliminarProject } = proyectosContext;

	//Si no hay proyecto seleccionado
	if (!proyecto) return <h2>Selecciona un proyecto</h2>;

	//Array destructurin para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	const tareasProyecto = [
		{ nombre: 'Elegir plataforma', estado: true },
		{ nombre: 'Elegir colores', estado: false },
		{ nombre: 'Elegir plataforma de pago', estado: true },
		{ nombre: 'Elegir plataforma de hosting', estado: false },
	];

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className="listado-tareas">
				{tareasProyecto.length === 0 ? (
					<li className="tarea">
						<p>No hay tareas</p>
					</li>
				) : (
					tareasProyecto.map((tarea) => <Tarea tarea={tarea} />)
				)}
			</ul>

			<button
				type="button"
				className="btn btn-eliminar"
				onClick={() => eliminarProject(proyectoActual.id)}
			>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	);
};

export default ListadoTareas;
