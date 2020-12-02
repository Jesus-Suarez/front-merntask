import React, { Fragment, useContext } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

//importamos los Context
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import Tarea from './Tarea';

const ListadoTareas = () => {
	//extraemos el state que contiene el proyecto actual selecciondado
	const proyectosContext = useContext(proyectoContext);
	const { proyecto, eliminarProject } = proyectosContext;

	//Obtener las tareas del proyecto seleccionado actualmente
	const tareasContext = useContext(tareaContext);
	const { tareasproyecto } = tareasContext;

	//Si no hay proyecto seleccionado
	if (!proyecto) return <h2>Selecciona un proyecto</h2>;

	//Array destructurin para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className="listado-tareas">
				{tareasproyecto.length === 0 ? (
					<li className="tarea">
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasproyecto.map((tarea) => (
							<CSSTransition key={tarea.id} timeout={150} classNames="tarea">
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
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
