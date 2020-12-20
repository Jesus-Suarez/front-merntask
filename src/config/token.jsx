import clienteAxios from './axios';

//esta Fn coloca el token en los defaults del header en caso de que los necesite para una peticion al backend
const tokenAuth = (token) => {
	if (token) {
		//Si existe el token le agregamos el token con formato x-auth-token que le estamos pasando
		clienteAxios.defaults.headers.common['x-auth-token'] = token;
	} else {
		//Si no existe un token lo eliminamos del header de la peticion
		delete clienteAxios.defaults.headers.common['x-auth-token'];
	}
};

export default tokenAuth;
