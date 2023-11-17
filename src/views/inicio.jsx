import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
//import axios  from 'axios';

import TabladeDatos from './../components/TabladeDatos.jsx';

const inicio = () => { 
  const [lista, setLista]= useState([]);

  const cargarLista = async () => {
    const url = 'http://localhost:3000/usuarios';

    //const respuesta = await axios.get(url);
    let respuesta = await fetch(url);

    if (respuesta.status===200) {
      respuesta = await respuesta.json();
      
      setLista(respuesta)
      
    }

  }
   
  useEffect( ()=>{ 
    cargarLista();
  },[]);

  useEffect( ()=>{ 
    console.log('la lista se cambio');
  },[lista]);

  return (
          <Card.Body>
            <TabladeDatos lista={lista} />
           
            </Card.Body>
  )

  }
export default inicio