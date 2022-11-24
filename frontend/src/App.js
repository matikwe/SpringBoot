import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import {
    ACTORS_PATH,
    CATEGORIES_PATH,
    DIRECTORS_PATH,
    FILM_PATH,
    FILMS_PATH,
    MAIN_PATH,
    PROFILE_PATH, RESERVATIONS_PATH
} from "./utils/paths";
import FilmsListSite from "./structure/sites/FilmsListSite";
import Header from "./structure/Header";
import CategoriesSite from "./structure/sites/CategoriesSite";
import ActorsSite from "./structure/sites/ActorsSite";
import DirectorsSite from "./structure/sites/DirectorsSite";
import {ApplicationContext} from "./context/ApplicationContext";
import {useEffect, useState} from "react";
import {getActors, getCategories, getDirectors, getFilms} from "./api/api";
import FilmSite from "./structure/sites/FilmSite";
import ProfileSite from "./structure/sites/ProfileSite";
import ReservationsSite from "./structure/sites/ReservationsSite";

const App = () => {

    const [films, setFilms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);


    useEffect(
        () => {
            getFilms()
                .then((films) => {
                    if (films[0].id) {
                        setFilms(films);
                        window.localStorage.setItem('FILMS_STATE', JSON.stringify(films))
                    } else {
                        setLoading(false)
                        alert('Error ' + films.status + ': ' + films.message)
                    }
                });
            getCategories()
                .then((categories) => {
                    if (categories[0].id) {
                        setCategories(categories);
                    } else {
                        setLoading(false)
                        alert('Error ' + categories.status + ': ' + categories.message)
                    }
                });
            getActors()
                .then((actors) => {
                    if (actors[0].id) {
                        setActors(actors);
                    } else {
                        setLoading(false)
                        alert('Error ' + actors.status + ': ' + actors.message)
                    }
                });
            getDirectors()
                .then((directors) => {
                    if (directors[0].id) {
                        setDirectors(directors);
                        setLoading(false)
                    } else {
                        setLoading(false)
                        alert('Error ' + directors.status + ': ' + directors.message)
                    }
                });
        },
        [],
    );

    const applicationInfo = {
        films,
        categories,
        actors,
        directors,
        user,
        isLoading,
    };


    return (
        <ApplicationContext.Provider value={applicationInfo}>
          <Router>
              <div>
                  <Header user={user} setUser={setUser}/>

                      <Switch>
                          <Route path={MAIN_PATH} element={<FilmsListSite/>}/>
                          <Route path={FILMS_PATH} element={<FilmsListSite/>}/>
                          <Route path={FILM_PATH} element={<FilmSite/>}/>
                          <Route path={CATEGORIES_PATH} element={<CategoriesSite/>}/>
                          <Route path={ACTORS_PATH} element={<ActorsSite/>}/>
                          <Route path={DIRECTORS_PATH} element={<DirectorsSite/>}/>
                          <Route path={PROFILE_PATH} element={<ProfileSite/>}/>
                          <Route path={RESERVATIONS_PATH} element={<ReservationsSite/>}/>
                      </Switch>

              </div>
          </Router>
        </ApplicationContext.Provider>
  );
}

export default App;
