import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const DisplayError = () => {
    const {logOut} = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
        .then(() => {
            navigate('/login')
         })
        .catch(error => console.log(error))
    }
    return (
        <div>
            <p className="text-red-500">something went wrong !!!</p>
            <p className="text-red-400">{error.statusText || error.message}</p>
            <h2 className="text-3xl">Please <button onClick={handleLogOut}>Sing out</button>and log back in</h2>
        </div>
    );
};

export default DisplayError;