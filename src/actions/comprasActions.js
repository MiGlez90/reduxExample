import firebase from '../firebase';
/*
    Las actions son objetos que describen las acciones
    que se haran, deben de tener un type y un data, donde
    data puede ser cualquier tipo de dato.
    Se declaran las funciones, el tipo debe conincidir con
    un tipo en el reducer para que haga su función correspondiente
 */

/*
    En el modelo de los thunks (funciones asincronas), se debe de
    tener acciones y llamadas al servidor asincronas
 */


/////////// BEGIN ACCIONES/////////////////////////////
export function loadCompras(compras) {
    return { type:"LOAD_COMPRAS", compras }
}

export function addCompra(compra){
	return {type:"ADD_COMPRA", compra}
}

export function checkComprado(compra){
    return {type:"CHECK_COMPRADO", compra}
}

export function deleteCompra(compra){
	return {type:"DELETE_COMPRA", compra}
}

//////////////// END ACCIONES ////////////////


//////////////// BEGIN THUNKS ////////////////////
//Aqui se hacen las llamadas asíncronas
//Se hace una llamada y en su promesa then
// Se debe de llamar la accion de redux
export function loadListaCompras() {
    return function(dispatch,getState) {
        firebase.database().ref("compras")
            .once("value")
            .then(r=>{
                console.log('R' + r.val());
                let lista = [];
                const obj = r.val();
                for(let k in obj){
                    let item = obj[k];
                    item['key'] = k;
                    lista.push(item);
                }
                //Ya que se estableció la conexion se ejecuta la acción
                dispatch(loadCompras(lista));
            })
            .catch(e=>console.log(e));
    }
}

export function saveCompra(compra){
    return function(dispatch, getState){
        firebase.database().ref("compras")
            .push(compra)
            .then(r=>{
                compra['key'] = r.key;
                dispatch(addCompra(compra));
            })
            .catch(e=>console.log(e));
    }
}

export function removeCompra(compra){
    return function(dispatch, getState){
        let updates = {};
        updates['/compras/' + compra.key] = null;
        firebase.database().ref().update(updates)
            .then(r=>dispatch(deleteCompra(compra)))
            .catch(e=>console.log(e));

    }
}

export function toggleCompra(compra){
    return function(dispatch, getState){
        let updates = {};
        let co = {...compra, comprado:!compra.comprado};
        updates['/compras/' + compra.key] = co;
        firebase.database().ref().update(updates)
            .then(r=>dispatch(checkComprado(compra)))
            .catch(e=>console.log(e));
    }
}

////////////////  END THUNKS /////////////////////