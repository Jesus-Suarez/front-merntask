import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {
	//Extaer lod valores del context
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, iniciarSesion } = authContext;

	//El useEffect siempre debe ir al principio de los state o Fn
	//En caso de que el password o usuario no exista
	useEffect(() => {
		if (autenticado) {
			props.history.push('/proyectos');
		}

		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}
	}, [mensaje, autenticado, props.history]);

	const [usuario, guardarUsuario] = useState({
		email: '',
		password: '',
	});

	//Destructuracion del usuario
	const { email, password } = usuario;

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
		if (email.trim() === '' || password.trim() === '') {
			//Recive dos parametros uno el mensaje que se va a mostrar y otro el estilo css que se aplicara al mensaje
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
			return;
			//	El return es para que no se siga ejecutando el codigo de abajo
		}

		if (password.trim().length < 6) {
			mostrarAlerta(
				'La constraseña debe ser minimo de seis caracteres',
				'alerta-error'
			);
			return;
		}
		//pasarlo al action y enviamos los 'datos' al authState en ela Fn iniciarSesion en forma de objeto
		iniciarSesion({ email, password });
	};

	return (
		<div className="form-usuario">
			{/* Si existe un objeto alerta entonses que se visualice el siguiente mensaje */}
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesion </h1>

				<form onSubmit={onSubmit}>
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
						<input
							type="submit"
							value="Iniciar Sesión"
							className="btn btn-primario btn-block"
						/>
					</div>
				</form>

				<Link to={'/nueva-cuenta'} className="enlace-cuenta">
					Obtener Cuenta
				</Link>
			</div>
		</div>
	);
};

export default Login;
