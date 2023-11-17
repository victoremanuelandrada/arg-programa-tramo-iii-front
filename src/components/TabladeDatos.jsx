import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useNavigate } from "react-router-dom";

const TabladeDatos = (props) => {
    const { lista } = props;

    const navigate = useNavigate();

    const editar = (id)=>{
        navigate('/cargar');
    }
    const eliminar = (id)=>{
        navigate('/eliminar/'+ id);
    }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Accioes</th>
          
        </tr>
      </thead>
      <tbody>
        {
            lista.map((item, key) =>(
                <tr key={ key }>
                    <td>{ item.id }</td>
                    <td>{ item.nombres }</td>
                    <td>{ item.apellidos }</td>
                    <td>
                        <ButtonGroup style={{maxWidth:'30px'}} >
                            <Button variant="success" onClick={() =>editar(item.id)} >Editar</Button>
                            <Button variant="danger" onClick={() =>eliminar(item.id)}>Eliminar</Button>
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