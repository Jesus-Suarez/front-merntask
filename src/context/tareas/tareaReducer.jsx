import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	ESTADO_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from '../../types/index';

export default (state, action) => {
	switch (action.type) {
		case TAREAS_PROYECTO:
			return {
				...state,
				tareasproyecto: state.tareas.filter(
					(tarea) => tarea.proyectoId === action.payload
				),
			};

		case AGREGAR_TAREA:
			return {
				...state,
				tareas: [action.payload, ...state.tareas],
				errortarea: false,
			};
		case VALIDAR_TAREA:
			return {
				...state,
				errortarea: true,
			};
		case ELIMINAR_TAREA:
			return {
				...state,
				tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
			};

		//Se utiliza el mismo CASE por que hace la misma tarea que es actualizar
		case ACTUALIZAR_TAREA:
		case ESTADO_TAREA:
			return {
				...state,
				tareas: state.tareasproyecto.map((tarea) =>
					tarea.id === action.payload.id ? action.payload : tarea
				),
			};
		case TAREA_ACTUAL:
			return {
				...state,
				tareaseleccionada: action.payload,
			};
		case LIMPIAR_TAREA:
			return {
				...state,
				tareaseleccionada: null,
				errortarea: false,
			};

		default:
			return state;
	}
};
