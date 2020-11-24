import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const Login = () => {
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
    const onSubmit = (e)=>{
        //para que no se ejecute hasta dar click boton
        e.preventDefault();

        //Validacion del formulario

        //pasarlo al action
    }

	return (
		<div className="form-usuario">
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
