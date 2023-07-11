import React, { Component } from 'react';

import HousingFileHousingStatusList from './HousingFileHousingStatusList';
import HousingFileHousingStatusNew from './HousingFileHousingStatusNew';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PanelHeader from '../../../../components/panel/PanelHeader';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { plus } from 'react-icons-kit/fa/plus';

class HousingFileHousingStatuses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNew: false,
        };
    }

    toggleShowNew = () => {
        this.setState({
            showNew: !this.state.showNew,
        });
    };

    render() {
        const hasHoomDossierLink = this.props.housingFileDetails.hoomBuildingId != null ? true : false;

        return (
            <Panel>
                <PanelHeader>
                    <span className="h5 text-bold">Woningstatus</span>
                    {!hasHoomDossierLink && this.props.permissions.manageHousingFile && (
                        <a role="button" className="pull-right" onClick={this.toggleShowNew}>
                            <Icon size={14} icon={plus} />
                        </a>
                    )}
                </PanelHeader>
                <PanelBody>
                    <div className="col-md-12 margin-10-top">
                        {!hasHoomDossierLink && this.state.showNew && (
                            <HousingFileHousingStatusNew toggleShowNew={this.toggleShowNew} />
                        )}
                    </div>
                    <div className="col-md-12">
                        <HousingFileHousingStatusList />
                    </div>
                </PanelBody>
            </Panel>
        );
    }
}

const mapStateToProps = state => {
    return {
        housingFileDetails: state.housingFileDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(HousingFileHousingStatuses);
