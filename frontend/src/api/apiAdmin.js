const baseUrl = 'http://127.0.0.1:8080/api/v1';

export const deleteFilm = (id) => {
    return fetch(baseUrl + `/movie/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export const deleteCategory = (id) => {
    return fetch(baseUrl + `/category/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export const deleteActor = (id) => {
    return fetch(baseUrl + `/actor/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export const deleteDirector = (id) => {
    return fetch(baseUrl + `/director/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

export const deleteUser = (id, adminID) => {
    return fetch(baseUrl + `/user/deleteUserFromAdminPanel/${id}?currentUser=${adminID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const addFilm = (formData) => {
    return fetch(baseUrl + '/movie/addMovie',{
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.json())
}