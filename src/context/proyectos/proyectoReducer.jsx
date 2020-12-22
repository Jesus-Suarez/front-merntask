import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	PROYECTO_ERROR,
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
			//console.log(action.payload);
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
					(proyecto) => proyecto._id === action.payload
				),
			};

		//Eliminar un proyecto con el id
		case ELIMINAR_PROYECTO:
			return {
				...state,
				proyectos: state.proyectos.filter(
					(proyecto) => proyecto._id !== action.payload
				),
				proyecto: null,
			};
		case PROYECTO_ERROR:
			return {
				...state,
				mensaje: action.payload,
			};
		default:
			return state;
	}
};
