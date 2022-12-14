import React from 'react';
import BrandStar from '.././assets/utils/Star 1.svg'
import SearchIcon from '.././assets/utils/search.svg'
import {Container, Dropdown, Form, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {
    ACTORS_PATH,
    ADMIN_USERS_PATH,
    CATEGORIES_PATH,
    DIRECTORS_PATH,
    MAIN_PATH,
    ORDERS_PATH,
    PROFILE_PATH,
    RESERVATIONS_PATH
} from "../utils/paths";
import LoginRegisterModal from "../components/LoginRegisterModal";
import AccountImg from "../assets/utils/account.svg"
import {ADMIN, USER} from "../utils/utils";
import {getFilms} from "../api/api";


const Header = ({setUser, setFilms, searchbox, onSearchBoxChange, showLogin, setLoginShow, setReservations, setOrders}) => {

    const user = JSON.parse(window.localStorage.getItem(USER))
    const reservations = JSON.parse(window.localStorage.getItem('RESERVATIONS_STATE'))
    const orders = JSON.parse(window.localStorage.getItem('SORTED_ORDERS_STATE'))
    const navigate = useNavigate();

    return (
        <Navbar variant='dark' expand="lg" className='header'>
            <Container className='header-container'>
                <Link to='/' className='navbar-brand header-brand'><img src={BrandStar} alt="" className='pb-1 me-1'/>Filmres</Link>
                <Form className="d-flex searchbox">
                    <img src={SearchIcon} className='ms-3 me-2' alt=''/>
                    <input type="text" className='searchbox-input' value={searchbox} placeholder='Wyszukaj w bazie filmów' onChange={(e) => onSearchBoxChange(e)}/>
                </Form>
                <Link to={MAIN_PATH} className='link-light text-decoration-none'>Filmy</Link>
                <Link to={CATEGORIES_PATH} className='link-light text-decoration-none'>Kategorie</Link>
                <Link to={ACTORS_PATH} className='link-light text-decoration-none'>Aktorzy</Link>
                <Link to={DIRECTORS_PATH} className='link-light text-decoration-none'>Reżyserzy</Link>
                {user && user.role === ADMIN && <Link to={ADMIN_USERS_PATH} className='link-light text-decoration-none'>Użytkownicy</Link>}
                {!user ? <LoginRegisterModal setUser={setUser} showLogin={showLogin} setLoginShow={setLoginShow} setReservations={setReservations} setOrders={setOrders}/> : (
                    <Dropdown className='logged-dropdown'>
                        <div className="toggle-button">
                            <Dropdown.Toggle>
                                <img src={AccountImg} alt=""/>{user.login}
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu>
                            <Link to={PROFILE_PATH} className='w-100 dropdown-item'>Moje konto</Link>
                            <hr/>
                            {user.role === USER && (
                                <>
                                    <Link to={RESERVATIONS_PATH} className='w-100 dropdown-item'>Rezerwacje ({reservations ? reservations.length : '0'})</Link>
                                    <hr/>
                                    <Link to={ORDERS_PATH} className='w-100 dropdown-item'>Zamówienia ({orders ? orders.length : '0'})</Link>
                                    <hr/>
                                </>

                            )}
                            <button className='w-100 dropdown-item' onClick={() => {
                                window.localStorage.removeItem(USER)
                                window.localStorage.removeItem('RESERVATIONS_STATE')
                                window.localStorage.removeItem('SORTED_ORDERS_STATE')
                                navigate(MAIN_PATH)
                                setUser({})
                                getFilms().then((films) => {
                                    if (films.length > 0) {
                                        setFilms(films);
                                        window.localStorage.setItem('FILMS_STATE', JSON.stringify(films))
                                    } else {
                                        setFilms([])
                                    }
                                })
                            }}>Wyloguj</button>
                        </Dropdown.Menu>
                    </Dropdown>
                )}

            </Container>
        </Navbar>
    );
};

export default Header;