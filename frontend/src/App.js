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
import {useEffect, useState} from "react";
import {getActors, getCategories, getDirectors, getMovies} from "./api/api";
import {ApplicationContext} from "./context/ApplicationContext";

const App = () => {

    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(
        () => {
            getMovies()
                .then((movies) => {
                    setMovies(movies);
                    setLoading(false);
                });

            getCategories()
                .then((categories) => {
                    setCategories(categories);
                    setLoading(false);
                });

            getActors()
                .then((actors) => {
                    setActors(actors);
                    setLoading(false);
                });

            getDirectors()
                .then((directors) => {
                    setDirectors(directors);
                    setLoading(false);
                });
        },
        [],
    );

    const applicationInfo = {
        movies,
        categories,
        actors,
        directors,
        isLoading,
    };

    return (
        <ApplicationContext.Provider value={applicationInfo}>
            <Router>
                <div>
                    <Header/>

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
