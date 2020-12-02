//Con rsc o rscp haces todo el comlponente
import React, { useContext, useEffect } from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoProyectos = () => {
	//Extraemos los proyectos del state inicial
	const proyectosContext = useContext(proyectoContext);
	const { proyectos, obtenerProyectos } = proyectosContext;

	//Antes del useEffect no debe ir ningun return
	//Obtener proyectos cuando carga el componente
	useEffect(() => {
		obtenerProyectos();
	}, []);

	// Revisamos si hay proyectos en la BD si no no hacemos nada
	if (proyectos.length === 0) return <p>No hay proyectos</p>;

	return (
		<ul className="listado-proyectos">
			<TransitionGroup>
				{proyectos.map((proyecto) => (
					<CSSTransition key={proyecto.id} timeout={150} classNames="proyecto">
						<Proyecto proyecto={proyecto} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
};

export default ListadoProyectos;
