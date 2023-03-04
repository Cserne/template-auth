import jwt from 'jwt-decode';
import { useState, useEffect, useContext, createContext } from "react";
import http from 'axios';
import { todoApi } from '../api/todoApi';
import config from '../app.config';
//milyen értéket és metodokat cipelnénk körbe az alkalmazáson - mi fog ide ide kerülni? token
//ez itt egy react komponenes, de nem tudjuk itt használni a navigatet, mert kívül van az index.js-en, mert az authproviderben van benne a router! de itt megszerezzük az userId-t

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const { post } = todoApi();

    //ha valaki ráfrissít, újra beállítjuk a statejeinket, nem lenne különben bejelentkezve. frissítésnél minden újrakezdődik
    useEffect(() => {
        const tokenInStorage = localStorage.getItem("token");
        if (tokenInStorage) {
            setToken(tokenInStorage);
            setUser(jwt(tokenInStorage)) //nem a useStateből hanem a storageből jön a token
        }
    }, [])

    //megszerezzük a tokent, hogy autentikálhassunk. az, hogy hogyan állítjuk be, itt nem érdekes??
    const auth = () => {
        // const googleBaseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const googleBaseUrl = config.google_base_url;
        const searchParams = new URLSearchParams();
        searchParams.append('client_id', '423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com');
        searchParams.append('scope', 'openid');
        // searchParams.append('redirect_uri', 'http://localhost:3000/callback');
        searchParams.append(
            'redirect_uri', window.location.origin + '/callback'
        );
        searchParams.append('response_type', 'code');
        searchParams.append('prompt', 'select_account');

        const fullUrl = googleBaseUrl + '?' + searchParams.toString();
        // window.open(fullUrl, '_blank'); // Így új ablakot nyit meg a bejelentkezéshez.
        // window.open(fullUrl, '_self'); //Így nem nyit meg új ablakot.
        window.location.href = fullUrl; //Így nem nyit meg új ablakot.
    }; 

    const login = async (code, provider) => {
        try {
            // const res = await http.post('http://localhost:4000/api/user/login', {'code': code, 'provider': provider});
            // const res = await http.post('/api/user/login', {'code': code, 'provider': provider});
            // const res = await http.post('http://localhost:8080/api/user/login', {'code': code, 'provider': provider});
            const res = await post('/user/login', {'code': code, 'provider': provider});
            console.log(res.data);
            setToken(res.data.sessionToken);
            localStorage.setItem('token', res.data.sessionToken);
            setUser(jwt(res.data.sessionToken)); //ez a decoded decoded/user = jwt(response.data.sessionToken)
            console.log(user);
        } catch (error) {
            console.log(error);
            setToken(null);
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const register = async (username) => {
        const response = await post('/user/create', { username });
        console.log(response.status);
        console.log(response.data);

        if (response?.status === 200) {
            setToken(response.data.sessionToken)
            localStorage.setItem('token', response.data.sessionToken)
            setUser(jwt(response.data.sessionToken));
        }
    }

    const contextValue = { token, auth, login, logout, user, register }; 

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('Add AuthProvider to root!')
    return context;
}

export { AuthProvider, useAuth };