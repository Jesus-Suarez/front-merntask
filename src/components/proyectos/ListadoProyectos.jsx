//Con rsc o rscp haces todo el comlponente
import React from 'react';

import Proyecto from './Proyecto';

const proyectos = [
	{ nombre: 'Tienda Virtual' },
	{ nombre: 'Intranet' },
	{ nombre: 'Diseño de sitio web' },
];

const ListadoProyectos = () => {
	return (
		<ul className="listado-proyectos">
			{proyectos.map((proyecto) => (
				<Proyecto proyecto={proyecto} />
			))}
		</ul>
	);
};

export default ListadoProyectos;
