import React, { useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Proyecto = ({ proyecto }) => {
	//Obtener state de proyectos
	const proyectosContext = useContext(proyectoContext);
	const { proyectoActual } = proyectosContext;
	return (
		<li>
			<button
				type="buttom"
				className="btn btn-blank"
				onClick={() => {
					proyectoActual(proyecto.id);
				}}
			>
				{proyecto.nombre}
			</button>
		</li>
	);
};

export default Proyecto;
