import React, { useContext } from 'react';

import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {
	//obtenemos la Fn del context de Tarea
	const tareasContext = useContext(tareaContext);
	const {
		eliminarTarea,
		obtenerTareas,
		cambiarEstadoTarea,
		guardarTareaActual,
	} = tareasContext;

	//Funcion que se ejecuta cuando el usuario preciona el boton de eliminar tarea
	const tareaEliminar = (tareaId) => {
		eliminarTarea(tareaId, tarea.proyecto);
		//Obtener y filtrar todas las tareas del proyecto actual de nuevo para refrescarlas en la pantalla
		obtenerTareas(tarea.proyectoId);
	};

	//Funcion que modifica el estado de las tareas
	const cambiarEstado = (tarea) => {
		if (tarea.estado) {
			tarea.estado = false;
		} else {
			tarea.estado = true;
		}

		cambiarEstadoTarea(tarea);
	};

	//Agregar una tarea actual cuando el usuario desea editarla
	const seleccionarTarea = (tarea) => {
		guardarTareaActual(tarea);
	};

	return (
		<li className="tarea sombra">
			<p>{tarea.nombre}</p>

			<div className="estado">
				{tarea.estado ? (
					<button
						type="button"
						className="completo"
						onClick={() => cambiarEstado(tarea)}
					>
						Completo
					</button>
				) : (
					<button
						type="button"
						className="incompleto"
						onClick={() => cambiarEstado(tarea)}
					>
						Incompleto
					</button>
				)}
			</div>

			<div className="acciones">
				<button
					type="button"
					className="btn btn-primario"
					onClick={() => seleccionarTarea(tarea)}
				>
					Editar
				</button>
				<button
					type="button"
					className="btn btn-secundario"
					onClick={() => tareaEliminar(tarea._id)}
				>
					Eliminar
				</button>
			</div>
		</li>
	);
};

export default Tarea;
