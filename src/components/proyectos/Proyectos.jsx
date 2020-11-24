import React from 'react';

import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tareas/FormTarea';
import ListadoTareas from '../tareas/ListadoTareas'

const Proyectos = () => {
	return (
		<div className="contenedor-app">
			<Sidebar />

			{/* Administracion de los proyectos */}
			<div className="seccion-principal">
				<Barra />
				<main>
					<FormTarea />

					<div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
				</main>
			</div>
		</div>
	);
};

export default Proyectos;
