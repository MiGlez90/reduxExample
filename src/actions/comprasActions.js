/*
    Las actions son objetos que describen las acciones
    que se haran, deben de tener un type y un data, donde
    data puede ser cualquier tipo de dato.
    Se declaran las funciones, el tipo debe conincidir con
    un tipo en el reducer para que haga su función correspondiente
 */
export function addCompra(compra){
	return {type:"ADD_COMPRA", compra}
}

export function checkComprado(compra){
	return {type:"CHECK_COMPRADO", compra}
}

export function deleteCompra(compra){
	return {type:"DELETE_COMPRA", compra}
}