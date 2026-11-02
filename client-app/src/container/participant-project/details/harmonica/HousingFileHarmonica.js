import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const HousingFileHarmonica = ({ housingFileId, permissions }) => {
    const navigate = useNavigate();

    return (
        <Panel className={'harmonica-button'}>
            <PanelBody>
                <div className="col-sm-12" role="button" onClick={() => navigate(`/woningdossier/${housingFileId}`)}>
                    WONINGDOSSIER
                </div>
            </PanelBody>
        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps, null)(HousingFileHarmonica);
