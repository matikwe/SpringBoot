const baseUrl = 'http://127.0.0.1:8080/api/v1';

export const getFilms = () => {
    return fetch(baseUrl + '/movie')
        .then(response => response.json());
};

export const getCategories = () => {
    return fetch(baseUrl + '/category')
        .then(response => response.json());
};

export const getActors = () => {
    return fetch(baseUrl + '/actor')
        .then(response => response.json());
};

export const getDirectors = () => {
    return fetch(baseUrl + '/director')
        .then(response => response.json());
};

export const getLogin = (login, password) => {
    return fetch(baseUrl + `/user/login?login=${login}&password=${password}`)
        .then(response => response.json());
}