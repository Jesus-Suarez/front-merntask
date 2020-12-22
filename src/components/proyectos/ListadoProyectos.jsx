//Con rsc o rscp haces todo el comlponente
import React, { useContext, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {
	//Extraemos los proyectos del state inicial
	const proyectosContext = useContext(proyectoContext);
	const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	//Antes del useEffect no debe ir ningun return
	//Obtener proyectos cuando carga el componente
	useEffect(() => {
		//Si hay un error mestra el mensaje
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		obtenerProyectos();
	}, [mensaje]);

	// Revisamos si hay proyectos en la BD si no no hacemos nada
	if (proyectos.length === 0) return <p>No hay proyectos</p>;

	return (
		<ul className="listado-proyectos">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<TransitionGroup>
				{proyectos.map((proyecto) => (
					<CSSTransition key={proyecto._id} timeout={150} classNames="proyecto">
						<Proyecto proyecto={proyecto} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
};

export default ListadoProyectos;
