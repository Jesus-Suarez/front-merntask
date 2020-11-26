//Con rsc o rscp haces todo el comlponente
import React, { useContext, useEffect } from 'react';

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
	if (proyectos.lenght === 0) return null;

	return (
		<ul className="listado-proyectos">
			{proyectos.map((proyecto) => (
				<Proyecto key={proyecto.id} proyecto={proyecto} />
			))}
		</ul>
	);
};

export default ListadoProyectos;
