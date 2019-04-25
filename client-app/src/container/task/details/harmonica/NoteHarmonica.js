import React from 'react';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import NotesList from './NotesList';

const NoteHarmonica = ({ toggleShowList, showNotesList, noteCount, permissions }) => {
    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-12" onClick={toggleShowList} role="button">
                    <span className="">
                        NOTITIES <span className="badge">{noteCount}</span>
                    </span>
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
