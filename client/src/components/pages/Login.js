import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        // e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                // setData({})
                toast.success('login successful');

                navigate('/');
            }
        } catch (error) {
            console.log('there is an error-L', error);
        }
    };

    return (
        <div className='login-page'>
            <div className='login-form'>
                <form onSubmit={loginUser}>
                    <div className='email'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter email'
                            className='email-type'
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                        />
                    </div>

                    <div className='password'>
                        <label htmlFor='password'>Password</label>
                        <input
                            // name='password'
                            type='password'
                            placeholder='Enter password'
                            value={data.password}
                            onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                            }
                            className='password-type'
                        />
                    </div>

                    <div className='login-btn'>
                        <button
                            // name='login-btn'
                            type='submit'
                            className='login-btn-int'
                        >
                            Log in
                        </button>
                    </div>
                    <Link to='/register' className='account'>
                        Don't have an account
                    </Link>
                </form>
            </div>
        </div>
    );
}
