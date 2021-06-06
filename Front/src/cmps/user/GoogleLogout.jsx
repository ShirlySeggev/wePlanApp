import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '769637694802-vf75osrds0ldm86vk8q2o9n5hjvbs5k1.apps.googleusercontent.com';


export function LogoutGoogle() {
    const onSuccess = () => {
        console.log('Logout made successfully');
    };
    return (
        <GoogleLogout
            clientId={clientId}
            buttonText="Yes"
            className="logout-btn"
            onLogoutSuccess={onSuccess}
            icon={false}
        >
        </GoogleLogout>
    );
}
