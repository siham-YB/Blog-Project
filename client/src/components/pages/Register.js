import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {toast} from 'react-hot-toast';

export default function Register () {
   const navigate = useNavigate();

   const [data, setData]= useState({
      username: '',
      email:'',
      password:'',
      confirmPassword:''
   })

   
      const registerUser = async (e) => {
         e.preventDefault();
         const {username, email, password, confirmPassword} = data

         try {
            const {data} = await axios.post('http://localhost:5000/register' , {
               username, email, password, confirmPassword
            });
            if(data.error) {
            toast.error( data.error)
            } else {
               // setData({})
               toast.success('register successful')
               navigate('/login')
            }
         } catch (error) {
               console.log("there is an error-R" , error)
         }
      }
  
    return (
   <div className="register-page">
<div className="register-form">
<form onSubmit={registerUser}>
<div className="username">
   <label htmlFor ="text" >Username:</label>
   <input 
   type="text"
   placeholder="Enter your username"
   className="username-type"
   value={data.username}
   onChange={(e) => setData({...data, username: e.target.value})}
   />
   </div>

<div className="email">
   <label htmlFor ="email" >Email:</label>
   <input
   type="email"
   placeholder="Enter email"
   className="email-type" 
   value= {data.email}
   onChange={(e) => setData({...data, email: e.target.value})}
   />
   </div>

   <div className="password">
   <label htmlFor="password">Password:</label>
   <input
   type="password"
   placeholder="Enter password"
   className="password-type"
   value={data.password}
   autoComplete="on"
   onChange={(e) => setData({...data, password: e.target.value})}
   />
   </div>

   <div className="password">
   <label htmlFor="password">EnterConfirm Password:</label>
   <input 
   type="password"
   placeholder="Enter confirm password" 
   className="password-type"
   value= {data.confirmPassword}
   autoComplete="on"
   onChange={(e) => setData({...data, confirmPassword: e.target.value})}
   />
   </div>

<div className="login-btn">
   <button type="submit" className="login-btn-int">Sign up</button>
   </div>
</form>
</div>
</div>
    );
};