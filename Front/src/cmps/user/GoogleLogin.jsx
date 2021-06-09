import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../services/google.service';


const clientId = '769637694802-vf75osrds0ldm86vk8q2o9n5hjvbs5k1.apps.googleusercontent.com';


export function LoginGoogle({ submitUser, setMsg }) {
    const onSuccess = (res) => {
        const googleUser = res.profileObj
        const user = {
            email: googleUser.email,
            fullname: googleUser.name,
            username: googleUser.email,
            imgUrl: googleUser.imageUrl,
            password: googleUser.googleId
        }
        const isGoogle = true
        submitUser(user, isGoogle)
        refreshTokenSetup(res);

    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        setMsg('Failed to login with google')
    };

    return (
        <div className="google-login-button">
            <GoogleLogin
                clientId={clientId}
                buttonText="Continue with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}







