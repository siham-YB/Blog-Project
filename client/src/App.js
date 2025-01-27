import './App.css';
import Header from './components/NavBar';
import Home from './components/pages/Home';
import Posts from './components/pages/Posts';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Welcome from './components/pages/Welcome';
// import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

//test
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
    ///////////permission reading articles/////////
    // const [user, setUser] = useState({ email: '', password: '' });
    // useEffect(() => {
    //         axios
    //             .get('http://localhost:5000/login' , user)
    //             .then(({ data }) => {
    //                 setUser(data);
    //                 console.log('data', user);
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching user:', error);
    //             });

    // }, []);

    // console.log('user from axios', user);
    // console.log('user : ', user);
    /////////////////////////////////////////////////////////////////////////////

    const [user, setUser] = useState(false);

    useEffect(() => {
        const handleSetUser = function () {
            let token = document.cookie;
            return token ? setUser(true) : setUser(false);
        };
        handleSetUser();
    }, []);

    console.log('user', user);

    return (
        <div className='page-container'>
            <div className='container'>
                <BrowserRouter>
                    <Header user={user} />
                    {/* test the toaster */}
                    <Toaster
                        position='top-center'
                        toastOptions={{ duration: 1000 }}
                    />
                    <Routes>
                        {/* <Route path='/' element={<Welcome />} /> */}
                        <Route path='/' element={<Home />} />

                        <Route path='/login' element={!user && <Login />} />

                        <Route
                            path='/register'
                            element={!user && <Register />}
                        />

                        <Route
                            path='/posts/:id'
                            element={!user ? <Login /> : <Posts />}
                        />

                        <Route path='/logout' element={!user && <Welcome />} />
                    </Routes>
                </BrowserRouter>
                {/* <Footer /> */}
            </div>
        </div>
    );
}

export default App;
