//Con rsc o rscp haces todo el comlponente
import React, { useState, Fragment, useContext } from 'react';

//Importamos el context
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = (props) => {
	//Obtener el state del formulario desde el context
	const proyectosContext = useContext(proyectoContext);
	//extraemos las funciones del context
	const {
		formulario,
		errorformulario,
		mostrarFormulario,
		agregarProyecto,
		mostrarError,
	} = proyectosContext;

	//State del nuevo proyecto
	const [proyecto, guardarProyecto] = useState({
		nombre: '',
	});

	const { nombre } = proyecto;

	//Guarda el formulario cada que hay un cambio en el
	const onChangeProyecto = (e) => {
		guardarProyecto({
			...proyecto,
			[e.target.name]: e.target.value,
		});
	};

	//lee el contenido del formulario para ejecutar la siguiente tarea
	const onSubmitProyecto = (e) => {
		e.preventDefault();
		//console.log(nombre);

		//Validar el proyecto
		if (nombre === '') {
			mostrarError();
			return;
		}

		//Agregar al state
		agregarProyecto(proyecto);

		//Reiniciar el form
		guardarProyecto({ nombre: '' });
	};

	//Mostrar el formulario

	return (
		<Fragment>
			<button
				type="buttom"
				className="btn btn-buttom btn-primario"
				onClick={() => mostrarFormulario()}
			>
				Nuevo Proyecto
			</button>

			{formulario ? (
				<form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
					<input
						type="text"
						className="input-text"
						placeholder="Nombre del Proyecto"
						name="nombre"
						value={nombre}
						onChange={onChangeProyecto}
					/>

					<input
						type="submit"
						value="Agregar Proyecto"
						className="btn btn-primario btn-block"
					/>
				</form>
			) : null}

			{errorformulario ? (
				<p className="mensaje error">El nombre del proyecto es obligatorio</p>
			) : null}
		</Fragment>
	);
};

export default NuevoProyecto;
