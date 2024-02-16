import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Header({ user }) {
    const logout = () => {
        document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    };

    function handleLogout() {
        logout();

        window.location.href = '/';
    }

    //change navcolor when scrolling
    const [navColor, setNavColor] = useState(false);
    const changeNavColor = () => {
        if (window.scrollY >= 50) {
            setNavColor(true);
        } else {
            setNavColor(false);
        }
    };
    window.addEventListener('scroll', changeNavColor);

    return (
        <>
            <header className={navColor && 'header nav'}>
                {user ? (
                    <nav>
                        <Link to='/' className=''>
                            Posts
                        </Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </nav>
                ) : (
                    <nav>
                        {/* <Link to='/' className=''>
                            Welcome
                        </Link> */}
                        <Link to='/' className=''>
                            Posts
                        </Link>
                        <Link className='link' to='/login'>
                            Login
                        </Link>
                        <Link to='/register' className=''>
                            Register
                        </Link>
                    </nav>
                )}
            </header>
        </>
    );
}
