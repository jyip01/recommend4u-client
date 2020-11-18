import config from '../config'
import 'whatwg-fetch'; //for safari

const AuthApiService = {
    postLogin({email, password}){
        return fetch(`${config.API_ENDPOINT}/auth/login`,{
            method: 'POST',
            body: JSON.stringify({
                'email':`${email}`, 
                'password':`${password}`
            }),    
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(res=>
                (!res.ok)
                    ? res.json().then(e=>Promise.reject(e))
                    : res.json()
            )
    }
}

export default AuthApiService;