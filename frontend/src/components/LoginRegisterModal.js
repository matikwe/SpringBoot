import React, {useState} from 'react';
import {Container, Modal} from "react-bootstrap";
import {postLogin, postRegister} from "../api/api";


const LoginRegisterModal = ({setUser}) => {

    const [showLogin, setLoginShow] = useState(false);
    const [showRegister, setRegisterShow] = useState(false);
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [loginLogin, setLoginLogin] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [registerLogin, setRegisterLogin] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleLoginClose = () => {
        setLoginShow(false);
        setLoginLogin('')
        setLoginPassword('')
    }
    const handleLoginShow = () => setLoginShow(true);

    const handleRegisterClose = () => {
        setRegisterShow(false);
        setName('')
        setSurname('')
        setEmail('')
        setRegisterLogin('')
        setRegisterPassword('')
        setConfirmPassword('')
    }
    const handleRegisterShow = () => setRegisterShow(true);


    const handleLoginSubmit = (e) => {
        e.preventDefault()
        postLogin(loginLogin, loginPassword).then(user => {
            if (user.id ) {
                window.localStorage.setItem('USER', JSON.stringify(user))
                setUser(user)
                handleLoginClose()
            } else {
                alert('Error ' + user.status + ': ' + user.message)
            }
        })
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        if(registerPassword === confirmPassword) {
            postRegister(registerLogin, registerPassword, email, name, surname).then(user => {
                if (user.id ) {
                    window.localStorage.setItem('USER', JSON.stringify(user))
                    setUser(user)
                    handleRegisterClose()
                } else {
                    alert('Error ' + user.status + ': ' + user.message)
                }
            })
        } else {
            alert('Hasła muszą być takie same!')
        }
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
                            <input placeholder='Login' type="text" value={loginLogin} onChange={(e) => setLoginLogin(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Hasło' type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                        </div>
                        <button type='submit' className='login-form-submit'>Potwierdź</button>
                    </form>
                    <button className='register-redirect' onClick={handleOpenRegister}>Rejestracja</button>
                </Container>
            </Modal>


            <Modal show={showRegister} onHide={handleRegisterClose} className='register-modal'>
                <Container className='modal-container'>
                    <h1>Rejestracja</h1>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="row pt-4 px-4">
                            <input placeholder='Imię' type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Nazwisko' type="text" value={surname} onChange={(e) => setSurname(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='E-mail' type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Login' type="text" value={registerLogin} onChange={(e) => setRegisterLogin(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Hasło' type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Potwierdź hasło' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                        <button type='submit' className='register-form-submit'>Potwierdź</button>
                    </form>
                    <button className='register-redirect' onClick={handleOpenLogin}>Logowanie</button>
                </Container>
            </Modal>
        </>

    );
};

export default LoginRegisterModal;