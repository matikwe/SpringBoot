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
    MAIN_PATH, ORDERS_PATH,
    PROFILE_PATH, RESERVATIONS_PATH
} from "./utils/paths";
import FilmsListSite from "./structure/sites/FilmsListSite";
import Header from "./structure/Header";
import CategoriesSite from "./structure/sites/CategoriesSite";
import ActorsSite from "./structure/sites/ActorsSite";
import DirectorsSite from "./structure/sites/DirectorsSite";
import {ApplicationContext} from "./context/ApplicationContext";
import {useEffect, useState} from "react";
import {getActors, getCategories, getDirectors, getFilms, getOrders, getUserReservations} from "./api/api";
import FilmSite from "./structure/sites/FilmSite";
import ProfileSite from "./structure/sites/ProfileSite";
import ReservationsSite from "./structure/sites/ReservationsSite";
import AdminUsersPanel from "./components/AdminUsersPanel";
import OrdersSite from "./structure/sites/OrdersSite";
import {USER} from "./utils/utils";

const App = () => {

    const [films, setFilms] = useState([]);
    const [categories, setCategories] = useState([]);
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [searchbox, setSearchbox] = useState('')
    const [showLogin, setLoginShow] = useState(false);
    const [reservations, setReservations] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(
        () => {
            getFilms()
                .then((films) => {
                    if (films.length > 0) {
                        setFilms(films);
                        window.localStorage.setItem('FILMS_STATE', JSON.stringify(films))
                    } else {
                        setLoading(false)
                        setFilms([])
                    }
                });
            getCategories()
                .then((categories) => {
                    if (categories.length > 0) {
                        setCategories(categories);
                    } else {
                        setLoading(false)
                        setCategories([])
                    }
                });
            getActors()
                .then((actors) => {
                    if (actors.length > 0) {
                        setActors(actors);
                    } else {
                        setLoading(false)
                        setActors([])
                    }
                });
            getDirectors()
                .then((directors) => {
                    if (directors.length > 0) {
                        setDirectors(directors);
                        setLoading(false)
                    } else {
                        setLoading(false)
                        setDirectors([])
                    }
                });
            if (JSON.parse(window.localStorage.getItem(USER))) {
                getUserReservations(JSON.parse(window.localStorage.getItem(USER))).then(reservations => {
                    if (reservations.status === 500 || reservations.status === 400) {
                        alert('Nie można znaleźć rezerwacji dla obecnego użytkownika!')
                        setReservations([])
                    } else {
                        setReservations(reservations)
                        window.localStorage.setItem('RESERVATIONS_STATE', JSON.stringify(reservations))
                    }
                })
                getOrders().then(orders => {
                    if (orders.status === 500 || orders.status === 400) {
                        alert('Nie można znaleźć zamówień dla obecnego użytkownika!')
                        setOrders([])
                    } else {
                        const sortedOrdersByUser = orders.filter(order => order.reservation.user[0].id === JSON.parse(window.localStorage.getItem(USER)).id)
                        setOrders(sortedOrdersByUser)
                        window.localStorage.setItem('SORTED_ORDERS_STATE', JSON.stringify(sortedOrdersByUser))
                    }
                })
            }
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
        reservations,
        isLoading,
    };




    return (
        <ApplicationContext.Provider value={applicationInfo}>
          <Router>
              <div>
                  <Header user={user} setUser={setUser} searchbox={searchbox} onSearchBoxChange={onSearchboxChange} showLogin={showLogin} setLoginShow={setLoginShow} setReservations={setReservations} setOrders={setOrders}/>

                      <Switch>
                          <Route path={MAIN_PATH} element={<FilmsListSite searchbox={searchbox} setSearchbox={setSearchbox} setFilms={setFilms}/>}/>
                          <Route path={FILMS_PATH} element={<FilmsListSite searchbox={searchbox} setSearchbox={setSearchbox} setFilms={setFilms}/>}/>
                          <Route path={FILM_PATH} element={<FilmSite setLoginShow={setLoginShow}/>}/>
                          <Route path={CATEGORIES_PATH} element={<CategoriesSite searchbox={searchbox} setSearchbox={setSearchbox} setCategories={setCategories}/>}/>
                          <Route path={ACTORS_PATH} element={<ActorsSite searchbox={searchbox} setSearchbox={setSearchbox} setActors={setActors}/>}/>
                          <Route path={DIRECTORS_PATH} element={<DirectorsSite searchbox={searchbox} setSearchbox={setSearchbox} setDirectors={setDirectors}/>}/>
                          <Route path={PROFILE_PATH} element={<ProfileSite setUser={setUser}/>}/>
                          <Route path={RESERVATIONS_PATH} element={<ReservationsSite setReservations={setReservations}/>}/>
                          <Route path={ORDERS_PATH} element={<OrdersSite/>}/>
                          <Route path={ADMIN_USERS_PATH} element={<AdminUsersPanel/>}/>
                      </Switch>

              </div>
          </Router>
        </ApplicationContext.Provider>
  );
}

export default App;
