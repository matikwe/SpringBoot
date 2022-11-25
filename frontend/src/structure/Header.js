import React, {useEffect} from 'react';
import BrandStar from '.././assets/utils/Star 1.svg'
import SearchIcon from '.././assets/utils/search.svg'
import {Container, Dropdown, Form, Navbar} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ACTORS_PATH, CATEGORIES_PATH, DIRECTORS_PATH, MAIN_PATH, PROFILE_PATH, RESERVATIONS_PATH} from "../utils/paths";
import LoginRegisterModal from "../components/LoginRegisterModal";
import AccountImg from "../assets/utils/account.svg"


const Header = ({setUser, searchbox, onSearchBoxChange}) => {

    const user = JSON.parse(window.localStorage.getItem('USER'))
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
                {!user ? <LoginRegisterModal setUser={setUser}/> : (
                    <Dropdown className='logged-dropdown'>
                        <div className="toggle-button">
                            <Dropdown.Toggle>
                                <img src={AccountImg} alt=""/>{user.login}
                            </Dropdown.Toggle>
                        </div>

                        <Dropdown.Menu>
                            <Link to={PROFILE_PATH} className='w-100 dropdown-item'>Moje konto</Link>
                            <hr/>
                            <Link to={RESERVATIONS_PATH} className='w-100 dropdown-item'>Rezerwacje (0)</Link>
                            <hr/>
                            <button className='w-100 dropdown-item' onClick={() => {
                                window.localStorage.removeItem('USER')
                                navigate(MAIN_PATH)
                                setUser({})
                            }}>Wyloguj</button>
                        </Dropdown.Menu>
                    </Dropdown>
                )}

            </Container>
        </Navbar>
    );
};

export default Header;