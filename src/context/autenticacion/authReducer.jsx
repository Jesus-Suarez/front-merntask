import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types/index';

export default (state, action) => {
	switch (action.type) {
		case REGISTRO_EXITOSO:
		case LOGIN_EXITOSO:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				autenticado: true,
				mensaje: null,
			};

		case REGISTRO_ERROR:
		case LOGIN_ERROR:
			//En caso de que el backend envie un error se quita el token del localStorage
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				mensaje: action.payload,
			};

		case OBTENER_USUARIO:
			return {
				...state,
				usuario: action.payload,
			};
		default:
			return state;
	}
};
