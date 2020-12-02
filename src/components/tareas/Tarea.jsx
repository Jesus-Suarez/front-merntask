import React, { useContext } from 'react';

import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {
	//obtenemos la Fn del context de Tarea
	const tareasContext = useContext(tareaContext);
	const { eliminarTarea, obtenerTareas } = tareasContext;

	//Funcion que se ejecuta cuando el usuario preciona el boton de eliminar tarea
	const tareaEliminar = (tareaId) => {
		eliminarTarea(tareaId);
		//Obtener y filtrar todas las tareas del proyecto actual de nuevo para refrescarlas en la pantalla
		obtenerTareas(tarea.proyectoId);
	};

	return (
		<li className="tarea sombra">
			<p>{tarea.nombre}</p>

			<div className="estado">
				{tarea.estado ? (
					<button type="button" className="completo">
						Completo
					</button>
				) : (
					<button type="button" className="incompleto">
						Incompleto
					</button>
				)}
			</div>

			<div className="acciones">
				<button type="buttom" className="btn btn-primario">
					Editar
				</button>
				<button
					type="buttom"
					className="btn btn-secundario"
					onClick={() => tareaEliminar(tarea.id)}
				>
					Eliminar
				</button>
			</div>
		</li>
	);
};

export default Tarea;
