import React from 'react';
import BrandStar from '.././assets/utils/Star 1.svg'
import SearchIcon from '.././assets/utils/search.svg'
import {Container, Dropdown, Form, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ACTORS_PATH, CATEGORIES_PATH, DIRECTORS_PATH, MAIN_PATH} from "../utils/paths";
import LoginRegisterModal from "../components/LoginRegisterModal";


const Header = ({setUser}) => {

    const user = JSON.parse(window.localStorage.getItem('USER'))


    return (
        <Navbar variant='dark' expand="lg" className='header'>
            <Container className='header-container'>
                <Link to='/' className='navbar-brand header-brand'><img src={BrandStar} alt="" className='pb-1 me-1'/>Filmres</Link>
                <Form className="d-flex searchbox">
                    <img src={SearchIcon} className='ms-3 me-2' alt=''/>
                    <input type="text" className='searchbox-input' placeholder='Wyszukaj w bazie filmów'/>
                </Form>
                <Link to={MAIN_PATH} className='link-light text-decoration-none'>Filmy</Link>
                <Link to={CATEGORIES_PATH} className='link-light text-decoration-none'>Kategorie</Link>
                <Link to={ACTORS_PATH} className='link-light text-decoration-none'>Aktorzy</Link>
                <Link to={DIRECTORS_PATH} className='link-light text-decoration-none'>Reżyserzy</Link>
                {!user ? <LoginRegisterModal setUser={setUser}/> : (
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {user.login}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}

            </Container>
        </Navbar>
    );
};

export default Header;

// <NavDropdown title="Link" id="navbarScrollingDropdown">
//     <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//     <NavDropdown.Item href="#action4">
//         Another action
//     </NavDropdown.Item>
//     <NavDropdown.Divider />
//     <NavDropdown.Item href="#action5">
//         Something else here
//     </NavDropdown.Item>
// </NavDropdown>