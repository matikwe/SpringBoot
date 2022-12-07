const baseUrl = 'http://127.0.0.1:8080/api/v1';

export const deleteFilm = (id) => {
    return fetch(baseUrl + `/movie/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const deleteCategory = (id) => {
    return fetch(baseUrl + `/category/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const deleteActor = (id) => {
    return fetch(baseUrl + `/actor/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const deleteDirector = (id) => {
    return fetch(baseUrl + `/director/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const deleteUser = (id, adminID) => {
    return fetch(baseUrl + `/user/deleteUserFromAdminPanel/${id}?currentUser=${adminID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const postFilm = (formData) => {
    return fetch(baseUrl + '/movie/addMovie',{
        method: 'POST',
        body: formData,
        mode: "no-cors"
    }).then(response => response)
}

export const postCategory = (formData) => {
    return fetch(baseUrl + '/category/addCategory',{
        method: 'POST',
        body: formData
    }).then(response => response)
}

export const postActor = (formData) => {
    return fetch(baseUrl + '/actor/addActor',{
        method: 'POST',
        body: formData
    }).then(response => response)
}

export const postDirector = (formData) => {
    return fetch(baseUrl + '/director/addDirector',{
        method: 'POST',
        body: formData
    }).then(response => response)
}

export const putChangeRole = (id, currentUserID, role) => {
    return fetch(baseUrl + `/user/changeRole/${id}?currentUserId=${currentUserID}&role=${role}`,{
        method: 'PUT',
    }).then(response => response)
}

export const putFilm = (formData, id) => {
    return fetch(baseUrl + `/movie/${id}`,{
        method: 'PUT',
        body: formData
    }).then(response => response)
}
