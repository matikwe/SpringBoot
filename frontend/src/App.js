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

const App = () => {
  return (
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
  );
}

export default App;
