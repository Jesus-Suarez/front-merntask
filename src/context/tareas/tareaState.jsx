import React, { useReducer } from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import { TAREAS_PROYECTO } from '../../types/index';

const TareaState = (props) => {
	const initialState = {
		tareas: [
			{ nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
			{ nombre: 'Elegir colores', estado: false, proyectoId: 2 },
			{ nombre: 'Elegir plataforma de pago', estado: true, proyectoId: 3 },
			{ nombre: 'Elegir plataforma de hosting', estado: false, proyectoId: 4 },
			{ nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
			{ nombre: 'Elegir colores', estado: false, proyectoId: 2 },
			{ nombre: 'Elegir plataforma de pago', estado: true, proyectoId: 3 },
			{ nombre: 'Elegir plataforma', estado: true, proyectoId: 4 },
			{ nombre: 'Elegir colores', estado: false, proyectoId: 1 },
			{ nombre: 'Elegir plataforma de pago', estado: true, proyectoId: 2 },
			{ nombre: 'Elegir plataforma', estado: true, proyectoId: 3 },
			{ nombre: 'Elegir colores', estado: false, proyectoId: 4 },
			{ nombre: 'Elegir plataforma de pago', estado: true, proyectoId: 3 },
		],
		tareasproyecto: null,
	};

	//crear el dispath y state
	const [state, dispatch] = useReducer(tareaReducer, initialState);

	//Creamos las funciones que va a modificar nuestro initialState con ayuda del reducer
	//Obtener las todas las tareas de un proyecto
	const obtenerTareas = (proyectoId) => {
		dispatch({
			type: TAREAS_PROYECTO,
			payload: proyectoId,
		});
	};

	return (
		<tareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				obtenerTareas,
			}}
		>
			{props.children}
		</tareaContext.Provider>
	);
};

export default TareaState;
