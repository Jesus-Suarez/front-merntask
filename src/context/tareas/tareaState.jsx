import React, { useReducer } from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import { uuid } from 'uuidv4';

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

const TareaState = (props) => {
	const initialState = {
		tareas: [
			{ id: 1, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
			{ id: 2, nombre: 'Elegir colores', estado: false, proyectoId: 2 },
			{
				id: 3,
				nombre: 'Elegir plataforma de pago',
				estado: true,
				proyectoId: 3,
			},
			{
				id: 4,
				nombre: 'Elegir plataforma de hosting',
				estado: false,
				proyectoId: 4,
			},
			{ id: 5, nombre: 'Elegir plataforma', estado: true, proyectoId: 1 },
			{ id: 6, nombre: 'Elegir colores', estado: false, proyectoId: 2 },
			{
				id: 7,
				nombre: 'Elegir plataforma de pago',
				estado: true,
				proyectoId: 3,
			},
			{ id: 8, nombre: 'Elegir plataforma', estado: true, proyectoId: 4 },
			{ id: 9, nombre: 'Elegir colores', estado: false, proyectoId: 1 },
			{
				id: 10,
				nombre: 'Elegir plataforma de pago',
				estado: true,
				proyectoId: 2,
			},
			{ id: 11, nombre: 'Elegir plataforma', estado: true, proyectoId: 3 },
			{ id: 12, nombre: 'Elegir colores', estado: false, proyectoId: 4 },
			{
				id: 13,
				nombre: 'Elegir plataforma de pago',
				estado: true,
				proyectoId: 3,
			},
		],
		tareasproyecto: null,
		errortarea: false,
		tareaseleccionada: null,
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

	//Agregar tarea al proyecto seleccionado
	const agregarTarea = (tarea) => {
		tarea.id = uuid();
		dispatch({
			type: AGREGAR_TAREA,
			payload: tarea,
		});
	};

	//Valida y muestra un errror en caso de que sea necesario
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	const eliminarTarea = (tareaId) => {
		dispatch({
			type: ELIMINAR_TAREA,
			payload: tareaId,
		});
	};

	//Cambia el estado de cada tarea Completo/incompleto
	const cambiarEstadoTarea = (tarea) => {
		dispatch({
			type: ESTADO_TAREA,
			payload: tarea,
		});
	};

	//extrae la tarea para edicion
	const guardarTareaActual = (tarea) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	const actualizarTarea = (tarea) => {
		dispatch({
			type: ACTUALIZAR_TAREA,
			payload: tarea,
		});
	};

	//Elimina la tarea seleccionada
	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};

	return (
		<tareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaseleccionada: state.tareaseleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				cambiarEstadoTarea,
				guardarTareaActual,
				actualizarTarea,
				limpiarTarea,
			}}
		>
			{props.children}
		</tareaContext.Provider>
	);
};

export default TareaState;
