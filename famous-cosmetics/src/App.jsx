import { BrowserRouter } from 'react-router-dom'
import Routing from './Routing/Routing'
import './assets/Responsive/Responsive.css'
import './App.css'







function App() {


  return (
    <>
      <BrowserRouter>
        {/* <Frontend /> */}
        <div>
          <Routing />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
