import React from 'react';
import {connect} from 'react-redux';

import ContactDetailsFormNoteItem from "./ContactDetailsFormNoteItem";

const ContactDetailsFormNoteList = props => {
    return (
        <div>
            {
                props.notes.length > 0 ?
                    props.notes.map(note => {
                        return <ContactDetailsFormNoteItem
                            key={note.id}
                            note={note}
                        />;
                    })
                    :
                    <div>Geen items bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notes: state.contactDetails.notes,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormNoteList);