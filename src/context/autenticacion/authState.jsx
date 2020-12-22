import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from '../../types/index';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

const AuthState = (props) => {
	//Guardamos el token en la memoria del navegador
	const initialState = {
		token: localStorage.getItem('token'),
		autenticado: null,
		usuario: null,
		mensaje: null,
		cargando: true,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const registrarUsuario = async (datos) => {
		try {
			//Autenticamos al usuario
			const response = await clienteAxios.post('/api/usuarios', datos);
			//console.log(response.data);

			dispatch({
				type: REGISTRO_EXITOSO,
				payload: response.data,
			});

			//obtenemos todos los datos del usuario que se acaba de autenticar
			usuarioAutenticado();
		} catch (error) {
			//console.log(error.response.data.msg);

			const alerta = {
				msg: error.response.data.msg,
				categoria: 'alerta-error',
			};
			//Le enviamos el objeto alerta al reducer para pasarlo al componente nueva-ruta
			dispatch({
				type: REGISTRO_ERROR,
				payload: alerta,
			});
		}
	};

	//Retorna los datos del usuario que se autentico
	const usuarioAutenticado = async () => {
		//Obtenemos el token que esta guardado en al localStorage del navegador
		const token = localStorage.getItem('token');

		if (token) {
			// Funcion para colocar el token en los headers de la peticion para cuando lo requiere el backend
			tokenAuth(token);
		}

		try {
			const response = await clienteAxios.get('/api/auth');
			//console.log(response);

			//Pasamos la respuesta del la peticion con los datos del usuario al state.usaurio que esta en el authReducer
			dispatch({
				type: OBTENER_USUARIO,
				payload: response.data.usuario,
			});
		} catch (error) {
			//console.log(error.response);
			dispatch({
				type: LOGIN_ERROR,
			});
		}
	};

	//FN para iniciar sesion
	const iniciarSesion = async (datos) => {
		try {
			const response = await clienteAxios.post('/api/auth', datos);
			//console.log(response);

			dispatch({
				type: LOGIN_EXITOSO,
				payload: response.data,
			});

			//LAS INSTRUCCIONES QUE SE HACEN DESPUES QUE EL USUARIO PUESO CORRECTOS SU EMAIL Y PASSWORD
			usuarioAutenticado();
		} catch (error) {
			//Si ahy un error en la consulta entonses enviamos la sig alerta
			console.log(error);
			console.log(error.response.data.error.msg);
			const alerta = {
				msg: error.response.data.error.msg,
				categoria: 'alerta-error',
			};
			//Le enviamos el objeto alerta al reducer para pasarlo al componente nueva-ruta
			dispatch({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
	};

	//Fn para cerrar la sesion
	const cerrarSesion = () => {
		dispatch({
			type: CERRAR_SESION,
		});
	};
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				cargando: state.cargando,
				registrarUsuario,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
