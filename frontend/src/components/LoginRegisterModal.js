import React, {useEffect, useState} from 'react';
import {Container, Modal} from "react-bootstrap";


const LoginModal = () => {

    const [show, setShow] = useState(false);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {

    }

    return (
        <>
            <div className='login-button' onClick={handleShow}>
                <h3>
                    Logowanie
                </h3>
            </div>
            <Modal show={show} onHide={handleClose} className='login-modal'>
                <Container className='modal-container'>
                    <h1>Logowanie</h1>
                    <form>
                        <div className="row pt-4 px-4">
                            <input placeholder='Login' type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
                        </div>
                        <div className="row pt-4 px-4">
                            <input placeholder='Hasło' type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className='login-form-submit' onClick={handleSubmit}>Potwierdź</button>
                    </form>
                    <button className='register-redirect'>dsad</button>
                </Container>
            </Modal>
        </>

    );
};

export default LoginModal;