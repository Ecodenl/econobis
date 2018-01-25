import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { browserHistory } from 'react-router';

import ButtonIcon from '../../../components/button/ButtonIcon';

const CampaignsListToolbar = (props) => {
    const newCampaign = () => {
        hashHistory.push('campagne/nieuw');
    };

    const { permissions = {} } = props;
    const { meta = {} } = props.campaigns;

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="btn-group" role="group">
                    <ButtonIcon iconName={"glyphicon-arrow-left"} onClickAction={browserHistory.goBack}/>
                    {permissions.manageMarketing &&
                    <ButtonIcon iconName={'glyphicon-plus'} onClickAction={newCampaign}/>
                    }
                </div>

            </div>
            <div className="col-md-4"><h3 className="text-center table-title">Campagnes</h3></div>
            <div className="col-md-4">
                <div className="pull-right">Resultaten: { meta.total || 0 }</div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions,
        campaigns: state.campaigns.list,
    }
};

export default connect(mapStateToProps)(CampaignsListToolbar);

