import {combineReducers} from 'redux';
import comprasReducer from '../reducers/comprasReducer';
import filtroReducer from '../reducers/filtroReducer';

/*
    Como ya se había mencionado con anterioridad, para crear  el
    store (state global) se le debe de pasar como argumento  una
    función reducer. El reducer es el  que  va  a hacer nuestros
    cambios en el state. Son los campos que tendrá nuestro state.

    Cuando tenemos más de un campo, debemos hacer un reducer por
    cada campo. Como el store solo puede recibir un reducer,  es
    necesario combinar los diferentes  reducers.  Para  ello  se
    debe utilizar la función combineReducer de redux.

    Al  ejecutar  combineReducers,  se  le  debe  de  pasar como
    parámetro un  objeto  con clave  valor  en donde clave es el
    nombre de la rama en el store y valor es la funcion  reducer
    correspondiente. Devuelve una función reducer.

    Por convención se debe de devolver a una nueva constante.

 */
const rootReducer = combineReducers({
	compras:comprasReducer,
	filtro:filtroReducer
});

export default rootReducer;