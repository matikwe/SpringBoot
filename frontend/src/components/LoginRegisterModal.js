import React, {useState} from 'react';
import {Container, Modal} from "react-bootstrap";
import {getLogin} from "../api/api";


const LoginRegisterModal = ({setUser}) => {

    const [showLogin, setLoginShow] = useState(false);
    const [showRegister, setRegisterShow] = useState(false);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLoginClose = () => setLoginShow(false);
    const handleLoginShow = () => setLoginShow(true);

    const handleRegisterClose = () => setRegisterShow(false);
    const handleRegisterShow = () => setRegisterShow(true);


    const handleLoginSubmit = (e) => {
        e.preventDefault()
        getLogin(login, password).then(user => {
            window.localStorage.setItem('USER', JSON.stringify(user))
            setUser(user)
            handleLoginClose()
            setLogin('')
            setPassword('')
        })
    }

    const handleRegisterSubmit = () => {

    }

    const handleOpenRegister = () => {
        handleRegisterShow()
        handleLoginClose()
    }

    const handleOpenLogin = () => {
        handleRegisterClose()
        handleLoginShow()
    }

    return (
        <>
            <div className='login-button' onClick={handleLoginShow}>
                <h3>
                    Logowanie
                </h3>
            </div>
            <Modal show={showLogin} onHide={handleLoginClose} className='login-modal'>
                <Container className='modal-container'>
                    <h1>Logowanie</h1>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="row pt-4 px-4">
                            <input placeholder='Login' type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Hasło' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type='submit' className='login-form-submit'>Potwierdź</button>
                    </form>
                    <button className='register-redirect' onClick={handleOpenRegister}>Rejestracja</button>
                </Container>
            </Modal>


            <Modal show={showRegister} onHide={handleRegisterClose} className='login-modal'>
                <Container className='modal-container'>
                    <h1>Rejestracja</h1>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="row pt-4 px-4">
                            <input placeholder='Login' type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Hasło' type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button type='submit' className='login-form-submit'>Potwierdź</button>
                    </form>
                    <button className='register-redirect' onClick={handleOpenLogin}>Logowanie</button>
                </Container>
            </Modal>
        </>

    );
};

export default LoginRegisterModal;