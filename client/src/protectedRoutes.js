import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SearchBar from './components/SearchBar';
const ProtectedRoutes = () => {
    const token = document.cookie;
    return token ? <SearchBar /> : <Navigate to='/home' />;
};
export default ProtectedRoutes;
