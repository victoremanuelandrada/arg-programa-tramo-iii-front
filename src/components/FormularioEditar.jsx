import { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios  from 'axios';
import { useNavigate } from "react-router-dom";


import { traerDatosDeUsuarioPorId} from './../utils/llamados.js';

function FormularioEditar(props) {
    const { id } = props;
    const url = 'http://localhost:3000/usuario';


    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
    const [errores, setErrores]= useState({});

    const navigate = useNavigate();

    const cambiarNombres = (e) => {
        setNombres(e.target.value);
    }

    const cambiarApellidos = (e) => {
        setApellidos(e.target.value);
    }

    const verificarDatos = async ()=>{
        let misErrores = {}
        
        if (nombres.length===0) {

           //setErrores({nombres: 'Debe Introducir al menos un Nombre'})
           misErrores.nombres = 'Debe Introducir al menos un Nombre';
        }

        if (apellidos.length===0) {
           //setErrores({apellidos: 'Debe Introducir al menos un Apellido'})
           misErrores.apellidos = 'Debe Introducir al menos un Apellido';
        }

        setErrores(misErrores);

        if(Object.entries(misErrores).length === 0){
            setDeshabilitarBoton(true);

            console.log(nombres);
            console.log(apellidos);
            await mandarDatos();
        }
    
    }
    

    const mandarDatos = async ()=>{
        const datos ={
            id:id,
            nombres: nombres,
            apellidos:apellidos,
        }
        try {
            const respuesta = await axios.put(url, datos);

            if(respuesta.status === 200){
                return navigate('/');
            } else{
                setErrores({error: 'Ocurrio un error Inesperado'});
            }
            
        } catch (error) {
            setErrores({error: 'Ocurrio un error Inesperado'});
        }
        setDeshabilitarBoton(false)

    }

   const traerDatos = async ()=>{ 
    /*const respuesta  = await traerDatosDeUsuarioPorId(id);
    if (respuesta) {
        setNombres(respuesta.nombres);
        setApellidos(respuesta.apellidos);
    } else{
        setErrores({error: 'Ocurrio un error Inesperado. No se pudo obtener el Ususario'});
            setDeshabilitarBoton(true);
    }*/

    //-------------------------------Otra forma de hacerlo----
    const endPoint = url + '/' +id;
    try {
        const respuesta = await axios.get(endPoint);
        if (respuesta.status===200) {
            const usuario = respuesta.data
            setNombres(usuario.nombres);
            setApellidos(usuario.apellidos);
        } else {
            setErrores({error: 'Ocurrio un error Inesperado. No se pudo obtener el Ususario'});
            setDeshabilitarBoton(true);
        }
    } catch (error) {
        setErrores({error: 'Ocurrio un error Inesperado al intentar cargar el usuario'});
        setDeshabilitarBoton(true);
    }
   }

   useEffect(()=>{
    traerDatos();
   }, [])
    return (

        <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                Nombres
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text"   onInput={cambiarNombres} defaultValue={nombres}/>
                    {
                        errores.nombres && (<span style={{color: 'red'}}>{errores.nombres}</span>) 
                    }
                
            
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                Apellidos
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text"  onInput={cambiarApellidos} defaultValue={apellidos}/>
                    {
                        errores.apellidos && (<span style={{color: 'red'}}>{ errores.apellidos}</span>) 
                    }
                </Col>
            </Form.Group>
            {
                errores.error && (
                    <Alert  variant='warning'>
                        {errores.error}
                    </Alert>
                )
            }
            <br />
            <Button variant="primary" onClick={verificarDatos} disabled={deshabilitarBoton}>
            Editar Datos
            </Button>
            
        </Form>
        
    );
}

export default FormularioEditar;