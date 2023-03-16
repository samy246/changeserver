import logo from './logo.svg';
import './App.css';
import {ToastContainer} from "react-toastify";
import Registerform from './Components/Registerform';
import Loginform from './Components/Loginform';

import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Components/Home';
import Admin from './Components/Admin';
import Adminhome from './Components/Adminhome';
function App() {
  return (
    <div className="App">
       <ToastContainer theme='colored'></ToastContainer>
<BrowserRouter>
<Routes>
  <Route path='/' element={<Registerform/>}/>
  <Route path='/login' element={<Loginform/>}/>
  <Route path='/admin' element={<Admin/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='/adminhome' element={<Adminhome/>}/>
</Routes>
</BrowserRouter>




    </div>
  );
}

export default App;
