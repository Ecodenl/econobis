import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import NotesList from './NotesList';

const NoteHarmonica = ({ toggleShowList, showNotesList, noteCount, newNote, permissions }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-10" onClick={toggleShowList} role="button">
                    <span className="">
                        NOTITIES <span className="badge">{noteCount}</span>
                    </span>
                </div>
                <div className={'col-sm-2'}>
                    {permissions.manageTask && (
                        <a role="button" className="pull-right" onClick={newNote}>
                            <span className="glyphicon glyphicon-plus glyphicon-white" />
                        </a>
                    )}
                </div>
                <div className="col-sm-12">{showNotesList && <NotesList />}</div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(
    mapStateToProps,
    null
)(NoteHarmonica);
