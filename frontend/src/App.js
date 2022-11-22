import {
    BrowserRouter as Router,
    Routes as Switch,
    Route
} from "react-router-dom";
import {ACTORS_PATH, CATEGORIES_PATH, DIRECTORS_PATH, FILMS_PATH, MAIN_PATH} from "./utils/paths";
import FilmSite from "./structure/sites/FilmSite";
import Header from "./structure/Header";
import CategoriesSite from "./structure/sites/CategoriesSite";
import ActorsSite from "./structure/sites/ActorsSite";
import DirectorsSite from "./structure/sites/DirectorsSite";
import {ApplicationContext} from "./context/ApplicationContext";
import {useEffect, useState} from "react";
import {getActors, getCategories, getDirectors, getFilms} from "./api/api";

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
                    setFilms(films);
                });
            getCategories()
                .then((categories) => {
                    setCategories(categories);
                });
            getActors()
                .then((actors) => {
                    setActors(actors);
                });
            getDirectors()
                .then((directors) => {
                    setDirectors(directors);
                    setLoading(false)
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

    console.log(user)

    return (
        <ApplicationContext.Provider value={applicationInfo}>
          <Router>
              <div>
                  <Header setUser={setUser}/>

                      <Switch>
                          <Route path={MAIN_PATH} element={<FilmSite/>}/>
                          <Route path={FILMS_PATH} element={<FilmSite/>}/>
                          <Route path={CATEGORIES_PATH} element={<CategoriesSite/>}/>
                          <Route path={ACTORS_PATH} element={<ActorsSite/>}/>
                          <Route path={DIRECTORS_PATH} element={<DirectorsSite/>}/>
                      </Switch>

              </div>
          </Router>
        </ApplicationContext.Provider>
  );
}

export default App;
