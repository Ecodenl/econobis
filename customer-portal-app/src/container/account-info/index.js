import React from 'react';
import AccountInfoForm from './Form';

const AccountInfo = function() {
    return (
        <div className="content-section">
            <div className="content-container w-container">
                <h1 className="content-heading">Contactgegevens</h1>
                <div className="w-form" />
                <AccountInfoForm />
            </div>
        </div>
    );
};

export default AccountInfo;
