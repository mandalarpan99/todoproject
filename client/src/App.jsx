import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Registration } from './assets/Registration';
import {Login} from "./assets/Login";
import {NavBar} from "./components/navBar";
import { Logout } from './assets/Logout';
import {User} from './assets/User';
import { Posts } from './assets/Posts';
import {UpdatePost} from './assets/Update-post';
const App = ()=>{
  return <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/user' element={<User />} />
        <Route path='/post' element={<Posts />} />
        <Route path='/update/:id' element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>

  </>
}


export default App;