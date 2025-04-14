import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../../components/button/ButtonIcon';

const CampaignsListToolbar = props => {
    const navigate = useNavigate();

    const newCampaign = () => {
        navigate('campagne/nieuw');
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.campaigns;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={'arrowLeft'} onClickAction={navigate(-1)} />
                    {permissions.manageMarketing && <ButtonIcon iconName={'plus'} onClickAction={newCampaign} />}
                </div>
            </div>
            <div className="col-md-4">
                <h3 className="text-center table-title">Campagnes</h3>
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
        campaigns: state.campaigns.list,
    };
};

export default connect(mapStateToProps)(CampaignsListToolbar);
