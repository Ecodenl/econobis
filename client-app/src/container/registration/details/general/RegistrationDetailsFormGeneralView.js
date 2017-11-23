import React from 'react';
import { connect } from 'react-redux';

import ViewText from '../../../../components/form/ViewText';

const RegistrationDetailsFormGeneralView = props => {
    const { email, title, firstName, lastNamePrefix, lastName, phoneNumber, mobile, occupation, active } = props.userDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Aanspreektitel"}
                    value={title && title.name}
                />
                <ViewText
                    label={"E-mail"}
                    value={email}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Voornaam"
                    value={firstName}
                />

                <ViewText
                    label="Telefoonnummer"
                    value={phoneNumber}
                />
            </div>

            <div className="row">
                <ViewText
                    label={"Tussenvoegsel"}
                    value={lastNamePrefix && lastNamePrefix.name}
                />
                <div className="row">
                    <ViewText
                        label="Mobiel nummer"
                        value={mobile}
                    />
                </div>
            </div>

            <div className="row">
                <ViewText
                    label={"Achternaam"}
                    value={lastName}
                />
                <div className="row">
                    <ViewText
                        label="Functie"
                        value={occupation}
                    />
                </div>
            </div>

            <div className="row">
                <ViewText
                    label={"Actief"}
                    value={active ? 'Ja' : 'Nee'}
                />

            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
    };
};

export default connect(mapStateToProps)(RegistrationDetailsFormGeneralView);