import './App.css';
import Header from './components/NavBar';
import Home from './components/pages/Home';
import Posts from './components/pages/Posts';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/logout';
import Welcome from './components/pages/Welcome';
import Footer from './components/Footer';
import {BrowserRouter , Routes, Route , Navigate , Link} from "react-router-dom";
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import { useContext, useEffect , useState } from 'react';

//test 
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
 



function App () {


  ///////////permission reading articles/////////
  const [user, setUser] = useState(null);
useEffect(() => {
    if(user) {
        axios.get('http://localhost:5000' , user).then(({data}) => {
            setUser(data)
            console.log("data" , data)
        })
    }
     setUser();
}, []);

console.log("user from axios" , user)
console.log("user : " , user)

  return (
  <div className='page-container'>
      <div className="container">
<BrowserRouter>
      <Header user={user}/>
      <Toaster position='top-center' toastOptions={{duration: 3000}}/>
<Routes>

  <Route path='/' element={<Welcome />} />
  <Route path='/home' element={<Home />} />
  {/* <Route path='/test' element={user ? <Login /> : <Test /> }  /> */}
  {/* <Route path='/login' element={<Login />} /> */}

  <Route path='/login' element={!user ? <Login /> : <Welcome /> } />

  <Route path='/register' element={!user && <Register /> } />
   
  <Route path='/posts/:id' element={!user ? <Login /> : <Posts /> } />

  <Route path='/logout' element={!user && <Welcome />}  />


</Routes>
</BrowserRouter>
{/* <Footer /> */}

    </div>
    </div>
    

    
  );
}

export default App;
