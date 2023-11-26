import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios  from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => { 
  const navigate = useNavigate();

 const { usuario, setUsuario} = useState('');
 const { contrasenia, setContrasenia} = useState('');
 const [deshabilitarBoton, setDeshabilitarBoton] = useState(false);
 const [errores, setErrores]= useState({});


 const cambiarUsuario = (e) => {
  setUsuario(e.target.value);
}

const cambiarContrasenia = (e) => {
  setContrasenia(e.target.value);
}

const verificarDatos = async () => {
  let misErrores = {}

  if (usuario.length === 0) {
    misErrores.usuario = 'Debe introducir un usuario.';
    
  }

  if (contrasenia.length === 0) {
    misErrores.contrasenia = 'Debe introducir una contraseña.';
  }

  setErrores(misErrores);

  if (Object.entries(misErrores).length === 0) {
    setDeshabilitarBoton(true);

    await mandarDatos();
  }
  console,log(misErrores);
}

const mandarDatos = async ()=>{
  const url = 'http://localhost:3000/autenticar';
  const datos ={
      usuario:usuario,
      contrasenia:contrasenia,
  
  }
  try {
      const respuesta = await axios.post(url, datos);
      

      if(respuesta.status === 200){
          return navigate('/');
          //console.log(respuesta.data);
      } else{
          setErrores({error: 'Los Datos Ingresados no son Validos.'});
      }
      
  } catch (error) {
      setErrores({error: 'Ocurrio un error Inesperado'});
  }
  setDeshabilitarBoton(false)

}

  return (
          <Card.Body>
            <Form>
                <Form.Group className="mb-3" controlId="usuario">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control type="text" placeholder="Usuario" onInput={cambiarUsuario} />

                 {
                  errores.usuario && (
                    <Form.Text style={{color: 'red'}}>
                      {errores.usuario}
                    </Form.Text>
                  )
                }

                </Form.Group>

                <Form.Group  className="mb-3" controlId="Contraseña">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="contraseña" onInput={cambiarContrasenia} />
                  {
                  errores.contrasenia && (
                    <Form.Text style={{color: 'red'}}>
                      {errores.contrasenia}
                    </Form.Text>
                  )
                }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
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
                  Ingresar
                </Button>
            </Form>
          </Card.Body>
  )
}

export default Login
 