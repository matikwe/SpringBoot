const baseUrl = 'http://127.0.0.1:8080/api/v1';

export const getFilms = () => {
    return fetch(baseUrl + '/movie').then(response => response.json());
};

export const getCategories = () => {
    return fetch(baseUrl + '/category').then(response => response.json());
};

export const getActors = () => {
    return fetch(baseUrl + '/actor').then(response => response.json());
};

export const getDirectors = () => {
    return fetch(baseUrl + '/director').then(response => response.json());
};

export const postLogin = (login, password) => {
    return fetch(baseUrl + '/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export const postRegister = (login, password, email, name, surname) => {
    return fetch(baseUrl + '/user/register', {
        method: 'POST',
        body: JSON.stringify({
            login: login,
            password: password,
            email: email,
            name: name,
            surname: surname
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export const changePassword = (oldPassword, newPassword, user) => {
    return fetch(baseUrl + `/user/${user.id}?oldPassword=` + oldPassword, {
        method: 'PUT',
        body: JSON.stringify({
            login: user.login,
            password: newPassword,
            email: user.email,
            name: user.name,
            surname: user.surname
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export const deleteAccount = (oldPassword, user) => {
    return fetch(baseUrl + `/user/${user.id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            oldPassword: oldPassword,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json() || null)
}

export const getUsers = () => {
    return fetch(baseUrl + '/user').then(response => response.json());
}
