import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';

const ContactDetailsFormNoteView = props => {
    const { note, createdAt, createdBy } = props.note;

    return (
        <div
            className={`row item-border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div className="col-sm-11" onClick={props.openEdit}>
                {note}
            </div>
            <div className="col-sm-1">
                {props.permissions.updateContactNote && props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                {props.permissions.deleteContactNote && props.showActionButtons ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
                    </a>
                ) : (
                    ''
                )}
            </div>
            <ViewText label={'Gemaakt op'} value={createdAt} className={'col-sm-4 h6'} />
            <ViewText label={'Gemaakt door'} value={createdBy.fullName} className={'col-sm-4 h6'} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};
export default connect(mapStateToProps, null)(ContactDetailsFormNoteView);
