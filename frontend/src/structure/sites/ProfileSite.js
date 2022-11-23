import React from 'react';

const ProfileSite = () => {

    const user = JSON.parse(window.localStorage.getItem('USER'))

    return (
        <div>
           <h1>Profil użytkownika: {user.name}</h1>
        </div>
    );
};

export default ProfileSite;