import React from 'react';
import FiltroLink from './FiltroLink';
import {connect} from 'react-redux';
import * as comprasActions from '../actions/comprasActions';
import * as filtroActions from '../actions/filtroActions';
import {bindActionCreators} from 'redux';

const w3margin = {
  marginBottom: 20
};

const interno = {
    margin:20,
    padding:'10px 10vw'
};

class Lista extends React.Component{
    state = {
        items:[],
        nuevoItem:''
    }
  

  
    handleChange = (e) => {
        const nuevoItem = e.target.value;
        this.setState({nuevoItem});
    };
  


    addCompra = (e) => {
        const item = {
            text: this.state.nuevoItem,
            key: this.state.nuevoItem,
            comprado:false
        };
        e.preventDefault();
        this.props.comprasActions.addCompra(item);
        this.setState({nuevoItem:''});
    };

    deleteCompra = (i) => {
        if(window.confirm("Estas seguro de borrarlo?")){
          //store.dispatch({type:"DELETE_COMPRA", compra:i});
          this.props.comprasActions.deleteCompra(i);
        }
    };

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

        let tituloFiltro = '';
        switch (filtro){
            case 'SHOW_TODOS':
                tituloFiltro = 'Lista de artículos';
                break;
            case 'SHOW_TACHADOS':
                tituloFiltro = 'Artículos comprados';
                break;
            case 'SHOW_ACTIVOS':
                tituloFiltro = 'Artículos por comprar';
                break;

        }

        return(
            <div className="App">
                <div style={{width:'100vw'}} >
                    <div className="w3-container w3-blue" style={w3margin} >
                        <h1>Lista de compras</h1>
                    </div>
                    <form className="w3-container" style={interno} onSubmit={this.addCompra}>
                        <label htmlFor="nuevoItem">Nuevo artículo: </label>
                        <input
                            placeholder="ej. Arroz"
                            name="nuevoItem"
                            className="w3-input"
                            value={nuevoItem}
                            onChange={this.handleChange}
                            type="text" />

                        <br/>
                        <button className="w3-btn w3-blue" > Enviar </button>
                    </form>
                    <div style={interno}>
                        <h3>Filtro: </h3>
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
                        <h2 style={{color:'#2196F3'}}>{tituloFiltro}</h2>


                        <ul>
                            {
                                items.map(i=>
                                        <div key={i.key}>
                            <span
                                onClick={()=>this.props.comprasActions.checkComprado(i)}
                                style={{cursor:'pointer'}}
                                className={i.comprado?"tachado":null}
                            >{i.text}
                            </span>
                                            --
                                            <a href="!#"
                                               onClick={()=>this.deleteCompra(i)}
                                            >borrar
                                            </a>
                                        </div>
                                )
                            }
                        </ul>
                    </div>
                </div>




            </div>
        );
    }
 
}


function mapStateToProps(state, ownProps){
  return {
    compras:state.compras,
    filtro:state.filtro
  }
}

function mapDispatchToProps(dispatch){
  return {
    comprasActions: bindActionCreators(comprasActions, dispatch),
    filtroActions: bindActionCreators(filtroActions, dispatch)

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lista);