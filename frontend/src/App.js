import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import {
    ACTORS_PATH, ADMIN_USERS_PATH,
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
import AdminUsersPanel from "./components/AdminUsersPanel";

const App = () => {

    const [films, setFilms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [searchbox, setSearchbox] = useState('')
    const [showLogin, setLoginShow] = useState(false);

    useEffect(
        () => {
            getFilms()
                .then((films) => {
                    if (films.length > 0) {
                        setFilms(films);
                        try {
                            window.localStorage.setItem('FILMS_STATE', JSON.stringify(films))
                        } catch (e) {
                            console.log(e)
                        }
                    } else {
                        setLoading(false)
                        alert('Error ' + films.status + ': ' + films.message)
                    }
                });
            getCategories()
                .then((categories) => {
                    if (categories.length > 0) {
                        setCategories(categories);
                    } else {
                        setLoading(false)
                        alert('Error ' + categories.status + ': ' + categories.message)
                    }
                });
            getActors()
                .then((actors) => {
                    if (actors.length > 0) {
                        setActors(actors);
                    } else {
                        setLoading(false)
                        alert('Error ' + actors.status + ': ' + actors.message)
                    }
                });
            getDirectors()
                .then((directors) => {
                    if (directors.length > 0) {
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

    const onSearchboxChange = (e) => {
        setSearchbox(e.target.value)
    }

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
                  <Header user={user} setUser={setUser} searchbox={searchbox} onSearchBoxChange={onSearchboxChange} showLogin={showLogin} setLoginShow={setLoginShow}/>

                      <Switch>
                          <Route path={MAIN_PATH} element={<FilmsListSite searchbox={searchbox} setSearchbox={setSearchbox}/>}/>
                          <Route path={FILMS_PATH} element={<FilmsListSite searchbox={searchbox} setSearchbox={setSearchbox}/>}/>
                          <Route path={FILM_PATH} element={<FilmSite setLoginShow={setLoginShow}/>}/>
                          <Route path={CATEGORIES_PATH} element={<CategoriesSite searchbox={searchbox} setSearchbox={setSearchbox}/>}/>
                          <Route path={ACTORS_PATH} element={<ActorsSite searchbox={searchbox} setSearchbox={setSearchbox}/>}/>
                          <Route path={DIRECTORS_PATH} element={<DirectorsSite searchbox={searchbox} setSearchbox={setSearchbox}/>}/>
                          <Route path={PROFILE_PATH} element={<ProfileSite setUser={setUser}/>}/>
                          <Route path={RESERVATIONS_PATH} element={<ReservationsSite/>}/>
                          <Route path={ADMIN_USERS_PATH} element={<AdminUsersPanel/>}/>
                      </Switch>

              </div>
          </Router>
        </ApplicationContext.Provider>
  );
}

export default App;
