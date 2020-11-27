import React, { useReducer } from 'react';

import { uuid } from 'uuidv4';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTO,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
} from '../../types/index';

const ProyectoState = (props) => {
	const proyectos = [
		{ id: '1', nombre: 'Intranet' },
		{ id: '2', nombre: 'Tienda Virtual' },
		{ id: '3', nombre: 'Maquetacion del Sitio web' },
		{ id: '4', nombre: 'Diseño de sitio web' },
	];

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
	const obtenerProyectos = () => {
		dispatch({
			type: OBTENER_PROYECTOS,
			payload: proyectos,
		});
	};

	const agregarProyecto = (proyecto) => {
		//Generamos el id para nuestro pryecto con uuid
		proyecto.id = uuid();

		//Insertamos el proyecto state
		dispatch({
			type: AGREGAR_PROYECTO,
			payload: proyecto,
		});
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
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	);
};

export default ProyectoState;
