const baseurl = 'http://localhost:8080/api/v1'

export const getMovies = () => {
  return fetch(baseurl + '/movie', {
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
}

export const getCategories = () => {
    return fetch(baseurl + '/category', {
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}

export const getActors = () => {
    return fetch(baseurl + '/actor', {
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}

export const getDirectors = () => {
    return fetch(baseurl + '/director', {
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
}