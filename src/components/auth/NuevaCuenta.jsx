import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Importamos el context de alerta
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {
	//Extraer valores del context
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const authContex = useContext(AuthContext);
	const { mensaje, autenticado, registrarUsuario } = authContex;

	//En caso de que el usuario se haya autenticado o registrado o sea un resgistro duplicado
	useEffect(() => {
		//Si el usuario ya esta autenticado lo enviamos a la ruta proyectos
		if (autenticado) {
			props.history.push('proyectos');
		}

		//Si existe un mensaje del backend lo mostramos en la pantalla
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}
	}, [mensaje, autenticado, props.history]);

	const [usuario, guardarUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: '',
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
		if (
			nombre.trim() === '' ||
			nombre.trim() === '' ||
			password.trim() === '' ||
			confirmar.trim() === ''
		) {
			//Recive dos parametros uno el mensaje que se va a mostrar y otro el estilo css que se aplicara al mensaje
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
			return;
			//	El return es para que no se siga ejecutando el codigo de abajo
		}

		//Validar minimo 6 caracteres del password
		if (password.length < 6) {
			mostrarAlerta('El password minimo de 6 caracteres', 'alerta-error');
			return;
		}

		//Validar que los passwords sean iguales
		if (password.trim() !== confirmar.trim()) {
			mostrarAlerta('Las contraseñas deben ser iguales', 'alerta-error');
			return;
		}

		//pasarlo al action
		registrarUsuario({
			nombre,
			email,
			password,
		});
	};

	return (
		<div className="form-usuario">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className="contenedor-form sombra-dark">
				<h1>Obtener una Cuenta </h1>

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
					Volver a Iniciar Sesión
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
