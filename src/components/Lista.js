import React from 'react';
import FiltroLink from './FiltroLink';
// Se debe importar connect para poder utilizar el store
// Lo que hace es que transforma o conecta el store como
// props

import {connect} from 'react-redux';
// se importan las actions
import * as comprasActions from '../actions/comprasActions';
import * as filtroActions from '../actions/filtroActions';
// para convertir todas las dispatchers como una funcion
import {bindActionCreators} from 'redux';
import {AppBar,TextField, RaisedButton} from 'material-ui'

// Declaración de estilos

const interno = {
    margin:5,
    padding:'10px 10vw'
};

//end declaracion

class Lista extends React.Component{
    //Creacion de state local
    state = {
        items:[],
        nuevoItem:'',
        empty:true
    };
  

    //manejar el cambio de los inputs
    handleChange = (e) => {
        this.setState({empty:false});
        const nuevoItem = e.target.value;
        this.setState({nuevoItem});
    };
  

    // Agregar la compra
    addCompra = (e) => {
        // transformación del item a objeto
        const item = {
            text: this.state.nuevoItem,
            key: this.state.nuevoItem,
            comprado:false
        };
        e.preventDefault();
        // dispatch la accion, se va a la funcion
        // devuelve la accion (objeto ) y se lo
        // pasa al dispatch
        this.props.comprasActions.saveCompra(item);
        this.setState({nuevoItem:'',empty:false});
    };

    deleteCompra = (i) => {
        if(window.confirm("Estas seguro de borrarlo?")){
          //store.dispatch({type:"DELETE_COMPRA", compra:i});
          this.props.comprasActions.removeCompra(i);
        }
    };

    //sirve para filtrar los items del store
    filterItems = (losItems, filtro) => {
        switch(filtro){
            case "SHOW_ACTIVOS":
                return losItems.filter(i=>!i.comprado);
            case "SHOW_TACHADOS":
                return losItems.filter(i=>i.comprado===true);
            case "SHOW_TODOS":
                return losItems;
            default:
                console.log('Error');
        }
    };



    render(){
        const {nuevoItem} = this.state;
        const losItems = this.props.compras;
        const filtro = this.props.filtro;
        const items = this.filterItems(losItems, filtro);
        console.log(items, filtro);

        //sirve para mostrar el titulo de la lista y sus animaciones
        let tituloFiltro = '';
        let animacion = '';
        switch (filtro){
            case 'SHOW_TODOS':
                tituloFiltro = 'Lista de artículos';
                animacion = 'w3-animate-top';
                break;
            case 'SHOW_TACHADOS':
                tituloFiltro = 'Artículos comprados';
                animacion = 'w3-animate-bottom';
                break;
            case 'SHOW_ACTIVOS':
                tituloFiltro = 'Artículos por comprar';
                animacion = 'w3-animate-right';
                break;
            default:
                console.error('Error');

        }


        return(
            <div className="App">
                <div style={{width:'100vw'}} >
                    <AppBar
                        title="Lista de compras"
                        showMenuIconButton={false}
                    />
                    {/*iconClassNameRight="muidocs-icon-navigation-expand-more"*/}
                    {/*<div className="w3-container w3-blue" style={w3margin} >*/}
                        {/*<h1 className="w3-animate-top">Lista de compras</h1>*/}
                    {/*</div>*/}
                    <form onSubmit={this.addCompra}>
                        <div style={interno} className="w3-row-padding">
                            <div className="w3-twothird w3-container">
                                    <TextField
                                        required
                                        value={nuevoItem}
                                        onChange={this.handleChange}
                                        name="nuevoItem"
                                        hintText="ej Arroz"
                                        floatingLabelText="Nuevo artículo"
                                        fullWidth={true}
                                        errorText={this.state.nuevoItem == '' && !this.state.empty ? 'Debe introducir un artículo' : ''}
                                    />
                                </div>
                                <div className="w3-third w3-container">
                                    <RaisedButton type="submit" label="Guardar" primary={true} style={{margin:20}} />
                                </div>
                        </div>
                    </form>
                    <div className="w3-row-padding">
                        <h2 className="w3-container w3-third"  style={{color:'#00BCD4',padding:'10px 10vw'}}>Filtro: </h2>
                    </div>
                    <div className="w3-row-padding" style={interno}>
                        <FiltroLink
                            filtro="SHOW_TODOS"
                            current={filtro}
                            onClick={()=>this.props.filtroActions.showTodos("SHOW_TODOS")}
                        >
                            Todos
                        </FiltroLink>
                        {" "}
                        <FiltroLink
                            current={filtro}
                            filtro="SHOW_ACTIVOS"
                            onClick={()=>this.props.filtroActions.showActivos("SHOW_ACTIVOS")}
                        >
                            Activos
                        </FiltroLink>
                        {" "}
                        <FiltroLink
                            current={filtro}
                            filtro="SHOW_TACHADOS"
                            onClick={()=>this.props.filtroActions.showTachados("SHOW_TACHADOS")}
                        >
                            Tachados
                        </FiltroLink>
                    </div>

                    <div style={interno}>
                        <h2 className={animacion} style={{color:'#00BCD4'}}>{tituloFiltro}</h2>


                        <ul className={"w3-ul w3-card-4 " + animacion}>
                            {
                               items.length !== 0 ?
                                items.map(i=>
                                    <li
                                        key={i.key}
                                        className="w3-display-container w3-padding-16">
                                        <span
                                            onClick={()=>this.props.comprasActions.toggleCompra(i)}
                                            style={{cursor:'pointer'}}
                                            className={i.comprado?"tachado":null}>
                                            {i.text}
                                        </span>
                                        <span
                                            onClick={()=>this.deleteCompra(i)}
                                            className="w3-button w3-display-right">
                                            &times;
                                        </span>
                                    </li>

                                ):
                                <li className="w3-display-container w3-padding-16">
                                    No hay artículos
                                </li>

                            }
                            </ul>

                    </div>
                </div>




            </div>
        );
    }
 
}

/*
    Se crean estas funciones para lo siguiente:
    mapStateToProps, convierte el store a props
    debe retornar un objeto clave valor
    clave es en el nombre de los props
    valor es el campo del store
 */
function mapStateToProps(state, ownProps){
  return {
    compras:state.compras,
    filtro:state.filtro
  }
}

/*
   mapDispatchToProps hace posible usar dispatchers como funciones
   solo se debe  retornar las acciones como objetos y automaticamente
   se lanza el dispatch, debe retornar un objeto
   clave es el nombre del prop, valor se debe mandar llamar bind
   ActionCreators primer parametro el action (una funcion que devuelve
   el objeto de acción ) y  dispatch
 */

function mapDispatchToProps(dispatch){
  return {
    comprasActions: bindActionCreators(comprasActions, dispatch),
    filtroActions: bindActionCreators(filtroActions, dispatch)

  }
}

//Se deben conectar las funciones a la lista
export default connect(mapStateToProps, mapDispatchToProps)(Lista);