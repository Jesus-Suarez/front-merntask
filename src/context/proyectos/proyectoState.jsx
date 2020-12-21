import React, { useReducer } from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
} from '../../types/index';

import clienteAxios from '../../config/axios';

const ProyectoState = (props) => {
	const initialState = {
		proyectos: [],
		formulario: false,
		errorformulario: false,
		proyecto: null,
	};

	//Dispatch para ejecutar las funciones
	const [state, dispatch] = useReducer(proyectoReducer, initialState);

	//Serie de funciones para el CRUD
	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};

	//Obtener los proyectos
	//El payload es el parametro que recibe la funcion
	const obtenerProyectos = async () => {
		try {
			const response = await clienteAxios.get('/api/proyectos');
			//console.log(response);

			dispatch({
				type: OBTENER_PROYECTOS,
				payload: response.data.proyectos,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const agregarProyecto = async (proyecto) => {
		try {
			const response = await clienteAxios.post('api/proyectos', proyecto);
			console.log(response);
			//Insertamos el proyecto state
			dispatch({
				type: AGREGAR_PROYECTO,
				payload: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//Valida el formulario por errorres
	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO,
		});
	};

	//Selecciona el proyecto al que se le de click
	const proyectoActual = (proyectoId) => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoId,
		});
	};

	//Fn para eliminar un proyecto seleccionado
	const eliminarProject = (proyectoId) => {
		dispatch({
			type: ELIMINAR_PROYECTO,
			payload: proyectoId,
		});
	};

	return (
		<proyectoContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProject,
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	);
};

export default ProyectoState;
