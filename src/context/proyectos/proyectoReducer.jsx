import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
} from '../../types/index';

export default (state, action) => {
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
		default:
			return state;
	}
};
