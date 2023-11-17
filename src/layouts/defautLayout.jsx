import { Card } from 'react-bootstrap';


import MyNavbar from './../components/navbar.jsx';

const DefautLayout = (props) => { 
  const children = props.children;
  return (
    <>
      <MyNavbar/>
      <div style={{ padding: 20}}>
        <Card >
          { children }
        </Card>
      </div>
      
    </>
  )
}

export default DefautLayout
 