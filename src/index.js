/********************************************************************
 *                Miguel Rafael González Durón                      *
 *                     GNU License 2018                             *
 *                    Aprendiendo REDUX                             *
 *                                                                  *
 *                                                                  *
 *  Esta aplicación web utiliza las ventajas de una metodología     *
 *  de flujo de datos como lo es redux.                             *
 *  Redux lo  que  hace  es  que tienes un store (state) global     *
 *  y mediante las herramientas  de react redux todos los hijos
 *  de la aplicación pueden manipularlo
 *  Como todos los hijos pueden modificarlo, es importante tener
 *  en cuenta que el state debe ser inmutable
 *
 *  Redux tiene tres principios basicos:
 *
 *  1. State único:
 *
 *     El state de tu aplicación es único y debe ser guardado en
 *     un solo árbol en un solo  almacenamiento,  esto  hace que
 *     tu código sea más fácil de mantener.
 *
 *  2. State debe ser inmutable (solo lectura):
 *
 *      La única manera de modificar un state debe ser emitiendo
 *      una acción, un objeto que describe lo que  está pasando.
 *
 *  3. Cambios al state deben ser hechos por un reducer  (acción
 *      pura) :
 *
 *      Los reducer son funciones puras (no hacen  llamadas a la
 *      base de datos ni mutan a ninguno de sus parametros.
 *
 *      En  esta  web app se describen los pasos  para crear una
 *      app  con  Redux.  Se  comienza  en   index.js creando el
 *      núcleo de la aplicación: (store)
 *
 *      Redux trabaja con tres métodos primarios
 *      getState()   quien   devuelve la de estructura del state
 *                   completo
 *
 *      dispatch(action) hace actualizaciones al state
 *
 *      submit(function) ejecuta la función cada que hay cambios
 */

//Se importan las librerías de React
import React from 'react';
import ReactDOM from 'react-dom';
// Se importa la App principal
import App from './App';
import registerServiceWorker from './registerServiceWorker';
/* Primer paso: se debe instalar redux y react redux
 * se debe importar createStore y Provider
 * */
//import {createStore} from 'redux';
import {Provider} from 'react-redux';

//Se debe de importar un combine reducer (si hay más de 1 modelo
//import rootReducer from './store/rootReducer';
import './index.css';
import configureStore from "./store/configureStore";
import {loadListaCompras} from "./actions/comprasActions";

//Segundo paso es construir el store global (state),  éste  debe
// ir en index.js,  recibe  como  parametro  un reducer, en este
// caso, rootReducer es un combine reducer, por que tenemos  más
// de una variable en nuestro state

// esto se hace si no hay funciones asincronas no thunks
// const store = createStore(rootReducer);

//esto si hay funciones asincronas
const store = configureStore();

//Se llena la lista de compras por primera vez
//Para ello se ejecuta su thunk correspondiente

store.dispatch(loadListaCompras());

/*
    Tercer paso: debemos construir un componente de presentacion
    const comp = () = > (); y englobar nuestra app principal con
    Provider,  un  componente  que  viene en las herramientas de
    react redux y sirve  para  que  todos  nuestros  componentes
    tengan acceso al store
 */

const WithProvider = () => (
    //Como props se le debe de mandar el state (store)
    <Provider store={store}>
	    <App/>
    </Provider>
);

//Se renderiza nuestro Provider
ReactDOM.render(<WithProvider />, document.getElementById('root'));
registerServiceWorker();
