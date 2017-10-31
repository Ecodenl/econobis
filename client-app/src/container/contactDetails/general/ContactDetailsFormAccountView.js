import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ViewText from '../../../components/form/ViewText';

const ContactDetailsFormAccountView = props => {
    const {number, createdAt, account, statusId, member_since} = props.contactDetails;

    return (
        <div onClick={props.switchToEdit}>
            <div className="row">
                <ViewText
                    label={"Klantnummer"}
                    value={ number }
                />
                <ViewText
                    label={"Gemaakt op"}
                    value={ moment(createdAt.date).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <div className="col-sm-6" />
                <ViewText
                    label="Status"
                    value={statusId}
                />
            </div>

            <div className="row">
                <ViewText
                    label="Bedrijfsnaam"
                    value={ account.name }
                />

                <ViewText
                    label={"Lid sinds"}
                    value={ moment(member_since).format('DD-MM-Y') }
                />
            </div>

            <div className="row">
                <div className="col-sm-6" />
                <ViewText
                    label={"Opzegdatum"}
                    value={ "" }
                />
            </div>

            <div className="row">
                <div className="col-sm-6" />
                <ViewText
                    label="Soort contact"
                    value={ '' }
                />
            </div>

            <div className="row">
                <ViewText
                    label="Organisatie"
                    value={ '' }
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        statuses: state.statuses,
        types: state.types,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormAccountView);