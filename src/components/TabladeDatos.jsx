import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useNavigate } from "react-router-dom";

const TabladeDatos = (props) => {
    const { lista } = props;

    const navigate = useNavigate();

    const ver = (id)=>{
      navigate('/ver/'+ id);
  }
    const editar = (id)=>{
        navigate('/editar/'+ id);
    }
    const eliminar = (id)=>{
        navigate('/eliminar/'+ id);
    }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Usuarios</th>
          <th>Contraseña</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Accioes</th>
          
        </tr>
      </thead>
      <tbody>
        {
            lista.map((item, key) =>(
                <tr key={ key }>
                    <td>{ key + 1 }</td>
                    <td>{ item.usuario}</td>
                    <td>{item.contrasenia}</td>
                    <td>{ item.nombres }</td>
                    <td>{ item.apellidos }</td>
                    <td>
                        <ButtonGroup style={{maxWidth:'30px'}} >
                            <Button variant="primary" onClick={() =>ver(item._id)} >ver</Button>
                            <Button variant="success" onClick={() =>editar(item._id)} >Editar</Button>
                            <Button variant="danger" onClick={() =>eliminar(item._id)}>Eliminar</Button>
                        </ButtonGroup>
                    </td>

            
                </tr>
            ))
        }
      </tbody>
    </Table>
  )
}

export default TabladeDatos;