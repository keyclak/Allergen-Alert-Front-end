import { useContext } from 'react';
import { AuthContext } from '../context';
import { useAsync } from './useAsync';

const BASE_URL = 'http://51.161.33.182:5000'; 

function api(authContext, endpoint, urlParams, bodyParams) {
    let headers = {
        'Content-Type': endpoint.contentType ?? 'application/json',
    };

    if(!endpoint.open)
        headers['Authorization'] = `Bearer ${AuthContext.token}`;

    let url;
    if(typeof(endpoint.url) === 'string')
        url = endpoint.url
    else
        url = endpoint.url(urlParams);

    return fetch(BASE_URL + url, 
        { 
            method: endpoint.method, 
            headers,
            body: endpoint.body ? endpoint.body(bodyParams) : JSON.stringify(bodyParams)
        })
        .then(r => {
           for (const c of endpoint.accept)
               if(c.when(r)) return c.then(r);

            for(const c of endpoint.reject)
                if(c.when(r)) throw c.then(r);
            
            if(r.status == 401) {
                authContext.logOut();
                throw 'Unauthorized';
            }
            
            console.error(`Unhandled API response:\n${JSON.stringify(r, null, 1)}`);

            throw `Unhandled response for ${url}`;
        });
}

const login = {
    url: '/Account/Login/',
    method: 'POST',
    // body: o => JSON.stringify(o),
    // contentType: 'application/json',
    open: true,
    accept: [
        { when: r => r.status == 200, then: r => r.json() }
    ],
    reject: [
        { when: r => r.status == 400, then: r => 'Invalid username or password' },
        { when: r => r.status == 500, then: r => 'Please enter your username and password' }
    ]
}

const create = {
    url: '/Account/Create/',
    method: 'POST',
    // body: o => JSON.stringify(o),
    // contentType: 'application/json',
    open: true,
    accept: [
        { when: r => r.status == 200, then: r => null }
    ],
    reject: [
        { when: r => r.status == 400, then: r => 'Invalid username, password, or email' },
        { when: r => r.status == 500, then: r => 'Please enter your username, password, or email' }
    ]
}

export function useLogin(username, password) {
    const context = useContext(AuthContext);
    return useAsync(() => api(context, login, undefined, { username, password }));
}

export function useCreateAccount( username, email, password ) {
    const context = useContext(AuthContext);
    return useAsync(() => api(context, create, undefined, { username, email, password }));
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

export function useDummy(value) {
    return useAsync(async () => {
        return sleep(500).then(() => value);
    });
}

export function validateResetToken(token) {

}

export function resetPassword(token) {
    
}