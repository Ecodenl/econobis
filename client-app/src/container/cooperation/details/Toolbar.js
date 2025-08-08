import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from '../../../components/button/ButtonIcon';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import { connect } from 'react-redux';
import CooperationDetailsLaposta from './Laposta';

function CooperationDetailsToolbar({ permissions, isLoading, formData }) {
    const navigate = useNavigate();

    const [showSyncLaposta, setShowSyncLaposta] = useState(false);
    function toggleShowSyncLaposta() {
        setShowSyncLaposta(!showSyncLaposta);
    }

    return (
        <div className="row">
            <div className="col-sm-12">
                <Panel>
                    <PanelBody className={'panel-small'}>
                        <div className="col-md-4">
                            <div className="btn-group btn-group-flex margin-small" role="group">
                                <ButtonIcon iconName={'arrowLeft'} onClickAction={() => navigate(-1)} />
                                {permissions.manageMarketing && formData.useLaposta == true ? (
                                    <ButtonText
                                        onClickAction={toggleShowSyncLaposta}
                                        buttonText={'Synchroniseren LaPosta'}
                                    />
                                ) : null}
                            </div>
                        </div>
                        {!isLoading && (
                            <div className="col-md-4">
                                <h4 className="text-center">Coöperatie instellingen</h4>
                            </div>
                        )}
                        <div className="col-md-4" />
                    </PanelBody>
                </Panel>
            </div>

            {showSyncLaposta && <CooperationDetailsLaposta closeModal={toggleShowSyncLaposta} formData={formData} />}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        isLoading: state.loadingData.isLoading,
    };
};
export default connect(mapStateToProps, null)(CooperationDetailsToolbar);
