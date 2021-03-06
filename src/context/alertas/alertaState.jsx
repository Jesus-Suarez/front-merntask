import React, { useReducer } from 'react';
import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types/index';

const AlertaState = (props) => {
	const initialState = {
		alerta: null,
	};

	const [state, dispatch] = useReducer(alertaReducer, initialState);

	//Funciones
	const mostrarAlerta = (msg, categoria) => {
		dispatch({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				categoria,
			},
		});

		//Quita la alerta de validacion de formulario despues de 5 segundos
		setTimeout(() => {
			dispatch({
				type: OCULTAR_ALERTA,
			});
		}, 4000);
	};

	return (
		<alertaContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta,
			}}
		>
			{props.children}
		</alertaContext.Provider>
	);
};

export default AlertaState;
