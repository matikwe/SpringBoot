import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {MAIN_PATH} from "../../utils/paths";
import {USER} from "../../utils/utils";


const ProfileSite = () => {

    const user = JSON.parse(window.localStorage.getItem(USER))

    const location = useLocation();

    const [passwordChangeOldPassword, setPasswordChangeOldPassword] = useState('')
    const [passwordChangeNewPassword, setPasswordChangeNewPassword] = useState('')
    const [passwordChangeConfirmNewPassword, setPasswordChangeConfirmNewPassword] = useState('')

    const [accountDeletePassword, setAccountDeletePassword] = useState('')
    const [accountDeleteConfirmPassword, setAccountDeleteConfirmPassword] = useState('')

    useEffect(() => {
        setPasswordChangeOldPassword('')
        setPasswordChangeNewPassword('')
        setPasswordChangeConfirmNewPassword('')
        setAccountDeletePassword('')
        setAccountDeleteConfirmPassword('')
    }, [location])

    const handlePasswordChangeSubmit = (e) => {
        e.preventDefault()
        if (passwordChangeNewPassword === passwordChangeConfirmNewPassword) {
            console.log('Zmien haslo')
            setPasswordChangeOldPassword('')
            setPasswordChangeNewPassword('')
            setPasswordChangeConfirmNewPassword('')
        } else {
            alert('Hasłą muszą być takie same!')
        }
    }

    const handleDeleteAccountSubmit = (e) => {
        e.preventDefault()
        if (accountDeletePassword === accountDeleteConfirmPassword){
            console.log('Usuniecie konta')
            setAccountDeletePassword('')
            setAccountDeleteConfirmPassword('')
        } else {
            alert('Hasłą muszą być takie same!')
        }
    }

    return (
        <div className='row profile'>
           <div className="col-6 profile-description">
               <h1>Dane personalne</h1>
               <h4>Imię</h4>
               <h3>{user.name}</h3>
               <h4>Nazwisko</h4>
               <h3>{user.surname}</h3>
               <h4>Login</h4>
               <h3>{user.login}</h3>
               <h4>E-mail</h4>
               <h3>{user.email}</h3>
           </div>
            <div className="col-6">
                <div className="profile-password-change">
                    <h1>Zmień hasło</h1>
                    <form onSubmit={handlePasswordChangeSubmit}>
                        <div className="row px-4">
                            <input placeholder='Stare Hasło' type="password" value={passwordChangeOldPassword} onChange={(e) => setPasswordChangeOldPassword(e.target.value)}/>
                        </div>
                        <div className="row pt-2 px-4">
                            <input placeholder='Nowe Hasło' type="password" value={passwordChangeNewPassword} onChange={(e) => setPasswordChangeNewPassword(e.target.value)}/>
                        </div>
                        <div className="row pt-2 px-4">
                            <input placeholder='Potwierdź Nowe Hasło' type="password" value={passwordChangeConfirmNewPassword} onChange={(e) => setPasswordChangeConfirmNewPassword(e.target.value)}/>
                        </div>
                        <button type='submit' className='profile-form-submit'>Potwierdź</button>
                    </form>
                </div>
                <div className="profile-delete-account">
                    <h1>Usuń konto</h1>
                    <form onSubmit={handleDeleteAccountSubmit}>
                        <div className="row px-4">
                            <input placeholder='Hasło' type="password" value={accountDeletePassword} onChange={(e) => setAccountDeletePassword(e.target.value)}/>
                        </div>
                        <div className="row py-4 px-4">
                            <input placeholder='Potwierdź Hasło' type="password" value={accountDeleteConfirmPassword} onChange={(e) => setAccountDeleteConfirmPassword(e.target.value)}/>
                        </div>
                        <button type='submit' className='profile-form-submit'>Potwierdź</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSite;