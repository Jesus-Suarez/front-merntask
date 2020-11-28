import React from 'react';

const Tarea = ({ tarea }) => {
	return (
		<li className="tarea sombra">
			<p>{tarea.nombre}</p>

			<div className="estado">
				{tarea.estado ? (
					<button type="button" className="completo">
						Completo
					</button>
				) : (
					<button type="button" className="incompleto">
						Incompleto
					</button>
				)}
			</div>

			<div className="acciones">
				<button type="buttom" className="btn btn-primario">
					Editar
				</button>
				<button type="buttom" className="btn btn-secundario">
					Eliminar
				</button>
			</div>
		</li>
	);
};

export default Tarea;
