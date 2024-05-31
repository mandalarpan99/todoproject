import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Registration } from './assets/Registration';
import {Login} from "./assets/Login";
import {NavBar} from "./components/navBar";
import { Logout } from './assets/Logout';
import {User} from './assets/User';
const App = ()=>{
  return <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </BrowserRouter>

  </>
}


export default App;