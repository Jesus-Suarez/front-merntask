import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';
//Esto es un highter order component que es algo asi como un componente dentro de otro componente
//Tomamos como input un componente
const RutaPrivada = ({ component: Component, ...props }) => {
	//console.log(props);

	const authContext = useContext(AuthContext);
	const { autenticado } = authContext;

	return (
		/* Si el usaurio no esta autenticado lo enviamos al la ruta "/".  Si, si esta autenticado lo mandamos al componente que lo esta mandado a llamar */
		<Route
			{...props}
			render={(props) =>
				!autenticado ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
};

export default RutaPrivada;
