import axios  from 'axios';

const url = 'http://localhost:3000/usuario';

const traerDatosDeUsuarioPorId = async (id) => {
    const endPoint = url + '/' + id;
    try {
        const respuesta = await axios.get(endPoint);
        
        if (respuesta.status===200) {
            return usuario = respuesta.data;
        
        } else {
           return false
        }
    } catch (error) {
        return false
    }
}

export {
    traerDatosDeUsuarioPorId,
}