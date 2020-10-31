import { useContext } from 'react';
import { AuthContext } from '../context';
import { useAsync } from './useAsync';

const BASE_URL = 'http://51.161.33.182:5000'; 

function api(authContext, endpoint, urlParams, bodyParams) {
    let headers = {
        'Content-Type': endpoint.contentType ?? 'application/json',
    };

    if(!endpoint.open)
        headers['Authorization'] = `Bearer ${authContext.token}`;

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
           for (const c of endpoint.accept ?? [])
               if(c.when(r)) return c.then(r);

            for(const c of endpoint.reject ?? [])
                if(c.when(r)) return Promise.resolve(c.then(r)).then(v => { throw v });
            
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
    ]
};

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
        { when: r => r.status == 400, then: r => r.json() },
    ]
};

const getDiet = {
    url: '/Diet',
    method: 'GET',
    accept: [
        { when: r => r.status == 200, then: r => r.json() }
    ]
};

const getRestrictions = {
    url: '/Diet/AvailableRestrictions',
    method: 'GET',
    accept: [
        { when: r => r.status == 200, then: r => r.json() }
    ]
};

const deleteDiet = {
    url: '/Diet/Categorical/${id}/',
    method: 'DELETE',
    accept: [
        { when: r => r.status == 200, then: r => null }
    ]
};

const addRestriction = {
    url: '/Diet/Categorical',
    method: 'POST',
    accept: [
        { when: r => r.status == 200, then: r => null }
    ],
    reject: [
        { when: r => r.status == 400, then: r => "Restriction is already in the diet" }
    ]
};

const getUpcSearch = {
    url: p => `/Search/Upc?upc=${p.upc}`,
    method: 'GET',
    accept: [
        { when: r => r.status == 200, then: r => r.json() }
    ],
    reject: [
        { when: r => r.status == 404, then: r => "Unknown UPC" }
    ]
}

const getUsername = {
    url: '/Account',
    method: 'GET',
    accept: [
        { when: r => r.status == 200, then: r => r.json() }
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

export function useGetDiet() {
    const context = useContext(AuthContext);
    return useAsync(() => api(context, getDiet));
}

export function useGetRestrictions() {
    const context = useContext(AuthContext);
    return useAsync(() => api(context, getRestrictions));
}

function getDeleteDiet(id) {
    deleteDiet.url = `/Diet/Categorical/${id}/`;
    return deleteDiet;
}

export function useDeleteDiet() {
    const context = useContext(AuthContext);
    return useAsync(id => api(context, getDeleteDiet(id), undefined, { id }));
}

export function useAddRestriction() {
    const context = useContext(AuthContext);
    return useAsync(id => api(context, addRestriction, undefined, { id }));
}

export function useGetUpcSearch() {
    const context = useContext(AuthContext);
    return useAsync(upc => api(context, getUpcSearch, { upc }))
}

export function useGetUsername() {
    const context = useContext(AuthContext); 
    return useAsync(() => api(context, getUsername));
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