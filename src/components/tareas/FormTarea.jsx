import React, { useContext, useState, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
	//Extraemos del estate la Fn o State que necesitamos
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	const tareasContext = useContext(tareaContext);
	const {
		errortarea,
		tareaseleccionada,
		agregarTarea,
		validarTarea,
		obtenerTareas,
		actualizarTarea,
		limpiarTarea,
	} = tareasContext;

	//Effect que detecta si hay una tarea seleccionada
	useEffect(() => {
		//Si no existe la tarea seleccionada, guardamos la tareaseleccionada
		if (tareaseleccionada !== null) {
			guardarTarea(tareaseleccionada);
		} else {
			//Si no guardamos la tarea como string vacio
			guardarTarea({
				nombre: '',
			});
		}
	}, [tareaseleccionada]);

	//Definimos el state para los campos de nuestro formulario
	const [tarea, guardarTarea] = useState({
		nombre: '',
	});

	//Si no hay un proyecto seleccionado no retornes nada
	if (!proyecto) return null;

	//Extraer el nombre de la tarea
	const { nombre } = tarea;

	//Funcion que esta pendiente de los cambios del form
	const handleChange = (e) => {
		guardarTarea({
			...tarea,
			[e.target.name]: e.target.value,
		});
	};

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	const onSubmit = (e) => {
		e.preventDefault();

		//Validar
		if (nombre.trim() === '') {
			validarTarea();
			return;
		}

		//Si es edicion o si es nueva tarea
		if (tareaseleccionada === null) {
			//Agregar la nueva tarea al state de tareas
			//pasamos el id del proyecto en el que estamos a la tarea
			tarea.proyectoId = proyectoActual.id;
			tarea.estado = false;
			agregarTarea(tarea);
		} else {
			//Actualizar tarea existente
			actualizarTarea(tarea);
			//Elimina la tarea seleccionada del state
			limpiarTarea();
		}

		//Obtener y filtrar todas las tareas del proyecto actual de nuevo para refrescarlas en la pantalla
		obtenerTareas(proyectoActual.id);

		//Reiniciar el form
		guardarTarea({
			nombre: '',
		});
	};

	return (
		<div className="formulario">
			<form onSubmit={onSubmit}>
				<div className="contenedor-input">
					<input
						type="text"
						className="input-text"
						name="nombre"
						placeholder="Nombre Tarea..."
						onChange={handleChange}
						value={nombre}
					/>
				</div>

				<div className="contenedor-input">
					<input
						type="submit"
						className="btn btn-primario btn-submit btn-block"
						value={tareaseleccionada ? 'Actualizar Tarea' : 'Agregar Tarea'}
					/>
				</div>
			</form>
			{errortarea ? (
				<p className="mensaje error">El nombre de la tarea es obligatorio</p>
			) : null}
		</div>
	);
};

export default FormTarea;
