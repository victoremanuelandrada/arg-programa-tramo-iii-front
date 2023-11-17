const Contenedor = (props ) => {
        const { nombre, apellido} = props

    return (
        
        <div>
            <p>Hola {nombre}  {apellido}</p>
            
        </div>
    )
}



export {Contenedor}
