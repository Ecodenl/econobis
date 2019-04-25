import React from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const NotesListToolbar = props => {
    const newTask = () => {
        hashHistory.push('taak/nieuw/afgesloten');
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.notes;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'glyphicon-refresh'} onClickAction={props.resetNoteFilters} />
                    {permissions.manageNote && <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newTask} />}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Notities</h3>
            </div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: {meta.total || 0}</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        notes: state.notes.list,
    };
};

export default connect(
    mapStateToProps,
    null
)(NotesListToolbar);
