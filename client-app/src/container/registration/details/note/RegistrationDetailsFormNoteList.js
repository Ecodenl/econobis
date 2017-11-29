import React from 'react';
import {connect} from 'react-redux';

import RegistrationDetailsFormNoteItem from "./RegistrationDetailsFormNoteItem";

const RegistrationDetailsFormNoteList = props => {
    return (
        <div>
            {
                props.notes.length > 0 ?
                    props.notes.map((note, i) => {
                        return <RegistrationDetailsFormNoteItem
                            key={i}
                            note={note}
                        />;
                    })
                    :
                    <div>Geen opmerkingen bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notes: state.registrationDetails.note,
    };
};

export default connect(mapStateToProps)(RegistrationDetailsFormNoteList);