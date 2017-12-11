import React from 'react';

import ViewText from "../../../components/form/ViewText";

const ContactDetailFormNoteView = props => {
    const { note, createdAt, createdBy } = props.note;

    return (
        <div className={`row item-border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-11" onClick={props.openEdit}>
                {note}
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {(props.showActionButtons ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
            <ViewText label={"Gemaakt op"} value={createdAt} className={"col-sm-4 h6"} />
            <ViewText label={"Gemaakt door"} value={createdBy.fullName} className={"col-sm-4 h6"} />
        </div>
    );
};

export default ContactDetailFormNoteView;
