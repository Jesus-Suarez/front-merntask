import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
} from '../../types/index';

export default (state, action) => {
	//Aqui solo se modifica el initialState de el archivo proyectoState
	switch (action.type) {
		case FORMULARIO_PROYECTO:
			return {
				...state,
				formulario: true,
			};

		case OBTENER_PROYECTOS:
			return {
				...state,
				proyectos: action.payload,
			};

		case AGREGAR_PROYECTO:
			return {
				...state,
				proyectos: [...state.proyectos, action.payload],
				formulario: false,
				errorformulario: false,
			};

		//Validamos el formulario
		case VALIDAR_FORMULARIO:
			return {
				...state,
				errorformulario: true,
			};

		//pasamos el proyecto actual donde el id es igual al id de los proyectos
		case PROYECTO_ACTUAL:
			return {
				...state,
				proyecto: state.proyectos.filter(
					(proyecto) => proyecto.id === action.payload
				),
			};

		//Eliminar un proyecto con el id
		case ELIMINAR_PROYECTO:
			return {
				...state,
				proyectos: state.proyectos.filter(
					(proyecto) => proyecto.id !== action.payload
				),
				proyecto: null,
			};
		default:
			return state;
	}
};
