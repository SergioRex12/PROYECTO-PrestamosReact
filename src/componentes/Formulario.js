import React, {Fragment, useState} from 'react';
import { calcularTotal } from "../helpers";

const Formulario = (props) => {
    const {cantidad, guardarCantidad, plazo, guardarPlazo, guardarTotal,guardarCargando} = props;
    //Definir state
    const [error, guardarError] = useState(false);

    //Cuando pulsas el boton
    const calcularPrestamo = (e) => {
        e.preventDefault();

        if ((cantidad === 0) || (plazo === "")) return guardarError(true);
        
        //Quita el error
        guardarError(false);

        //Ponemos la carga
        guardarCargando(true);


        
        setTimeout(() => {
            //Realiza la cotización
            const totalPagar = calcularTotal(cantidad, plazo);

            //Guardamos el total
            guardarTotal(totalPagar);
            guardarCargando(false);
        }, 2500);
    }
    return (
        <Fragment>
            <form onSubmit={calcularPrestamo}>
                <div className="row">
                    <div>
                        <label>Cantidad Prestamo</label>
                        <input 
                            className="u-full-width" 
                            type="number" 
                            placeholder="Ejemplo: 3000" 
                            onChange={ e => guardarCantidad(parseInt(e.target.value)) }
                        />
                    </div>
                    <div>
                        <label>Plazo para Pagar</label>
                        <select 
                            className="u-full-width"
                            onChange={e => guardarPlazo(parseInt(e.target.value) || "")}
                        >
                            <option value="">Seleccionar</option>
                            <option value="3">3 meses</option>
                            <option value="6">6 meses</option>
                            <option value="12">12 meses</option>
                            <option value="24">24 meses</option>
                        </select>
                    </div>
                    <div>
                        <input 
                            type="submit" 
                            value="Calcular" 
                            className="button-primary u-full-width" 
                        />
                    </div>
                </div>
            </form>
            {error ? <p className='error'> Todos los campos son obligatorios... </p> : null}
        </Fragment>    
    );
}
 
export default Formulario;