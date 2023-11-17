import { RouterProvider} from "react-router-dom";


import DefautLayout from './layouts/defautLayout.jsx';

import { rutas} from './router.jsx'
const App =() => { 
  return (
    <DefautLayout>
      <RouterProvider router={rutas}/>
      
    </DefautLayout>
  )
}

export default App
 