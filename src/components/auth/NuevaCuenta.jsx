import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NuevaCuenta = () => {
	const [usuario, guardarUsuario] = useState({
		nombre:'',
		email: '',
		password: '',
		confirmar:''
	});

	//Destructuracion del usuario
	const { nombre, email, password, confirmar } = usuario;

	//Funcion que se ejecutara cada que haya un cambio en el form para guardar los value input
	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	//Cuando el usuario quiere iniciar sesion
	const onSubmit = (e) => {
		//para que no se ejecute hasta dar click boton
		e.preventDefault();

		//Validacion del formulario

		//pasarlo al action
	};

	return (
		<div className="form-usuario">
			<div className="contenedor-form sombra-dark">
				<h1>Ontener una Cuenta </h1>

				<form onSubmit={onSubmit}>
					<div className="campo-form">
						<label htmlFor="nombre">Nombre de Usuario</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Tu nombre"
							onChange={onChange}
							value={nombre}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Tu Email"
							onChange={onChange}
							value={email}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Tu Contraseña"
							onChange={onChange}
							value={password}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="confirmar">Confirma tu contraseña</label>
						<input
							type="password"
							id="confirmar"
							name="confirmar"
							placeholder="Repite tu Contraseña"
							onChange={onChange}
							value={confirmar}
						/>
					</div>

					<div className="campo-form">
						<input
							type="submit"
							value="Registrarme"
							className="btn btn-primario btn-block"
						/>
					</div>
				</form>

				<Link to={'/'} className="enlace-cuenta">
					Iniciar Sesión
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
