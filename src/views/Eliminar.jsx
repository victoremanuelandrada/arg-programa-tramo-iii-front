import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate, useParams } from "react-router-dom";
import axios  from 'axios';

const Eliminar = () => { 
    const [error,setError]=useState(false);
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);

    const navigate = useNavigate();
    const {  id } = useParams();

    const volver = () =>{
        navigate('/');
    }
    const eliminar = async () =>{
        setError(false);
        setDeshabilitarBoton(true);
        try {
            const url = 'http://localhost:3000/usuario';
            const respuesta = await axios.delete(url, {data: { id: id} });

            if(respuesta.status === 200){
                return navigate('/');
            } else{
                setError({error: 'Ocurrio un error Inesperado'});
            }
        } catch (error) {
            setError({error: 'Ocurrio un error Inesperado'});
        }
        setDeshabilitarBoton(false);
    }

    useEffect(()=>{
        console.log(id);
    },[]);
  return (
          <Card.Body> 
             <Alert variant="warning">
                    ¿Esta Seguro que desea eliminar el Usuario con el ID: {id}?
                </Alert>
            {
                error && <Alert variant="danger">
                    A Ocurrido un error Inesperado. 
                </Alert>
            }
            <ButtonGroup >
                            <Button variant="success" onClick={volver} >
                                Volver
                                </Button>
                            <Button variant="danger" onClick={eliminar}disabled={deshabilitarBoton}>
                                Eliminar
                                </Button>
                        </ButtonGroup>
          </Card.Body>
  )
}

export default Eliminar
 