/*
  Se deben de crear funciones puras por cada reducer.
 */

/* Recibe dos parametros, un state y una action
   * los state en realidad son campos del state
   En este caso, este campo es una lista de compras, por lo  que
   el state debe ser un array. Se tiene la posibilidad de  poner
   un valor default, para ello se pone state = valor default, en
   este caso state = [] por ser array ( por si state está vacío)

   El action debe ser un objeto con un type y data

*/

export default function comprasReducer(state = [], action){
    // se debe poner un switch para ver que tipo de action le llega
    // De acuerdo al tipo hace su accion correspondiente
    switch(action.type){
        // En este caso, si el tipo o la accion es "ADD COMPRA"
        // Un dato importante es que el state nunca debe ser mutado
        case "ADD_COMPRA":
            //return state.push(action.compra);
            // En caso de que se añada compra, se debe retornar
            // una nueva lista, con los items anteriores mas el nuevo
            // Para no mutar el state, se debe retornar ... state, que
            // trae todos los elementos actuales del state
            return [...state, action.compra];
      
        case "CHECK_COMPRADO":
            /*
            para modificar cada item (cada item es un objeto)
            se debe guardar el nuevo item, con todos los datos anteriores
            ... action.compra, hay que recordar que el action trae data
            en este caso trae un objeto llamado compra
             */

            const item = {...action.compra, comprado:!action.compra.comprado};
            // map retorna un nuevo array de acuerdo a sus condiciones
            // si el key del item es igual al key de la data del action
            // se va a devolver el item que editamos arriba, de otra manera,
            // se devuelven los demas items
            // devuelve los datos de acuerdo a su callback o funcion dada
            return state.map(c=>{
                if(c.key === action.compra.key){
                    return item;
                }
                return c;
            });
      
        case "DELETE_COMPRA":
            // filter devuelve todos los componentes que cumplan con la
            // condición dada. recibe una función como parametro
            return [...state.filter(i=>i.key !== action.compra.key)];
        default:
            return state;
  }
  
}