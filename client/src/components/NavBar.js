import {Link , useNavigate } from "react-router-dom"
import { useState } from 'react';



export default function Header ({user}) {
    const navigate = useNavigate();
    const logout = () => {
   window.open("http://localhost:3000/logout", "_self");
   navigate('/welcome')
    }

  //change navcolor when scrolling
  const [navColor, setNavColor] = useState(false)
  const changeNavColor = () => {
    if(window.scrollY >=50) {
        setNavColor(true)
    } else {
         setNavColor(false)
    }
}
window.addEventListener('scroll' , changeNavColor)
    return (
        <>
        <header className={navColor && 'header nav'  } > 
            {
             user || localStorage.clear('data')
             ? 
             (
       
            <nav >
            <Link to="/home" className="">Posts</Link>
            <Link 
            onClick={logout} 
            
            >Logout</Link>
            </nav>

            ) 
            : (
                <nav>
                <Link to="/" className="">Welcome</Link>
                <Link to="/home" className="">Posts</Link>
                <Link className="link" to="login">Login</Link>
                <Link to="/register" className="">Register</Link>
                </nav>
            )
        }
    

    
        </header>
        </>
       
    )
}