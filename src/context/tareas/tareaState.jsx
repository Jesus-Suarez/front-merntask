import React, { useReducer } from 'react';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import clienteAxios from '../../config/axios';

import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from '../../types/index';

const TareaState = (props) => {
	const initialState = {
		tareasproyecto: [],
		errortarea: false,
		tareaseleccionada: null,
	};

	//crear el dispath y state
	const [state, dispatch] = useReducer(tareaReducer, initialState);

	//Creamos las funciones que va a modificar nuestro initialState con ayuda del reducer
	//Obtener las todas las tareas de un proyecto
	const obtenerTareas = async (proyecto) => {
		try {
			//A la peticion le pasamos el id con el nombre de proyecto en forma de query de la url
			const response = await clienteAxios.get('/api/tareas', {
				params: { proyecto },
			});
			//console.log(response);
			dispatch({
				type: TAREAS_PROYECTO,
				payload: response.data.tareas,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//Agregar tarea al proyecto seleccionado
	const agregarTarea = async (tarea) => {
		try {
			const response = await clienteAxios.post('/api/tareas', tarea);
			//console.log(response);

			dispatch({
				type: AGREGAR_TAREA,
				payload: response.data.tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//Valida y muestra un errror en caso de que sea necesario
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	const eliminarTarea = async (tareaId, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${tareaId}`, {
				params: { proyecto },
			});

			dispatch({
				type: ELIMINAR_TAREA,
				payload: tareaId,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//Edita o modifica una tarea de estado=true/false o de nombre
	const actualizarTarea = async (tarea) => {
		//console.log(tarea);
		try {
			//Le pasamos la tarea a la pericion para que la reescriba
			const response = await clienteAxios.put(
				`/api/tareas/${tarea._id}`,
				tarea
			);
			//console.log(response);
			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: response.data.tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//extrae la tarea para edicion
	const guardarTareaActual = (tarea) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	//Elimina la tarea seleccionada del form
	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};

	return (
		<tareaContext.Provider
			value={{
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaseleccionada: state.tareaseleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
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
