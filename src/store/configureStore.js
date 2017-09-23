//Se debe configurar un configure store global
// Se deben importar las sig librerias
// Crea el store y aplica middle ware
import  {createStore, applyMiddleware} from 'redux';
//habilita thunks
import thunk from 'redux-thunk';
//es necesario el reducer principal
import rootReducer from './rootReducer';

//debemos exportar una función llamada configureStore
export default function  configureStore() {
    return createStore(
      rootReducer,
      applyMiddleware(thunk)
    );
}


